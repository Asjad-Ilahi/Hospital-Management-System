const express = require("express");
const router = express.Router();
const nurseAuth = require("../middlewares/nurseAuth");
const { getNurseAppointments, createNurseAppointment } = require("../controllers/NurseAppointmentController.js");

router.get("/nurseAppointments", nurseAuth, getNurseAppointments);
router.post("/nurseAppointments", createNurseAppointment);

module.exports = router;