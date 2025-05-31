// nurseController.js
const User = require("../models/user.js");
const Nurse = require("../models/nurse.js");

const getNurses = async (req, res) => {
  try {
    const nurses = await User.find({ userType: "Nurse" });
    res.json(nurses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNurseCount = async (req, res) => {
  try {
    const count = await User.countDocuments({ userType: "Nurse" });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNurseById = async (req, res) => {
  try {
    const nurse = await User.findById(req.params.id);
    if (nurse.userType !== "Nurse") throw new Error("Not a nurse");
    res.json(nurse);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const saveNurse = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      userType: "Nurse",
      activated: true,
    });
    await Nurse.create({ userId: user._id });
    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateNurse = async (req, res) => {
  try {
    const updatedNurse = await User.updateOne(
      { _id: req.params.id, userType: "Nurse" },
      { $set: req.body }
    );
    if (updatedNurse.nModified === 0) throw new Error("Nurse not found");
    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteNurse = async (req, res) => {
  try {
    const nurse = await User.findById(req.params.id);
    if (nurse.userType !== "Nurse") throw new Error("Not a nurse");
    await Nurse.deleteOne({ userId: req.params.id });
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getNurses,
  getNurseCount,
  getNurseById,
  saveNurse,
  updateNurse,
  deleteNurse,
};