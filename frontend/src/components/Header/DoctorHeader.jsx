import {  useEffect, useRef ,useState} from "react";
import logo2 from "../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";

import { useDispatch } from "react-redux";
import {logoutDoctor} from '../../slices/doctorAuthSlice.js'
import { IoNotifications } from "react-icons/io5";
import Notification from "../notification/NotificationDoctor.jsx";



import { userPath, doctorPath } from "../../config";

const navlinks = [
  {
    path: "/doctors/home",
    display: "Home",
  },
  // {
  //   path: "/doctors/doctors",
  //   display: "doctors",
  // },
 
  {
    path: "/doctors/appointments",
    display: "Appointments",
  },
  {
    path: "/doctors/chats",
    display: "Chats",
  },
];

const DoctorHeader = () => {
  const dispatch=useDispatch()
  const [notification, setNotification] = useState(false);


  let path;
  // const { user, dispatch } = useContext(authContext);
  const user=JSON.parse(localStorage.getItem('doctorInfo'))

  console.log(user);
  console.log(user);
  const type = user?.type;
  const token = user?.token;
  path = type === "patient" ? userPath : doctorPath;

  const headerRef = useRef(null);
  const menuref = useRef(null);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();

    return () => {
      window.removeEventListener("scroll", handleStickyHeader);
    };
  });

  const toggleMenu = () => menuref.current.classList.toggle("show__menu");

  const handleLogout = () => {
    // dispatch({
    //   type: "LOGOUT",
    // });
    dispatch(logoutDoctor())
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
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600] "
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-irisBlueColor "
                    }
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
                <Link to={"/doctors/doctorProfile"}>
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
                <Link to="/doctors/login " className="flex items-center ml-5">
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
                <Link to="/doctors/login">
                  <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[37px] flex items-center cursor-pointer justify-center rounded-[50px]   ">
                    Login
                  </button>
                </Link>
                <Link to="/doctorSignup">
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
};

export default DoctorHeader;
