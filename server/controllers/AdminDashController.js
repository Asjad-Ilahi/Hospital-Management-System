const User = require("../models/user.js");
const Appointment = require("../models/appointment.js");
const Prescription = require("../models/prescription.js");
const mongoose = require("mongoose");
const Ambulance = require("../models/ambulace.js");
const Nurse = require("../models/nurse.js"); // Add this

var moment = require('moment'); 

const getUserCountByRole = async (req, res) => {
    // console.log("api hit")
    try {
        var userType = req.body.userType;
        // console.log(req.body);
        let users = [];
        if (userType) {
            users = await User.find({ "userType": userType });
            res.json({ 'count': users.length });
        }
        else {
            res.status(400).json({ errors: ["User type is missing in body"] })
        }

    } catch (error) {
        res.status(500).json({ errors: [error.message] });
    }
}

const getAppointmentCount = async (req, res) => {
    try {
        let query = {
            "appointmentDate": moment(new Date()).format('YYYY-MM-DD'),
            'isTimeSlotAvailable': false,
        }
        if(req.sender.doctorId){
            query.doctorId = req.sender.doctorId
        }
        if(req.sender.patientId){
            query.patientId = req.sender.patientId
        }
        let appointmentsToday = await Appointment.find(query);

        let pendingAppointmentsToday = await Appointment.find({
            ...query,
            "completed": false
        })
        // console.log(new Date().toLocaleDateString('zh-Hans-CN'));
        // console.log(appointmentsToday.length);
        res.json({
            "message": "success",
            'totalAppointments': appointmentsToday.length,
            "pendingAppointments": pendingAppointmentsToday.length,
        });

    } catch (error) {
        res.status(500).json({ errors: [error.message] });
    }
}

const getPatientsTreatedCount = async (req, res) =>{
    try{
        // console.log("getPatientsTreatedCount")
        let prescriptions = await Prescription.find({}).populate({
            path: 'appointmentId',
            populate: {
                path: 'doctorId',
                match: { _id: mongoose.Types.ObjectId(req.sender.doctorId) }
              }        
        }).then((prescriptions) => prescriptions.filter((pre => pre.appointmentId.doctorId != null)));
        // console.log("prescriptions",prescriptions)
        res.json({
            "message": "success",
            'treatedPatients': prescriptions.length
        });

    }
    catch (error) {
        res.status(500).json({ errors: [error.message] });
    }
}
const getAmbulanceCount = async (req, res) => {
    try {
        const totalAmbulances = await Ambulance.countDocuments();
        const availableAmbulances = await Ambulance.countDocuments({ isAvailable: true });
        res.json({
            message: "success",
            totalAmbulances,
            availableAmbulances
        });
    } catch (error) {
        res.status(500).json({ errors: [error.message] });
    }
};

const addAmbulance = async (req, res) => {
    try {
        const { driverName, driverPhone, location } = req.body;
        if (!driverName || !driverPhone || !location) {
            return res.status(400).json({ errors: ["All fields are required"] });
        }
        
        const ambulance = new Ambulance({
            driverName,
            driverPhone,
            location,
            isAvailable: true // Explicitly set default value
        });
        
        const savedAmbulance = await ambulance.save();
        res.status(201).json({ 
            message: "Ambulance added successfully",
            ambulance: savedAmbulance 
        });
    } catch (error) {
        res.status(500).json({ errors: [error.message] });
    }
};

const getAllAmbulances = async (req, res) => {
    try {
        const ambulances = await Ambulance.find();
        res.json({
            message: "success",
            ambulances
        });
    } catch (error) {
        res.status(500).json({ errors: [error.message] });
    }
};

const getNurseCount = async (req, res) => {
    try {
      const count = await Nurse.countDocuments();
      res.json({ message: "success", nurseCount: count });
    } catch (error) {
      res.status(500).json({ errors: [error.message] });
    }
  };

module.exports = {
    getUserCountByRole,
    getAppointmentCount,
    getPatientsTreatedCount,
    getAmbulanceCount,
    addAmbulance,
    getAllAmbulances,
    getNurseCount
};