const StudentAttendance = require("../models/StudentAttendance");
const AdminAttendance = require("../models/AdminAttendance");
const { addMinutes, isAfter } = require("date-fns");
const error = require('../utils/error')
const getAttendance = async (req, res, next) => {
  const { id } = req.params;
  try {
    /**
     * Step 1: Find admin attendance by id
     * Step 2: Check if it is running or not
     * Step 3: Check if already register or not
     * Step 4: Register entry
     */
    const adminAttendance = await AdminAttendance.findById(id);
    if (!adminAttendance) {
      throw error("Invalid Attendance ID", 400);
    }

    if (adminAttendance.status === "COMPLETED") {
      throw error("Attendance Already Completed");
    }

    let attendance = await StudentAttendance.findOne({ adminAttendance: id, user: req.user._id });

    if (attendance) {
      throw error("Already register", 400);
    }

    attendance = new StudentAttendance({
      user: req.user.id,
      adminAttendance: id,
    });
    await attendance.save();

    return res.status(201).json(attendance);
  } catch (e) {
    next(e);
  }
};
const getAttendanceStatus = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });
    // console.log('Running from 23 line', running)
    if (!running) {
      throw error("Not Running", 400);
    }

    const started = addMinutes(new Date(running.createdAt), running.timeLimit);
    if (isAfter(new Date(), started)) {
      running.status = "COMPLETED";
      await running.save();
    }

    return res.status(200).json(running);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAttendance,
  getAttendanceStatus,
};
