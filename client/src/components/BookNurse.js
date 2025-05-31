// BookNurse.js
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { UserContext } from '../Context/UserContext';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

function BookNurse() {
  const [nurses, setNurses] = useState([]);
  const [selectedNurse, setSelectedNurse] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [address, setAddress] = useState("");
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNurses = async () => {
      try {
        const response = await axios.get("http://localhost:3001/nurses", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setNurses(response.data);
      } catch (error) {
        console.error("Error fetching nurses:", error);
      }
    };
    fetchNurses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/nurseAppointments",
        {
          nurseId: selectedNurse,
          patientId: currentUser.userId, // Use actual patient ID from context
          appointmentDate,
          appointmentTime,
          address
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (response.status === 201) {
        navigate("/appointments");
      }
    } catch (error) {
      console.error("Error booking nurse:", error);
      alert("Failed to book nurse appointment");
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <div className="content">
        <h2>Book a Nurse for Homecoming</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="Select Nurse"
            value={selectedNurse}
            onChange={(e) => setSelectedNurse(e.target.value)}
            fullWidth
            margin="normal"
            required
          >
            {nurses.map((nurse) => (
              <MenuItem key={nurse._id} value={nurse._id}>
                {nurse.firstName} {nurse.lastName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Date"
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Time"
            type="time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" className="mt-3">
            Book Nurse
          </Button>
        </form>
      </div>
    </Box>
  );
}

export default BookNurse;