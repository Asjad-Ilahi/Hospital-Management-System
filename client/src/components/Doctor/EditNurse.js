// src/components/Doctor/EditNurse.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import ErrorDialogueBox from '../MUIDialogueBox/ErrorDialogueBox';
import axios from "axios";
import Box from '@mui/material/Box';

function EditNurse() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordMatchDisplay, setPasswordMatchDisplay] = useState('none');
  const [passwordValidationMessage, setPasswordValidationMessage] = useState('');
  const [errorDialogueBoxOpen, setErrorDialogueBoxOpen] = useState(false);
  const [errorList, setErrorList] = useState([]);

  const handleDialogueOpen = () => setErrorDialogueBoxOpen(true);
  const handleDialogueClose = () => {
    setErrorList([]);
    setErrorDialogueBoxOpen(false);
  };

  useEffect(() => {
    getNurseById();
  }, []);

  const getNurseById = async () => {
    const response = await axios.get(`https://hospital-management-system-six-snowy.vercel.app/nurses/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    setFirstName(response.data.firstName);
    setLastName(response.data.lastName);
    setEmail(response.data.email);
    setUsername(response.data.username);
    setPassword(response.data.password);
    setConfirmPassword(response.data.password);
    setPhone(response.data.phone || '');
  };

  const updateNurse = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://hospital-management-system-six-snowy.vercel.app/nurses/${id}`, {
        firstName,
        lastName,
        username,
        email,
        phone,
        password,
        confirmPassword,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      navigate("/nurses");
    } catch (error) {
      setErrorList(error.response?.data?.errors || [error.message]);
      handleDialogueOpen();
    }
  };

  useEffect(() => {
    if (password && password.length > 0 && password.trim().length <= 6) {
      setPasswordValidationMessage('Password Length must be greater than 6 characters');
    } else {
      setPasswordValidationMessage('');
    }
    setPasswordMatchDisplay(password === confirmPassword ? 'none' : 'block');
  }, [password, confirmPassword]);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <div className="page-wrapper">
        <div className="content">
          <div className="card-box">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <h3 className="page-title">Edit Nurse</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <form id="editNurseForm" name="editNurseForm" onSubmit={updateNurse}>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>First Name <span className="text-danger">*</span></label>
                        <input name="firstName" className="form-control" type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Last Name</label>
                        <input name="lastName" className="form-control" type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Username <span className="text-danger">*</span></label>
                        <input name="username" className="form-control" type="text" required value={username} onChange={(e) => setUsername(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Email <span className="text-danger">*</span></label>
                        <input name="email" className="form-control" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Password</label>
                        <input name="password" className="form-control" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Confirm Password</label>
                        <input name="confirmPassword" className="form-control" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Phone</label>
                        <input name="phone" className="form-control" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="m-t-20 text-center">
                    <button type="submit" className="btn btn-primary submit-btn">Update Nurse</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <ErrorDialogueBox
          open={errorDialogueBoxOpen}
          handleToClose={handleDialogueClose}
          ErrorTitle="Error: Edit Nurse"
          ErrorList={errorList}
        />
      </div>
    </Box>
  );
}

export default EditNurse;