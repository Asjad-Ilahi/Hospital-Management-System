// src/components/Doctor/NurseList.js
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorDialogueBox from '../MUIDialogueBox/ErrorDialogueBox';
import Box from '@mui/material/Box';

function NurseList() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name');

  const [nurses, setNurses] = useState([]);
  const [errorDialogueBoxOpen, setErrorDialogueBoxOpen] = useState(false);
  const [errorList, setErrorList] = useState([]);

  const handleDialogueOpen = () => setErrorDialogueBoxOpen(true);
  const handleDialogueClose = () => {
    setErrorList([]);
    setErrorDialogueBoxOpen(false);
  };

  useEffect(() => {
    getNurses();
  }, []);

  const getNurses = async () => {
    const response = await axios.get("http://localhost:3001/nurses", {
      params: { name },
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    setNurses(response.data);
  };

  const deleteNurse = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/nurses/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      getNurses();
    } catch (error) {
      setErrorList([error.message]);
      handleDialogueOpen();
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-sm-4 col-3">
              <h4 className="page-title">Nurses</h4>
            </div>
            <div className="col-sm-8 col-9 text-right m-b-20">
              <Link to="/nurses/add" className="btn btn-primary float-right btn-rounded">
                <i className="fa fa-plus"></i> Add Nurse
              </Link>
            </div>
          </div>
          <form action="/nurses" name="nurseFilter">
            <div className="row filter-row">
              <div className="col-sm-4 col-md-4">
                <div className="form-floating">
                  <input type="text" name="name" className="form-control" placeholder="Nurse Name" />
                  <label className="focus-label">Nurse Name</label>
                </div>
              </div>
              <div className="col-sm-4 col-md-4">
                <button type="submit" className="btn btn-primary btn-block">Search</button>
              </div>
            </div>
          </form>
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table table-striped custom-table">
                  <thead>
                    <tr>
                      <th>Sr. No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nurses.map((nurse, index) => (
                      <tr key={nurse._id}>
                        <td>{index + 1}</td>
                        <td>{nurse.firstName} {nurse.lastName}</td>
                        <td>{nurse.email}</td>
                        <td>{nurse.phone || 'N/A'}</td>
                        <td>
                          <Link
                            to={`/nurses/edit/${nurse._id}`}
                            className="btn btn-warning is-info is-small m-r-2"
                          >
                            <i className="fa fa-pencil m-r-5"></i> Edit
                          </Link>
                          <button
                            onClick={() => deleteNurse(nurse._id)}
                            className="btn btn-danger is-danger is-small m-l-5"
                          >
                            <i className="fa fa-trash-o m-r-5"></i> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <ErrorDialogueBox
          open={errorDialogueBoxOpen}
          handleToClose={handleDialogueClose}
          ErrorTitle="Error: Nurse List"
          ErrorList={errorList}
        />
      </div>
    </Box>
  );
}

export default NurseList;