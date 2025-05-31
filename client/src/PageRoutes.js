// src/PageRoutes.js
import { Routes, Route } from 'react-router-dom';
import React, { useContext } from 'react';
import { UserContext } from './Context/UserContext';

import LoginPage from './components/Login/Login';
import SignupPage from './components/SignUp/SignupPage';
import Dashboard from './components/dashboard/Dashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import PatientDashboard from './components/dashboard/PatientDashboard';
import DoctorDashboard from './components/dashboard/DoctorDashboard';
import NurseDashboard from './components//NurseDashboard';

import AddUser from './components/User/AddUser3';
import UserList from './components/User/UserList3';
import EditUser from './components/User/EditUser3';
import User from './components/User/User';

import AddPatient from './components/Patient/AddPatient';
import PatientList from './components/Patient/PatientList';
import EditPatient from './components/Patient/EditPatient';
import Patient from './components/Patient/Patient';

import AddDoctor from './components/Doctor/AddDoctor';
import DoctorList from './components/Doctor/DoctorList';
import EditDoctor from './components/Doctor/EditDoctor';
import Doctor from './components/Doctor/Doctor';

import AddNurse from './components/Doctor/AddNurse'; // New Nurse Components
import NurseList from './components/Doctor/NurseList';
import EditNurse from './components/Doctor/EditNurse';
import Nurse from './components/Doctor/Nurse'; // Assuming you create this wrapper component

import AddMedicine from './components/Medicine/AddMedicine';
import MedicineList from './components/Medicine/MedicineList';
import EditMedicine from './components/Medicine/EditMedicine';
import Medicine from './components/Medicine/Medicine';

import PrescriptionList from './components/Prescription/PrescriptionList';
import Prescription from './components/Prescription/Prescription';
import Success from './components/Prescription/Success';
import Cancel from './components/Prescription/Cancel';

import AdminAppointment from './components/Appointment/AdminAppointment';
import PatientAppointment from './components/Appointment/PatientAppointment';
import DoctorAppointment from './components/Appointment/DoctorAppointment';

import DoctorProfile from './components/Profile/DoctorProfile';
import PatientProfile from './components/Profile/PatientProfile';
import AdminProfile from './components/Profile/AdminProfile';

import PatientHistory from './components/Patient/PatientHistory';
import BookNurse from './components/BookNurse';

const NotFound = () => <h2 style={{ margin: '70px' }}>This Path is not available</h2>;

// Protected Route for Admin
function ProtectedAdminRoute({ children }) {
  const { currentUser } = useContext(UserContext);
  return currentUser.userType === "Admin" ? children : <NotFound />;
}

// Protected Route for Admin or Doctor
function ProtectedStaffRoute({ children }) {
  const { currentUser } = useContext(UserContext);
  return (currentUser.userType === "Admin" || currentUser.userType === "Doctor") ? children : <NotFound />;
}

export default function PageRoutes() {
  const { currentUser } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={
          currentUser.userType === "Admin" ? <AdminDashboard /> :
          currentUser.userType === "Doctor" ? <DoctorDashboard /> :
          currentUser.userType === "Patient" ? <PatientDashboard /> :
          currentUser.userType === "Nurse" ? <NurseDashboard /> :
          <div />
        } />

        <Route path="users" element={<ProtectedAdminRoute><User /></ProtectedAdminRoute>}>
          <Route index element={<UserList />} />
          <Route path="add" element={<AddUser />} />
          <Route path="edit/:id" element={<EditUser />} />
        </Route>

        <Route path="patients" element={<ProtectedAdminRoute><Patient /></ProtectedAdminRoute>}>
          <Route index element={<PatientList />} />
          <Route path="add" element={<AddPatient />} />
          <Route path="edit/:id" element={<EditPatient />} />
        </Route>

        <Route path="doctors" element={<ProtectedAdminRoute><Doctor /></ProtectedAdminRoute>}>
          <Route index element={<DoctorList />} />
          <Route path="add" element={<AddDoctor />} />
          <Route path="edit/:id" element={<EditDoctor />} />
        </Route>

        <Route path="nurses" element={<ProtectedAdminRoute><Nurse /></ProtectedAdminRoute>}>
          <Route index element={<NurseList />} />
          <Route path="add" element={<AddNurse />} />
          <Route path="edit/:id" element={<EditNurse />} />
        </Route>

        <Route path="medicines" element={<Medicine />}>
          <Route index element={<ProtectedStaffRoute><MedicineList /></ProtectedStaffRoute>} />
          <Route path="add" element={<ProtectedAdminRoute><AddMedicine /></ProtectedAdminRoute>} />
          <Route path="edit/:id" element={<ProtectedAdminRoute><EditMedicine /></ProtectedAdminRoute>} />
        </Route>

        <Route path="prescriptions" element={<Prescription />}>
          <Route index element={<PrescriptionList />} />
          <Route path="success" element={<Success />} />
          <Route path="cancel" element={<Cancel />} />
        </Route>

        <Route path="patient/history/:id" element={<ProtectedStaffRoute><PatientHistory /></ProtectedStaffRoute>} />

        <Route path="appointments" element={
          currentUser.userType === "Admin" ? <AdminAppointment /> :
          currentUser.userType === "Doctor" ? <DoctorAppointment /> :
          currentUser.userType === "Patient" ? <PatientAppointment /> :
          <div />
        } />

        <Route path="/nurses/book" element={<BookNurse />} />

        <Route path="profile" element={
          currentUser.userType === "Admin" ? <AdminProfile /> :
          currentUser.userType === "Doctor" ? <DoctorProfile /> :
          currentUser.userType === "Patient" ? <PatientProfile /> :
          <div />
        } />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
