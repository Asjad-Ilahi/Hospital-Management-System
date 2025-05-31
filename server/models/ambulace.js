// models/ambulance.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AmbulanceSchema = new Schema({
    driverName: {
        type: String,
        required: [true, 'Please provide driver name'],
    },
    driverPhone: {
        type: String,
        required: [true, 'Please provide driver phone number'],
        match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number']
    },
    location: {
        type: String,
        required: [true, 'Please provide ambulance location'],
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Ambulance = mongoose.model('Ambulance', AmbulanceSchema);
module.exports = Ambulance;