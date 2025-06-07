import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import DonorRegister from './components/Login/Donor_Register';
import HospitalLogin from './components/Login/Hospital_login';
import Home from './components/Home';
import UserMedicalInfo from './components/Login/User_Medical_Info';
import ApproveDonor from './components/Hospital_Dashboard/Approve_donor';
import TransactionList from './components/Transplant_Insights/Transactions_Info';
import MainPage from './components/Hospital_Dashboard/Main';
import RegisterRecipient from './components/Hospital_Dashboard/Register_recipient';
import HospitalList from './components/Hospitals_List/Hospital_list';
import TransplantMatch from './components/Hospital_Dashboard/Transplant_Match';
import Dashboard from './components/Hospital_Dashboard/Dashboard';

function App() {
  
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Donor_Register" element={<DonorRegister />} />
        <Route path="/Hospital_login" element={<HospitalLogin />} />
        <Route path="/User_Medical_Info" element={<UserMedicalInfo/>} />
        <Route path="/Transactions" element={<TransactionList/>} />
      
        <Route
          path="/Main_page"
          element={
            window.localStorage.getItem('isAuthenticated') ? (
              <MainPage />
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