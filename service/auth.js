const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByProperty, createNewUser } = require("./user");
const error = require("../utils/error");

const registerService = async ({name, email, password, roles, accountStatus}) => {
  let user = await findUserByProperty("email", email);

  if (user) throw error("User already exist", 400);

  //hashing the password
  const salt = await bcrypt.genSaltSync(10);
  console.log()

  const hash = await bcrypt.hashSync(password, salt);
  return createNewUser({ name, email, password: hash, roles, accountStatus });
};

const loginService = async ({ email, password }) => {
  const user = await findUserByProperty("email", email);

  if (!user) throw error("Invalid Credential", 400);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw error("Invalid Credential", 400);

  const payload = {
    _id: user.id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };
  const token = jwt.sign(payload, "secret-key", { expiresIn: "2h" });
  return token;
};

module.exports = {
  registerService,
  loginService,
};
