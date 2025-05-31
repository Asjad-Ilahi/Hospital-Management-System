const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NurseAppointmentSchema = new Schema({
  nurseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nurse",
    required: true
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  appointmentTime: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
    default: "Pending"
  }
});

const NurseAppointment = mongoose.model("NurseAppointment", NurseAppointmentSchema);

module.exports = NurseAppointment;