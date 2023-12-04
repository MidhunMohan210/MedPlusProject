import { useEffect, useState } from "react";
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "./DoctorAbout";
import DoctorFeedback from "./DoctorFeedback";
import SidePanel from "./SidePanel";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../config";
import getSingleDoctor from "../../hooks/useFetchData";
const path = "http://localhost:7000/doctorMedia/";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/About/Error";
import { FaComments } from "react-icons/fa";
import ChatUser from "../../components/chat/ChatUser";
import { token } from "../../config";

function DoctorDetails() {
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  let { id } = useParams();
  const doctorId = id;

  const { data, loading, error } = getSingleDoctor(
    `${BASE_URL}/users/getSingleDoctor/${doctorId}`
  );
  const user = JSON.parse(localStorage.getItem("PatientInfo"));
  console.log(user);
  // console.log(data);

  useEffect(() => {
    if (error) {
      console.log("Error in fetching doctor details");
    } else if (data && !loading) {
      setTimeout(() => {
        setIsLoading(false);

        setDetails(data);
      }, 1000);
    }
  }, [data, loading, error]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Adjust the scroll threshold based on your preference
      if (scrollY < 890) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const disablePageScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const enablePageScroll = () => {
    document.body.style.overflow = "";
  };

  useEffect(() => {
    // Enable or disable page scroll based on the chat state
    if (isChatOpen) {
      disablePageScroll();
    } else {
      enablePageScroll();
    }
  }, [isChatOpen]);

  const chatHandler = async () => {
    setIsChatOpen(true);
    console.log("haiiiii");

    try {
      const res = await fetch(
        `${BASE_URL}/users/createRoom/${data._id}/${user._id}`,
        {
          method: "post",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let result = await res.json();
      console.log(result);

      if (!res.ok) {
        throw new Error(result.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const [tab, setTab] = useState("about");
  return (
    <div>
      {isLoading && (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      )}
      {error && <Error errorMessage={error.message} />}
      {!isLoading && !error && (
        <section className={`max-w-[1170px] px-5 mx-auto  `}>
          <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
              <div className="flex flex-col items-center gap-5 md:flex-row ">
                <figure className="max-w-[300px] max-h-[200px]  ">
                  <img
                    src={`${path}${details.photo}`}
                    alt=""
                    className="w-full rounded-lg "
                  />
                </figure>
                <div>
                  <span
                    className="bg-[#CCF0F3] text-irisBlueColor py-1 lg:py-2 lg:px-6
              text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded "
                  >
                    {details.specialization}
                  </span>
                  <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold ">
                    {details.name}
                  </h3>
                  <div className="flex items-center gap-[6px] ">
                    <span
                      className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold 
                text-headingColor  "
                    >
                      <img src={starIcon} alt="" />
                      4.8
                    </span>
                    <span
                      className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold 
                text-textColor "
                    >
                      (272)
                    </span>
                  </div>
                  <p className=" text__para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]  ">
                    {details.bio}
                  </p>
                </div>
              </div>

              <div className="mt-[50px]  border-b border-solid border-[#0066ff43]  ">
                <button
                  onClick={() => setTab("about")}
                  className={` ${
                    tab === "about" &&
                    "border-b border-solid border-primaryColor"
                  } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold `}
                >
                  About
                </button>
                <button
                  onClick={() => setTab("feedBack")}
                  className={` ${
                    tab === "feedBack" &&
                    "border-b border-solid border-primaryColor"
                  } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold `}
                >
                  Feedback
                </button>
              </div>

              <div className="mt-[50px]">
                {tab === "about" && <DoctorAbout details={details} />}
                {tab === "feedBack" && <DoctorFeedback details={details} />}
              </div>
            </div>
            <div>
              <SidePanel details={details} />
            </div>
            {isScrolled && (
              <div className="fixed bottom-10 right-6">
                <button
                  // onClick={() => setIsChatOpen(true)}
                  onClick={() => chatHandler()}
                  className="bg-blue-500 text-white p-4 rounded-full shadow-lg focus:outline-none"
                >
                  <FaComments size={24} />
                </button>
              </div>
            )}

            {isChatOpen && (
              <>
                {/* Overlay to dim other elements */}
                <div
                  className="fixed inset-0 bg-black opacity-50"
                  onClick={() => setIsChatOpen(false)}
                ></div>

                {/* Chat Popup */}
                <div className="fixed bottom-0 right-[100px] w-96">
                  <ChatUser doctor={data._id} user={user._id} photo={user.photo} doctorPic={details.photo} userName={user.name} onClose={() => setIsChatOpen(false)} />
                </div>
              </>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default DoctorDetails;
