// NurseAppointmentController.js
const NurseAppointment = require("../models/nurseAppointment.js");

const getNurseAppointments = async (req, res) => {
  try {
    const nurseAppointments = await NurseAppointment.find()
      .populate({
        path: "nurseId",
        populate: { path: "userId", model: "User" }
      })
      .populate({
        path: "patientId",
        populate: { path: "userId", model: "User" }
      });
    res.json(nurseAppointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createNurseAppointment = async (req, res) => {
  const { nurseId, patientId, appointmentDate, appointmentTime, address } = req.body;
  try {
    const nurseAppointment = new NurseAppointment({
      nurseId,
      patientId,
      appointmentDate,
      appointmentTime,
      address,
      status: "Pending",
    });
    const newNurseAppointment = await nurseAppointment.save();
    res.status(201).json(newNurseAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getNurseAppointments,
  createNurseAppointment,
};