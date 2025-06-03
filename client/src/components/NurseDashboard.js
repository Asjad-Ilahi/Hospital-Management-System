// NurseDashboard.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { UserContext } from '../Context/UserContext';
import styles from './dashboard/Dashboard.module.css';

function NurseDashboard() {
  const [appointments, setAppointments] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://hospital-management-system-six-snowy.vercel.app/nurseAppointments", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Filter appointments for the current nurse
        const nurseAppointments = response.data.filter(
          app => app.nurseId._id.toString() === currentUser.userId
        );
        setAppointments(nurseAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    if (currentUser) {
      fetchAppointments();
    }
  }, [currentUser]);

  return (
    <Box className={styles.dashboardBody} component="main" sx={{ flexGrow: 1, p: 3 }}>
      <div id={styles.welcomeBanner}>
        <div className='text-white'>
          <h3>Welcome!</h3>
          <br/>
          <h4>Nurse {currentUser.firstName} {currentUser.lastName}</h4>
          <br/>
          <div className={styles.horizontalLine}></div>
          At Daro Darmal, we believe that every patient deserves the highest quality care possible.
          <br/>
          Our commitment to excellence in healthcare is matched only by our compassion for those we serve.
        </div>
      </div>
      <div className="mt-4">
        <h2>Homecoming Appointments</h2>
        {appointments.length === 0 ? (
          <p>No scheduled homecoming appointments</p>
        ) : (
          <ul className="list-group">
            {appointments.map((app) => (
              <li key={app._id} className="list-group-item">
                <strong>Patient:</strong> {app.patientId.firstName} {app.patientId.lastName}<br />
                <strong>Date:</strong> {new Date(app.appointmentDate).toLocaleDateString()}<br />
                <strong>Time:</strong> {app.appointmentTime}<br />
                <strong>Address:</strong> {app.address}<br />
                <strong>Status:</strong> {app.status}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Box>
  );
}

export default NurseDashboard;