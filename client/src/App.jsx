import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
// import Login from "./components/Login";
// import AddNewDoctor from "./components/AddNewDoctor";
// import Messages from "./components/Messages";
// import Doctors from "./components/Doctors";
// import { Context } from "./main";
// import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
// import AddNewAdmin from "./components/AddNewAdmin";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import AppointmentForm from "./components/AppointmentForm";
import Doctors from "./components/Doctors";
import { AuthProvider } from "./context/authContext";
import { AuthContext } from "./context/authContext";
import LoginPage from "./pages/Login";
const App = () => {
   const { isAuthenticated, setIsAuthenticated, admin, setAdmin } =
    useContext(AuthContext);
// const isAuthenticated = true;
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:5000/api/v1/user/admin/me",
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       setIsAuthenticated(true);
  //       setAdmin(response.data.user);
  //     } catch (error) {
  //       setIsAuthenticated(false);
  //       setAdmin({});
  //     }
  //   };
  //   fetchUser();
  // }, [isAuthenticated]);

  return (
    <AuthProvider>
       <Router>
      <div className="bg-blackd">
        
     <Sidebar />
     <Routes>
  <Route
    path="/"
    element={
      // <PrivateRoute isAuthenticated={isAuthenticated}>
        <Dashboard />
      // </PrivateRoute>
    }
  />
  {/* <Route
    path="/doctor/addnew"
    element={
      <PrivateRoute isAuthenticated={isAuthenticated}>
        <AddNewDoctor />
      </PrivateRoute>
    }
  /> */}
  {/* <Route
    path="/admin/addnew"
    element={
      <PrivateRoute isAuthenticated={isAuthenticated}>
        <AddNewAdmin />
      </PrivateRoute>
    }
  /> */}
  {/* <Route
    path="/messages"
    element={
      <PrivateRoute isAuthenticated={isAuthenticated}>
        <Messages />
      </PrivateRoute>
    }
  /> */}
  {/* <Route
    path="/doctors"
    element={
      <PrivateRoute isAuthenticated={isAuthenticated}>
        <Doctors />
      </PrivateRoute>
    }
  /> */}
  <Route path="/login" element={<LoginPage />} />
</Routes>

      <ToastContainer position="top-center" />
      </div>
    </Router>
    </AuthProvider>
   
  );
};

export default App;