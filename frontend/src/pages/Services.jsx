import services from "../../src/assets/medplus/services.jpg";
import { FaShieldHeart } from "react-icons/fa6";
import { FcMindMap } from "react-icons/fc";
import { HiCursorClick } from "react-icons/hi";
import { FaBabyCarriage } from "react-icons/fa";
import { Link } from "react-router-dom";

function Services() {
  return (
    <div>
      <div className="xl:w-[470px] mx-auto mt-10">
        <h2 className="heading text-center">Our medical services</h2>
        <p className="text__para text-center">
          World-className care for everyone .Our health system offers
          unmatched,expert health care.
        </p>
      </div>
      <section className="relative pt-16 bg-blueGray-50">
        <div className="container mx-auto px-0">
          <div className="flex flex-wrap items-center">
            <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-78">
              <div className="relative flex flex-col min-w-0 break-word w-full mb-6 shadow-lg rounded-lg bg-pink-500">
                <img
                  src={services}
                  alt="..."
                  className="w-full align-middle rounded-t-lg"
                />
                <blockquote className="relative p-8 mb-4">
                  <h4 className="text-xl font-bold text-white">
                    Dedicated to Your Well-being"
                  </h4>
                  <p className="text-md font-light mt-2 text-white">
                    Step into Medplus, where our devoted healthcare team is
                    wholeheartedly dedicated to your well-being. Our
                    accomplished doctors seamlessly combine expertise with
                    empathy, transforming each consultation into a personalized
                    journey towards your optimal health
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="w-full md:w-7/12 px-4">
              <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col mt-4">
                    <Link to={"/users/serviceDetails/Cardiology"}>
                      <div className="px-4 py-5 flex-auto hover:shadow-md hover:scale-105 transition duration-100 ease-in-out cursor-pointer">
                        <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                          <FaShieldHeart className="text-red-500 text-[20px]" />
                        </div>
                        <h6 className="text-xl mb-1 font-semibold">
                          Cardiology
                        </h6>
                        <p className="mb-4 text-blueGray-500">
                          Heartfelt Care for Stronger Hearts: Navigating
                          Cardiological Wellness Together.{" "}
                        </p>
                      </div>
                    </Link>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <Link to={"/users/serviceDetails/Neurology"}>
                    <div className="px-4 py-5 flex-auto  hover:shadow-md hover:scale-105 transition duration-100 ease-in-out cursor-pointer">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <FcMindMap className="text-[20px]" />
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">Neurology</h6>
                      <p className="mb-4 text-blueGray-500">
                        Nurturing Neurological Wellness, Unleashing Potential
                        through Expert Care..
                      </p>
                    </div>
                    </Link>
                  </div>
                </div>
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col min-w-0 mt-4">
                    <Link to={"/users/serviceDetails/Dermatology"}>
                      <div className="px-4 py-5 flex-auto  hover:shadow-md hover:scale-105 transition duration-100 ease-in-out cursor-pointer ">
                        <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                          <HiCursorClick className="text-[20px] text-blue-500" />
                        </div>
                        <h6 className="text-xl mb-1 font-semibold">
                          Dermatology
                        </h6>
                        <p className="mb-4 text-blueGray-500">
                          Radiant Skin, Expert Care: Your Journey to
                          Dermatological Excellence
                        </p>
                      </div>
                    </Link>
                  </div>
                  <div className="relative flex flex-col min-w-0 mt-7">
                    <Link to={"/users/serviceDetails/Pediatrics"}>
                    <div className="px-4 py-5 flex-auto  hover:shadow-md hover:scale-105 transition duration-100 ease-in-out cursor-pointer">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <FaBabyCarriage />
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">Pediatrics</h6>
                      <p className="mb-4 text-blueGray-500">
                        Tender Care for Little Ones, Nurturing Healthy Futures
                        in Pediatrics.
                      </p>
                    </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
