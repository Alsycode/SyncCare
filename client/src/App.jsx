import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout.jsx";

import LoginPage from "./pages/Login";
import { AuthProvider, AuthContext } from "./context/authContext";
import Dashboard from "./components/Dashboard";
import Doctors from "./components/Doctors";
import AppointmentForm from "./components/AppointmentForm";
// import AddNewDoctor from "./components/AddNewDoctor";
// import AddNewAdmin from "./components/AddNewAdmin";
// import Messages from "./components/Messages";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } = useContext(AuthContext);

  return (
    <AuthProvider>
      <Router>
        <div className="bg-blackd">
          <Routes>
            {/* Login route without Layout */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected routes wrapped in Layout */}
           
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/doctors" element={<Doctors />} />
                {/* <Route path="/messages" element={<Messages />} />
                <Route path="/doctor" element={<AddNewDoctor />} />
                <Route path="/admin/addnew" element={<AddNewAdmin />} /> */}
                <Route path="/createAppointment" element={<AppointmentForm />} />
              </Route>
          
          </Routes>
          <ToastContainer position="top-center" />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;