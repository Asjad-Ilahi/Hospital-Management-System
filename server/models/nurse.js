const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");

const NurseSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
  // Add nurse-specific fields if needed later (e.g., certifications, availability)
});

//hashing password
NurseSchema.pre('save', function (next) {
  const patient = this

  bcrypt.hash(patient.password, 10, (error, hash) => {
    patient.password = hash
    next()
  })
})

const Nurse = mongoose.model("Nurse", NurseSchema);

module.exports = Nurse;