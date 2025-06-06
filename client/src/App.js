import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Donor_Register from './components/Login/Donor_Register';
import Hospital_login from './components/Login/Hospital_login';
import Home from './components/Home';
import User_Medical_Info from './components/Login/User_Medical_Info';
import ApproveDonor from './components/Hospital_Dashboard/Approve_donor';
import TransactionList from './components/Transplant_Insights/Transactions_Info';
import Main_page from './components/Hospital_Dashboard/Main';
import RegisterRecipient from './components/Hospital_Dashboard/Register_recipient';
import HospitalList from './components/Hospitals_List/Hospital_list';
import TransplantMatch from './components/Hospital_Dashboard/Transplant_Match';

import "./App.css";
import Dashboard from './components/Hospital_Dashboard/Dashboard';

function App() {
  
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Donor_Register" element={<Donor_Register />} />
        <Route path="/Hospital_login" element={<Hospital_login />} />
        <Route path="/User_Medical_Info" element={<User_Medical_Info/>} />
        <Route path="/Transactions" element={<TransactionList/>} />
      
        <Route
          path="/Main_page"
          element={
            window.localStorage.getItem('isAuthenticated') ? (
              <Main_page />
            ) : (
              <Navigate to="/Hospital_login" />
            )
          }
        />
        <Route
          path="/Dashboard"
          element={
            window.localStorage.getItem('isAuthenticated') ? (
              <Dashboard />
            ) : (
              <Navigate to="/Hospital_login" />
            )
          }
        />
        <Route
          path="/Approve_donor"
          element={
            window.localStorage.getItem('isAuthenticated') ? (
              <ApproveDonor/>
            ) : (
              <Navigate to="/Hospital_login" />
            )
          }
        />
        <Route
          path="/RegisterRecipient"
          element={
            window.localStorage.getItem('isAuthenticated') ? (
              <RegisterRecipient/>
            ) : (
              <Navigate to="/Hospital_login" />
            )
          }
        />
        <Route
          path="/Transplant_match"
          element={
            window.localStorage.getItem('isAuthenticated') ? (
              <TransplantMatch/>
            ) : (
              <Navigate to="/Hospital_login" />
            )
          }
        />
        <Route path="/Hospital_list" element={<HospitalList />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;