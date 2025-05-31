// src/components/Doctor/AddNurse.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorDialogueBox from '../MUIDialogueBox/ErrorDialogueBox';
import Box from '@mui/material/Box';

function AddNurse() {
  const navigate = useNavigate();
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

  const addNurse = (event) => {
    event.preventDefault();
    const form = document.forms.addNurseForm;
    let nurse = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      username: form.username.value,
      email: form.email.value,
      phone: form.phone.value,
      password: form.password.value,
      confirmPassword: form.confirmPassword.value,
    };

    fetch('https://hospital-management-system-six-snowy.vercel.app/nurses', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(nurse)
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === "success") {
          navigate("/nurses");
        } else {
          setErrorList(data.errors || ["Failed to add nurse"]);
          handleDialogueOpen();
        }
      })
      .catch(error => {
        setErrorList([error.message]);
        handleDialogueOpen();
      });
  };

  useEffect(() => {
    if (password.length > 0 && password.trim().length <= 6) {
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
                <h4 className="page-title">Add Nurse</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <form id="addNurseForm" name="addNurseForm" onSubmit={addNurse}>
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
                    <button type="submit" className="btn btn-primary submit-btn">Create Nurse</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <ErrorDialogueBox
          open={errorDialogueBoxOpen}
          handleToClose={handleDialogueClose}
          ErrorTitle="Error: Add Nurse"
          ErrorList={errorList}
        />
      </div>
    </Box>
  );
}

export default AddNurse;