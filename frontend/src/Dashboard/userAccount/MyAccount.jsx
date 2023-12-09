import {  useEffect, useState } from "react";
import MyBooking from "./MyBokking";
import ProfileSettings from "./ProfileSettings";
import userGetProfile from "../../hooks/useFetchData";
import { BASE_URL, type ,userPath} from "../../config";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/About/Error";
// const path = "http://localhost:7000/userMedia/";


function MyAccount() {
 // console.log(type);
 // const { dispatch } = useContext(authContext);
 const [tab, setTab] = useState("bookings");
 // const [userData, setUserData] = useState(null);

 const {
   data: userData,
   loading,
   error,
   refetch,
 } = userGetProfile(`${BASE_URL}/users/getUserProfile`, type);

 console.log(userData);
 useEffect(() => {
   if (error) {
     console.log("Error in Doctor profile fetching data");
   }
 }, [error, userData, loading, userData]);

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto mt-16">
        {loading && <Loader />}
        {error && <Error errorMessage={error.message} />}
        {!loading && !error && (
          <div className="grid gap-10 md:grid-cols-3">
            <div className="pb-[50px] px-[30px] rounded-md shadow-lg">
              <div className="flex items-center justify-center">
                <figure className="w-[100px]  h-[100px] rounded-full border-2 border-solid border-primaryColor  ">
                  <img
                    src={`${userPath}${userData.photo}`}
                    alt=""
                    className="w-full h-full rounded-full "
                  />
                </figure>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold  ">
                  {userData.name}
                </h3>
                <p className="text-textColor text-[15px] leading-6 font-medium ">
                  {userData.email}
                </p>
                <p className="text-textColor text-[15px] leading-6 font-medium ">
                  Blood Type :{" "}
                  <span className="ml-2 text-headingColor text-[22px] leading-8 ">
                    {userData.bloodType}
                  </span>
                </p>
              </div>

              <div className="mt-[50px] md:mt-[100px]    ">
                {/* <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 text-white p-3 text-[16px] leading-7 mb-2 rounded-md "
                >
                  Logout
                </button> */}
                {/* <button className="w-full bg-red-600 text-white p-3 text-[16px] leading-7 rounded-md ">
                  Delete Account
                </button> */}
              </div>
            </div>

            <div className="md col-span-2  md:px-[30px] ">
              <div>
                <button
                  onClick={() => setTab("bookings")}
                  className={`${
                    tab === "bookings" &&
                    "bg-primaryColor text-white font-normal"
                  }    p-2  mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7  border
              border-solid border-primaryColor `}
                >
                  My Bookings
                </button>

                <button
                  onClick={() => setTab("settings")}
                  className={` ${
                    tab === "settings" &&
                    "bg-primaryColor text-white font-normal"
                  }  p-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7  border
              border-solid border-primaryColor `}
                >
                  Profile Settings
                </button>
              </div>

              {tab == "bookings" && <MyBooking />}
              {tab == "settings" && (
                <ProfileSettings user={userData} refetch={refetch} />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default MyAccount;
