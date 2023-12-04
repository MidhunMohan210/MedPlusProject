import heroimg01 from "../assets/medplus/homePage01.png";
import vediocall from "../assets/medplus/vediocall.png";
import findDoc from "../assets/medplus/find-doc.png";
import findlocation from "../assets/medplus/find-location.png";
import BookAppoinments from "../assets/medplus/book.png";
import vritualDoctor from "../assets/medplus/vdr.png";
import faqImg from "../assets/medplus/faq.png";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import About from "../components/About/About";
import FaqIist from "../components/Faq/FaqIist";
import Review from "../components/Reviews/Review";
// import { setBookingData } from "../slices/userSlice.js/doctorsDataSlice";
// import { useDispatch } from "react-redux";

function Home() {
  return (
    <>
      <div className="bg-[#f6feff]">
        {/* ==== hero section start ==== */}
        <section className="hero__section pt-[1px] 2xl:h-[800px] ">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-[50px] items-center justify-between ">
              {/* ===hero content left==== */}
              <div className="flex flex-col items-center w-full text-center lg:w-1/2 lg:items-start lg:text-left">
                <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px] lg:text-[55px] ">
                  We help patients live a healthy life
                </h1>
                <p className="p-2 text__para">
                  Prioritizing your well-being, we're dedicated to helping
                  patients lead healthier lives. With cutting-edge facilities
                  and a caring team, we're here to guide you on your path to
                  wellness
                </p>
                {/* <button className="btn">Request an Appointment</button> */}
                <button className="relative group cursor-pointer text-sky-50  overflow-hidden h-12 w-64 rounded-xl bg-sky-800 p-2 mt-4  flex justify-center items-center font-extrabold">
                  <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-40 h-40 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-900"></div>
                  <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-32 h-32 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-800"></div>
                  <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-24 h-24 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-700"></div>
                  <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-14 h-14 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-600"></div>
                  <p className="z-10">Request an Appointment</p>
                </button>

                {/* ===hero counter=== */}
                <div className="flex flex-col items-center gap-5 mt-5 lg:mt-10 lg:flex-row lg:gap-10 ">
                  <div>
                    <div className="flex flex-col items-center justify-center">
                      <h2 className="text-[36px] leading-[56px] lg:text-[30px] lg:leading-[54px] font-[700] text-headingColor  ">
                        30+
                      </h2>
                      <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]  "></span>
                      <p className="text__para lg:mt-[6px] md:mt-[6px]">
                        Years of experience
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-col items-center justify-center">
                      <h2 className="text-[36px] leading-[56px] lg:text-[30px] lg:leading-[54px] font-[700] text-headingColor  ">
                        15+
                      </h2>
                      <span className="w-[100px] h-2 bg-green-600 rounded-full block mt-[-14px] "></span>
                      <p className="text__para lg:mt-[6px] md:mt-[6px] ">
                        Clinic Locations
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-col items-center justify-center">
                      <h2 className="text-[36px] leading-[56px] lg:text-[30px] lg:leading-[54px] font-[700] text-headingColor  ">
                        100%
                      </h2>
                      <span className="w-[100px] h-2 bg-purple-600 rounded-full block mt-[-14px] "></span>
                      <p className="text__para lg:mt-[6px] md:mt-[6px]">
                        Patient Satisfaction
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* ===hero content right ==== */}
              <div className="flex flex-shrink-0 w-full lg:w-1/2 lg:flex-shrink">
                <img src={heroimg01} alt="" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </section>
        {/* ===hero section end=== */}

        {/* ====3images start===== */}
        <section>
          <div className="container">
            <div className="lg-w-[470px] mx-auto  "></div>
            <h2 className="text-center heading ">
              Delivering Excellence <br />
              in Medical Services
            </h2>
            <p className="px-1 text-center ">
              Exceptional Healthcare for All. Experience unmatched expertise in{" "}
              <br /> our healthcare system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[20px]   md:px-6  lg:px-[11rem] ">
            <div className="py-[40px] px-[50px] ">
              <div className="flex items-center justify-center mt-10 w-[300] h-[300] ">
                <img src={findDoc} alt="" />
              </div>
              <div className="mt-[20px] ">
                <h2 className="text-[26px] font-[700] text-headingColor leading-9 text-center  ">
                  Find a Doctor
                </h2>
                <p className="text-[16px] leading-7  text-textColor font-[400] text-center mt-4  ">
                  Discover the Right Doctor for Your Care
                </p>
              </div>
            </div>

            <div className="py-[30px] px-9 ">
              <div className="flex items-center justify-center w-[300] h-[300]">
                <img src={findlocation} alt="" />
              </div>
              <div className="mt-[30px] ">
                <h2 className="text-[26px] font-[700] text-headingColor leading-9 text-center  ">
                  Find a Location
                </h2>
                <p className="text-[16px] leading-7  text-textColor font-[400] text-center mt-4  ">
                  Select the Ideal Clinic Location to Serve You Better.
                </p>
              </div>
            </div>

            <div className="py-[30px] px-9  ">
              <div className="flex items-center relative top-7 justify-center w-[300] h-[300] ">
                <img src={BookAppoinments} alt="" />
              </div>
              <div className="mt-[30px] ">
                <h2 className="text-[26px] font-[700] text-headingColor leading-9 text-center lg:w-[223px] ">
                  Book Appoinment
                </h2>
                <p className="text-[16px] leading-7  text-textColor font-[400] text-center mt-4   ">
                  Secure Your Appointment with Us
                </p>
              </div>
            </div>
          </div>

          <div className="">
            <Link
              to="/doctors"
              className="w-[40px] h-[40px] relative top-0  mx-auto flex mt-[30px] rounded-full border border-solid border-[#181A1E]  items-center justify-center hover:bg-blue-500 "
            >
              <AiOutlineArrowRight />
            </Link>
          </div>
        </section>
        {/* ====3images end===== */}

        {/* ====about start===== */}
        <About />
        {/* ====about end===== */}

        {/* ====vritual treatment start==== */}

        <section className="mt-[40px]">
          <div className="container">
            <div className="flex flex-col items-center justify-center p-4 text-center lg:flex-row lg:gap-10 lg:justify-start lg:text-left">
              {/* ====vritual treatment content==== */}

              <div className="xl:w-[670px] ">
                <h2 className="heading">Get virtual treatment anytime.</h2>
                <ul className="pl-4">
                  <li className="text__para">
                    1. Schedule the appointment directly.
                  </li>
                  <li className="text__para">
                    2. Search for your physician here, and contact their office.
                  </li>
                  <li className="text__para">
                    3. View our physicians who are accepting new patients, use
                    the online scheduling tool to select an appointment time.
                  </li>
                </ul>
                <Link to="/">
                  <button className="btn">Learn More</button>
                </Link>
              </div>

              {/* ===feature image=== */}
              <div className="relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-[-67px] left-[-10px]  ">
                <img
                  src={vritualDoctor}
                  alt=""
                  className="rounded-md md:w-[70%]  sm:w-[77%] w-[77%] md:mr-[26px] lg:w-[77%] "
                />
                <div className=" absolute  lg:w-[248px] bg-white  md:bottom-[-44px]   z-20 p-2 pb-3  rounded-[10px] shadow-lg sm:bottom-[-2.5rem] md:left-[119px] md:w-[284px] sm:left-[19px]  sm:w-[194px] w-[135px] bottom-[-33px] left-[21px] lg:bottom-[-71px] lg:left-[21px]  ">
                  <img src={vediocall} alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====vritual treatment end==== */}

        {/* =====  FAQ SECTION start  ==== */}

        <section className="px-2 mt-12">
          <div className="container">
            <div className="flex justify-center lg:mb-12 ">
              <h2 className="heading  md:hidden hidden lg:block leading-[35px] text-[27px] text-center lg:text-[40px] lg:text-left lg:leading-[47px] ">
                Frequently inquired questions
              </h2>
            </div>
            <div className=" flex justify-between gap-[50px] lg:gap-12 md:justify-center md:mr-[50px]  ">
              <div className=" relative top-[43px] lg:w-[38%] md:w-[50%] hidden md:block lg:top-0 md:top-[135px]">
                <img src={faqImg} alt="" />
              </div>
              <div className="w-full md:w-1/2 ">
                <h2 className="heading  lg:hidden leading-[35px] text-[27px] text-center lg:text-[40px] lg:text-left lg:leading-[47px] ">
                  Frequently inquired questions
                </h2>

                <FaqIist />
              </div>
            </div>
          </div>
        </section>

        {/* =====  FAQ SECTION end  ==== */}

        {/* =====  Review start  ==== */}

        <section>
          <div className="container">
            <div className="xl:w-[470] mx-auto flex flex-col items-center ">
              <h2 className="text-center heading sm:px-4">
                What our patients says
              </h2>
              <p className="text__para text-center sm:px-4 md:p-3 p-3 lg:w-[600px] lg:text-center">
                Discover the experiences and testimonials that highlight our
                commitment to exceptional care and service
              </p>
            </div>
            <Review />
          </div>
          <section className="container h-full flex items-center justify-center"></section>
        </section>

        {/* =====  Review start ==== */}
      </div>
    </>
  );
}

export default Home;
