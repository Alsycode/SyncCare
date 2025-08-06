import React, { useContext, useEffect, useState } from "react";
// import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const isAuthenticated = true;

  useEffect(() => {
    // const fetchAppointments = async () => {
    //   try {
    //     const { data } = await axios.get(
    //       "http://localhost:5000/api/v1/appointment/getall",
    //       { withCredentials: true }
    //     );
    //     setAppointments(data.appointments);
    //   } catch (error) {
    //     setAppointments([]);
    //   }
    // };
    // fetchAppointments();

    // Set dummy appointments as placeholders
    setAppointments([
      {
        _id: "1",
        firstName: "Alice",
        lastName: "Johnson",
        appointment_date: "2025-08-10T10:00:00Z",
        doctor: { firstName: "John", lastName: "Smith" },
        department: "Cardiology",
        status: "Pending",
        hasVisited: false,
      },
      {
        _id: "2",
        firstName: "Bob",
        lastName: "Williams",
        appointment_date: "2025-08-11T14:30:00Z",
        doctor: { firstName: "Emily", lastName: "Johnson" },
        department: "Dermatology",
        status: "Accepted",
        hasVisited: true,
      },
      {
        _id: "3",
        firstName: "Clara",
        lastName: "Davis",
        appointment_date: "2025-08-12T09:15:00Z",
        doctor: { firstName: "Olivia", lastName: "Davis" },
        department: "Pediatrics",
        status: "Rejected",
        hasVisited: false,
      },
      {
        _id: "4",
        firstName: "David",
        lastName: "Brown",
        appointment_date: "2025-08-13T16:45:00Z",
        doctor: { firstName: "William", lastName: "Brown" },
        department: "Orthopedics",
        status: "Pending",
        hasVisited: true,
      },
    ]);
  }, []);

  // const handleUpdateStatus = async (appointmentId, status) => {
  //   try {
  //     const { data } = await axios.put(
  //       `http://localhost:5000/api/v1/appointment/update/${appointmentId}`,
  //       { status },
  //       { withCredentials: true }
  //     );
  //     setAppointments((prevAppointments) =>
  //       prevAppointments.map((appointment) =>
  //         appointment._id === appointmentId
  //           ? { ...appointment, status }
  //           : appointment
  //       )
  //     );
  //     toast.success(data.message);
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   }
  // };

  const admin = {
    firstName: "John",
    lastName: "Doe",
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="min-h-screen ml-[120px] rounded-bl-[50px] rounded-tl-[50px] bg-doc flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-7xl  shadow-lg rounded-xl p-8 sm:p-10">
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 h-[35vh] max-[1020px]:flex-wrap max-[1020px]:h-auto">
            <div className="flex-[2] flex items-center rounded-xl  p-[20px_20px_0_10px] max-[1020px]:flex-none max-[1020px]:w-full max-[1020px]:h-[265px] max-[485px]:flex-col max-[485px]:h-auto max-[485px]:p-5">
              <img
                src="/doc.png"
                alt="docImg"
                className="h-full flex-1 max-[485px]:w-[270px] max-[485px]:h-[270px] max-[485px]:mb-[25px]"
              />
              <div className="flex-[2]">
                <div className="flex items-center text-[34px] mb-3 max-[1376px]:text-[26px] max-[485px]:justify-center">
                  <p className="mr-[10px] text-[34px] text-white max-[1376px]:text-[26px]">
                    Hello,
                  </p>
                  <h5 className="text-teal-400">
                    {admin && `${admin.firstName} ${admin.lastName}`}
                  </h5>
                </div>
                <p className="text-base text-gray-300 max-[1376px]:text-sm">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis, nam
                  molestias. Eaque molestiae ipsam commodi neque. Assumenda repellendus
                  necessitatibus itaque.
                </p>
              </div>
            </div>
            <div className="flex-1 rounded-xl bg-teal-600 text-white p-[20px_25px] flex flex-col justify-center gap-3 max-[1020px]:h-[175px] max-[620px]:flex-none max-[620px]:w-full">
              <p className="text-2xl font-semibold max-[1376px]:text-xl">
                Total Appointments
              </p>
              <h3 className="text-[34px] font-bold tracking-[2px] max-[1376px]:text-xl">
                1500
              </h3>
            </div>
            <div className="flex-1 rounded-xl bg-gray-600 text-gray-200 p-[20px_25px] flex flex-col justify-center gap-3 max-[1020px]:h-[175px] max-[620px]:flex-none max-[620px]:w-full">
              <p className="text-2xl font-semibold max-[1376px]:text-xl">
                Registered Doctors
              </p>
              <h3 className="text-[34px] font-bold tracking-[2px] max-[1376px]:text-xl">
                10
              </h3>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 shadow-md max-[1020px]:h-auto">
            <h5 className="text-2xl tracking-[2px] mb-5 text-white">Appointments</h5>
            <div className="overflow-x-auto">
              <table className="w-full text-gray-200 text-xl">
                <thead className="text-left">
                  <tr>
                    <th className="p-[12px_0]">Patient</th>
                    <th className="p-[12px_0]">Date</th>
                    <th className="p-[12px_0]">Doctor</th>
                    <th className="p-[12px_0]">Department</th>
                    <th className="p-[12px_0]">Status</th>
                    <th className="p-[12px_0]">Visited</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments && appointments.length > 0 ? (
                    appointments.map((appointment) => (
                      <tr
                        key={appointment._id}
                        className="hover:bg-gray-700 transition-colors"
                      >
                        <td className="p-[12px_0]">{`${appointment.firstName} ${appointment.lastName}`}</td>
                        <td className="p-[12px_0]">
                          {appointment.appointment_date.substring(0, 16)}
                        </td>
                        <td className="p-[12px_0]">{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                        <td className="p-[12px_0]">{appointment.department}</td>
                        <td className="p-[12px_0]">
                          <select
                            className={`text-xl border-none w-full font-semibold focus:outline-none bg-transparent ${
                              appointment.status === "Pending"
                                ? "text-[#eab308]"
                                : appointment.status === "Accepted"
                                ? "text-[#16a34a]"
                                : "text-[#dc2626]"
                            }`}
                            value={appointment.status}
                            // onChange={(e) =>
                            //   handleUpdateStatus(appointment._id, e.target.value)
                            // }
                          >
                            <option value="Pending" className="text-[#eab308] bg-gray-800">
                              Pending
                            </option>
                            <option value="Accepted" className="text-[#16a34a] bg-gray-800">
                              Accepted
                            </option>
                            <option value="Rejected" className="text-[#dc2626] bg-gray-800">
                              Rejected
                            </option>
                          </select>
                        </td>
                        <td className="p-[12px_0]">
                          {appointment.hasVisited === true ? (
                            <GoCheckCircleFill className="text-[#16a34a] text-xl mx-auto" />
                          ) : (
                            <AiFillCloseCircle className="text-[#dc2626] text-xl mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-[12px_0] text-center">
                        No Appointments Found!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;