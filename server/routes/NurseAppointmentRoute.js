const express = require("express");
const router = express.Router();
const { getNurseAppointments, createNurseAppointment } = require("../controllers/NurseAppointmentController.js");

router.get("/nurseAppointments", getNurseAppointments);
router.post("/nurseAppointments", createNurseAppointment);

module.exports = router;