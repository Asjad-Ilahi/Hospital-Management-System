// AdminDashboard.jsx
import styles from './Dashboard.module.css';
import { React, useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import axios from "axios";
import { NavLink } from 'react-router-dom';
import moment from "moment";
import { UserContext } from '../../Context/UserContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

export default function AdminDashboard() {
    const [doctorCount, setDoctorCount] = useState(0);
    const [patientCount, setPatientCount] = useState(0);
    const [appsTodayCount, setAppsTodayCount] = useState(0);
    const [pendingAppsTodayCount, setPendingAppsTodayCount] = useState(0);
    const [bookedAppointments, setBookedAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [nurses, setNurses] = useState([]); // Added for nurses
    const { currentUser } = useContext(UserContext);
    const [ambulanceCount, setAmbulanceCount] = useState(0);
    const [availableAmbulanceCount, setAvailableAmbulanceCount] = useState(0);
    const [ambulances, setAmbulances] = useState([]);
    const [nurseCount, setNurseCount] = useState(0);
    const [newAmbulance, setNewAmbulance] = useState({
        driverName: '',
        driverPhone: '',
        location: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const getNurseCount = async () => {
        const response = await axios.get("http://localhost:3001/nurses/count");
        setNurseCount(response.data.count);
    };

    const getUserCountByRole = async (userType) => {
        const response = await axios.post(`http://localhost:3001/count/users`,
            { 'userType': userType },
            { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        let count = response.data.count;
        if (count) {
            if (userType === "Doctor") setDoctorCount(count);
            else if (userType === "Patient") setPatientCount(count);
        }
    };

    const getAppointmentCount = async () => {
        const response = await axios.get(`http://localhost:3001/count/appointments`,
            { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        if (response?.data?.totalAppointments) setAppsTodayCount(response.data.totalAppointments);
        if (response?.data?.pendingAppointments) setPendingAppsTodayCount(response.data.pendingAppointments);
    };

    const getBookedSlots = async () => {
        let response = await axios.post(`http://localhost:3001/appointments`,
            { 'isTimeSlotAvailable': false, 'appDate': moment(new Date()).format('YYYY-MM-DD') },
            { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        if (response.data.message === "success") setBookedAppointments(response.data.appointments);
    };

    const getDoctors = async () => {
        const response = await axios.get("http://localhost:3001/doctors");
        setDoctors(response.data);
    };

    const getNurses = async () => {
        const response = await axios.get("http://localhost:3001/nurses", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setNurses(response.data);
    };

    const getAmbulanceCount = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/count/ambulances`, {
                headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setAmbulanceCount(response.data.totalAmbulances);
            setAvailableAmbulanceCount(response.data.availableAmbulances);
        } catch (error) {
            console.error('Error fetching ambulance count:', error);
        }
    };

    const getAllAmbulances = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/ambulances`, {
                headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setAmbulances(response.data.ambulances);
        } catch (error) {
            console.error('Error fetching ambulances:', error);
        }
    };

    const handleAmbulanceInputChange = (e) => {
        setNewAmbulance({ ...newAmbulance, [e.target.name]: e.target.value });
    };

    const handleAddAmbulance = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');
        try {
            const response = await axios.post(`http://localhost:3001/ambulances`, newAmbulance, {
                headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            if (response.data.message === "Ambulance added successfully") {
                setSuccessMessage("Ambulance added successfully!");
                setNewAmbulance({ driverName: '', driverPhone: '', location: '' });
                await Promise.all([getAmbulanceCount(), getAllAmbulances()]);
            }
        } catch (error) {
            console.error('Error adding ambulance:', error);
            setErrorMessage(error.response?.data?.errors[0] || "Failed to add ambulance");
        }
    };

    useEffect(() => {
        getUserCountByRole("Doctor");
        getUserCountByRole("Patient");
        getAppointmentCount();
        getBookedSlots();
        getDoctors();
        getNurses();
        getAmbulanceCount();
        getAllAmbulances();
        getNurseCount();
    }, []);

    return (
        <Box className={styles.dashboardBody} component="main" sx={{ flexGrow: 1, p: 3 }}>
            <div id={styles.welcomeBanner}>
                <div className='text-white'>
                    <h3>Welcome!</h3>
                    <br/>
                    <h4>{currentUser.firstName} {currentUser.lastName}</h4>
                    <br/>
                    <div className={styles.horizontalLine}></div>
                    At Green Hills, we believe that every patient deserves the highest quality care possible.
                    <br/>
                    Our commitment to excellence in healthcare is matched only by our compassion for those we serve.
                </div>
            </div>
            <div className={styles.statCardGrid}>
                <div className={["", styles.statCard].join(" ")}>
                    <div className={styles.dashWidget}>
                        <span className={styles.dashWidgetBg1}><i className="fa fa-stethoscope" aria-hidden="true"></i></span>
                        <div className={[" ", styles.dashWidgetInfo].join(" ")}>
                            <h3 className={styles.dashWidgetInfoH3}>{doctorCount}</h3>
                            <span className={styles.widgetTitle1}>Doctors <i className="fa fa-check" aria-hidden="true"></i></span>
                        </div>
                    </div>
                </div>
                <div className={["", styles.statCard].join(" ")}>
                    <div className={styles.dashWidget}>
                        <span className={styles.dashWidgetBg2}><i className="fa fa-user-o" aria-hidden="true"></i></span>
                        <div className={[" ", styles.dashWidgetInfo].join(" ")}>
                            <h3 className={styles.dashWidgetInfoH3}>{patientCount}</h3>
                            <span className={styles.widgetTitle2}>Patients <i className="fa fa-check" aria-hidden="true"></i></span>
                        </div>
                    </div>
                </div>
                <div className={["", styles.statCard].join(" ")}>
                    <div className={styles.dashWidget}>
                        <span className={styles.dashWidgetBg3}><i className="fa fa-calendar" aria-hidden="true"></i></span>
                        <div className={[" ", styles.dashWidgetInfo].join(" ")}>
                            <h3 className={styles.dashWidgetInfoH3}>{appsTodayCount}</h3>
                            <span className={styles.widgetTitle3}>Appointments Today <i className="fa fa-check" aria-hidden="true"></i></span>
                        </div>
                    </div>
                </div>
                <div className={["", styles.statCard].join(" ")}>
                    <div className={styles.dashWidget}>
                        <span className={styles.dashWidgetBg1}><i className="fa fa-user-o" aria-hidden="true"></i></span>
                        <div className={[" ", styles.dashWidgetInfo].join(" ")}>
                            <h3 className={styles.dashWidgetInfoH3}>{nurseCount}</h3>
                            <span className={styles.widgetTitle1}>Total Nurses <i className="fa fa-check" aria-hidden="true"></i></span>
                        </div>
                    </div>
                </div>
                <div className={["", styles.statCard].join(" ")}>
                    <div className={styles.dashWidget}>
                        <span className={styles.dashWidgetBg4}><i className="fa fa-heartbeat" aria-hidden="true"></i></span>
                        <div className={[" ", styles.dashWidgetInfo].join(" ")}>
                            <h3 className={styles.dashWidgetInfoH3}>{pendingAppsTodayCount}</h3>
                            <span className={styles.widgetTitle4}>Pending Appointments <i className="fa fa-check" aria-hidden="true"></i></span>
                        </div>
                    </div>
                </div>
                <div className={["", styles.statCard].join(" ")}>
                    <div className={styles.dashWidget}>
                        <span className={styles.dashWidgetBg3}><i className="fa fa-ambulance" aria-hidden="true"></i></span>
                        <div className={[" ", styles.dashWidgetInfo].join(" ")}>
                            <h3 className={styles.dashWidgetInfoH3}>{ambulanceCount}</h3>
                            <span className={styles.widgetTitle3}>Total Ambulances <i className="fa fa-check" aria-hidden="true"></i></span>
                        </div>
                    </div>
                </div>
                <div className={["", styles.statCard].join(" ")}>
                    <div className={styles.dashWidget}>
                        <span className={styles.dashWidgetBg4}><i className="fa fa-ambulance" aria-hidden="true"></i></span>
                        <div className={[" ", styles.dashWidgetInfo].join(" ")}>
                            <h3 className={styles.dashWidgetInfoH3}>{availableAmbulanceCount}</h3>
                            <span className={styles.widgetTitle4}>Available Ambulances <i className="fa fa-check" aria-hidden="true"></i></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-lg-8 col-xl-8">
                    <div className="card appointment-panel">
                        <div className="card-header">
                            <h4 className="card-title d-inline-block">Upcoming Appointments</h4>
                            <NavLink to="/appointments" className="btn btn-primary float-end">View all</NavLink>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table mb-0">
                                    <thead className="d-none">
                                        <tr>
                                            <th>Patient Name</th>
                                            <th>Doctor Name</th>
                                            <th>Timing</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookedAppointments.map((apt) => (
                                            <tr key={apt._id}>
                                                <td className={styles.appointmentTableTd}>
                                                    <a className="avatar" href="#">{apt?.patientId?.userId?.firstName?.charAt(0)}</a>
                                                    <h2 className='ps-3'>
                                                        <a href="#">{apt?.patientId?.userId?.firstName} {apt?.patientId?.userId?.lastName} <span>{apt?.patientId?.address}</span></a>
                                                    </h2>
                                                </td>
                                                <td>
                                                    <h5 className="time-title p-0">Appointment With</h5>
                                                    <p>Dr. {apt?.doctorId?.userId?.firstName} {apt?.doctorId?.userId?.lastName}</p>
                                                </td>
                                                <td>
                                                    <h5 className="time-title p-0">Timing</h5>
                                                    <p>{apt?.appointmentTime}</p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {(!bookedAppointments || bookedAppointments.length === 0) && (
                                    <h3 className='mt-5 text-center'>You have no appointments today</h3>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="card mt-3">
                        <div className="card-header">
                            <h4 className="card-title d-inline-block">Add Ambulance</h4>
                        </div>
                        <div className="card-body">
                            {successMessage && <Alert severity="success" className="mb-3">{successMessage}</Alert>}
                            {errorMessage && <Alert severity="error" className="mb-3">{errorMessage}</Alert>}
                            <form onSubmit={handleAddAmbulance}>
                                <TextField
                                    label="Driver Name"
                                    name="driverName"
                                    value={newAmbulance.driverName}
                                    onChange={handleAmbulanceInputChange}
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                                <TextField
                                    label="Driver Phone"
                                    name="driverPhone"
                                    value={newAmbulance.driverPhone}
                                    onChange={handleAmbulanceInputChange}
                                    fullWidth
                                    margin="normal"
                                    required
                                    type="tel"
                                    inputProps={{ pattern: "[0-9]{10}", maxLength: 10 }}
                                />
                                <TextField
                                    label="Location"
                                    name="location"
                                    value={newAmbulance.location}
                                    onChange={handleAmbulanceInputChange}
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className="mt-3"
                                    disabled={!newAmbulance.driverName || !newAmbulance.driverPhone || !newAmbulance.location}
                                >
                                    Add Ambulance
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-4 col-xl-4">
                    <div className="card member-panel">
                        <div className="card-header bg-white">
                            <h4 className="card-title mb-0">Doctors</h4>
                        </div>
                        <div className="card-body">
                            <ul className="contact-list">
                                {doctors.map((doc) => (
                                    <li key={doc._id}>
                                        <div className="contact-cont">
                                            <div className="contact-info">
                                                <span className="contact-name text-ellipsis">{doc.userId?.firstName} {doc.userId?.lastName}</span>
                                                <span className="contact-date">{doc.department}</span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="card-footer text-center bg-white">
                            <NavLink to="/doctors" className="text-muted">View all Doctors</NavLink>
                        </div>
                    </div>
                    <div className="card member-panel mt-3">
                        <div className="card-header bg-white">
                            <h4 className="card-title mb-0">Nurses</h4>
                        </div>
                        <div className="card-body">
                            <ul className="contact-list">
                                {nurses.map((nurse) => (
                                    <li key={nurse._id}>
                                        <div className="contact-cont">
                                            <div className="contact-info">
                                                <span className="contact-name text-ellipsis">{nurse.firstName} {nurse.lastName}</span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="card-footer text-center bg-white">
                            <NavLink to="/nurses" className="text-muted">View all Nurses</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    );
}