/* eslint-disable react/prop-types */
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "../../pages/Doctors/DoctorAbout";
import { doctorPath } from "../../config";

function Overview({ userData }) {
  console.log(userData);
  return (
    <div>
      <section className="max-w-[1170px] px-5 mx-auto ">
        <div className="grid md:grid-cols-2 gap-[50px]">
          <div className="md:col-span-2">
            <div className="flex flex-col items-center gap-5 md:flex-row ">
              <figure className="max-w-[300px] max-h-[200px]  ">
                <img
                  src={`${doctorPath}${userData.photo}`}
                  alt=""
                  className="w-full rounded-lg "
                />
              </figure>
              <div>
                <span
                  className="bg-[#CCF0F3] text-irisBlueColor py-1 lg:py-2 lg:px-6
                text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded "
                >
                  {userData.specialization}
                </span>
                <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold ">
                  {userData.name}
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
                  {userData.bio}
                </p>
              </div>
            </div>

            <div className="mt-[50px]">
              <DoctorAbout details={userData} />
            </div>
         
          </div>
        </div>
      </section>
    </div>
  );
}

export default Overview;
