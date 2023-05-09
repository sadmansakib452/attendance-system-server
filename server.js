const express = require("express");
const connectDB = require("./db");
const routes = require("./routes/index");
const authenticate = require("./middleware/authenticate");
const app = express();

app.use(express.json());
app.use(routes);
//Global error
app.use((err, req, res, next) => {
  console.log(err);
  const message = err.message ? err.message : "Server Error Occurred";
  const status = err.status ? err.status : 500;
  res.status(status).json({
    message,
  });
});
connectDB("mongodb://127.0.0.1:27017/attendance-db")
  .then(() => {
    app.listen(4000, () => {
      console.log("Database Connected");
      console.log("listening on port 4000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/private", authenticate, async (req, res) => {
  console.log("Iam the user", req.user);
  return res.status(200).json({ message: "I am private route" });
});


