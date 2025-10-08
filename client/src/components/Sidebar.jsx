import React, { useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { Context } from "../main";
import { PiNotepadFill } from "react-icons/pi";
const Sidebar = () => {
  const [show, setShow] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  // const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const gotoHomePage = () => {
    navigateTo("/");
    setShow(false);
  };
  const gotoDoctorsPage = () => {
    navigateTo("/doctors");
    setShow(false);
  };
  const gotoMessagesPage = () => {
    navigateTo("/messages");
    setShow(false);
  };
  const gotoAddNewDoctor = () => {
    navigateTo("/doctor");
    setShow(false);
  };
  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(false);
  };
         
  
   const gotoCreateNewAppointmnet = () => {
    navigateTo("/createAppointment");
    setShow(false);
  };

  const handleLogout = async () => {
    try {
      // const res = await axios.get("http://localhost:5000/api/v1/user/admin/logout", {
      //   withCredentials: true,
      // });
      // toast.success(res.data.message);
      toast.success("Logged out successfully");
      setIsAuthenticated(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  if (!isAuthenticated) {
    return null; // or redirect to login page
  }

  return (
    <div className="">
     <nav
  className={`fixed w-[120px] bg-black flex flex-col justify-center h-full items-center py-[70px]`}
>
  <div className="flex flex-col gap-[30px]">
    {/* TiHome icon already wrapped */}
    <div className="bg-[#212121] rounded-full  shadow-amber-50 px-2 flex justify-center items-center h-[50px] w-[50px]">
      <TiHome
        className="w-[30px] h-[30px]  text-white hover:rounded-lg hover:transition-colors hover:duration-300 hover:cursor-pointer"
        onClick={gotoHomePage}
      />
    </div>

    {/* Wrap the other icons similarly */}
      <div className="bg-[#212121] rounded-full  shadow-amber-50 px-2 flex justify-center items-center h-[50px] w-[50px]">
      <FaUserDoctor
        className="w-[30px] h-[30px]  text-[34px] text-white  hover:rounded-lg hover:transition-colors hover:duration-300 hover:cursor-pointer"
        onClick={gotoDoctorsPage}
      />
    </div>
      <div className="bg-[#212121] rounded-full  shadow-amber-50 px-2 flex justify-center items-center h-[50px] w-[50px]">
      <PiNotepadFill
        className="w-[30px] h-[30px]  text-[34px] text-white  hover:rounded-lg hover:transition-colors hover:duration-300 hover:cursor-pointer"
        onClick={gotoCreateNewAppointmnet}
      />
    </div>

      <div className="bg-[#212121] rounded-full  shadow-amber-50 px-2 flex justify-center items-center h-[50px] w-[50px]">
      <MdAddModerator
        className="w-[30px] h-[30px]  text-[34px] text-white  hover:rounded-lg hover:transition-colors hover:duration-300 hover:cursor-pointer"
        onClick={gotoAddNewAdmin}
      />
    </div>

      <div className="bg-[#212121] rounded-full  shadow-amber-50 px-2 flex justify-center items-center h-[50px] w-[50px]">
      <IoPersonAddSharp
        className="w-[30px] h-[30px]  text-[34px] text-white  hover:rounded-lg hover:transition-colors hover:duration-300 hover:cursor-pointer"
        onClick={gotoAddNewDoctor}
      />
    </div>

      <div className="bg-[#212121] rounded-full  shadow-amber-50 px-2 flex justify-center items-center h-[50px] w-[50px]">
      <AiFillMessage
        className="w-[30px] h-[30px]  text-[34px] text-white  hover:rounded-lg hover:transition-colors hover:duration-300 hover:cursor-pointer"
        onClick={gotoMessagesPage}
      />
    </div>

      <div className="bg-[#212121] rounded-full  shadow-amber-50 px-2 flex justify-center items-center h-[50px] w-[50px]">
      <RiLogoutBoxFill
        className="w-[30px] h-[30px]  text-[34px] text-white  hover:rounded-lg hover:transition-colors hover:duration-300 hover:cursor-pointer"
        onClick={handleLogout}
      />
    </div>
  </div>
</nav>

      <div
        onClick={() => setShow(!show)}
        className="lg:hidden max-[1208px]:block fixed top-[30px] left-[40px] text-[34px] bg-[#3939d9f2] text-white h-[40px] w-[40px] rounded-lg flex justify-center items-center max-[485px]:left-[20px] cursor-pointer"
      >
        <GiHamburgerMenu />
         <GiHamburgerMenu />
         
      </div>
    </div>
  );
};

export default Sidebar;