import { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { userPath, doctorPath } from "../../config";
import { useDispatch } from "react-redux";
import { logoutPatient } from "../../slices/patientAuthSlice.js";
import logo2 from "../../assets/images/logo.png";
import { IoNotifications } from "react-icons/io5";
import Notification from "../notification/Notification.jsx";

const navlinks = [
  {
    path: "/users/home",
    display: "Home",
  },
  {
    path: "/users/doctors", // Fixed missing "/" in the path
    display: "Doctors",
  },
  {
    path: "/services", // Added "/" to the path
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

function Header() {
  const dispatch = useDispatch();
  const headerRef = useRef(null);
  const menuref = useRef(null);
  const [notification, setNotification] = useState(false);

  const user = JSON.parse(localStorage.getItem("PatientInfo"));
  const type = user?.type;
  const token = user?.token;
  const path = type === "patient" ? userPath : doctorPath;

  const handleStickyHeader = () => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      headerRef.current.classList.add("sticky__header");
    } else {
      headerRef.current.classList.remove("sticky__header");
    }
  };

  useEffect(() => {
    // Attach the event listener directly to the window
    window.addEventListener("scroll", handleStickyHeader);

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("scroll", handleStickyHeader);
    };
  }, []); // Empty dependency array to ensure the effect runs only once on mount

  const toggleMenu = () => {
    if (menuref.current) {
      menuref.current.classList.toggle("show__menu");
    }
  };

  const handleLogout = () => {
    dispatch(logoutPatient());
  };

  return (
    <header className="flex items-center header" ref={headerRef}>
      <div className="container p-6 ">
        <div className="flex items-center justify-between">
          <div>
            <img src={logo2} alt="" />
          </div>

          {/* ========== menu ======== */}
          <div
            className="navigation z-[1000]"
            ref={menuref}
            onClick={toggleMenu}
          >
            <ul className="menu flex items-center gap-[2.7rem]">
              {navlinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    activeClassName="active" // Use activeClassName to set the active class
                    className="text-textColor text-[16px] leading-7 font-[500] hover:text-irisBlueColor "
                  >
                    <span> {link.display}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* ==== nav right ==== */}
          <div className="flex items-center gap-4 mt-2 mb-2">
            {token && user ? (
              <div className="flex">
                <div
                  onClick={() => setNotification(true)}
                  className="flex items-center mr-6 cursor-pointer"
                >
                  <IoNotifications className="text-[20px]" />
                </div>
                <Link to={"/userProfile"}>
                  <div className="flex items-center gap-4">
                    <figure className="w-[40px] h-[35px] flex align-middle">
                      <img
                        src={`${path}${user.photo}`}
                        alt=""
                        className="rounded-full"
                      />
                    </figure>
                    <h2 className="flex font-semibold">{user?.name}</h2>
                  </div>
                </Link>
                <Link to="/users/login" className="flex items-center ml-5">
                  <button
                    onClick={handleLogout}
                    className="bg-primaryColor py-2 px-6 text-white font-[600] h-[37px] flex items-center cursor-pointer justify-center rounded-[50px]   "
                  >
                    Logout
                  </button>
                </Link>

                {/* notification start */}

                {notification && (
                  <Notification setNotification={setNotification} />
                )}

                {/* notification end */}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/users/login">
                  <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[37px] flex items-center cursor-pointer justify-center rounded-[50px]   ">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[37px] flex items-center cursor-pointer justify-center rounded-[50px]   ">
                    Signup
                  </button>
                </Link>
              </div>
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer " />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
