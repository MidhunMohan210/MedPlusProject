/* eslint-disable react/prop-types */
import { formDate } from "../../utils/formDate";
import { useState } from "react";
// const path = "http://localhost:7000/doctorMedia/";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { doctorPath } from "../../config";

function DoctorAbout({ details }) {
  console.log(details.certificate);
  const [carosal, setCarosal] = useState(false);
  const slides = details.certificate?.map((certificate) => ({
    certificate: certificate,
  }));

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  console.log(details);
  const handleCertificate = () => {
    setCarosal(true);
    // Swal.fire({
    //   title: "Certificate",
    //   // text: "Modal with a custom image.",
    //   imageUrl: `${path}${details.certificate}`,
    //   imageWidth: 400,
    //   imageHeight: 300,
    //   imageAlt: "Custom image",
    // });
  };

  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2 ">
          About Of
          <span className="font-bold text-irisBlueColor text-[24px] leading-9">
            {details?.name}
          </span>
        </h3>
        <p className="text__para">{details?.about}</p>
      </div>
      <div className="mt-12">
        <button
          onClick={() => handleCertificate()}
          className="bg-gray-500 p-2 px-3 text-white rounded-md"
        >
          View certificate
        </button>
      </div>
      <div className="mt-12">
        <h3
          className="text-[20px] leading-[30px] text-headingColor 
        font-semibold   "
        >
          Education
        </h3>

        <ul className="pt-4 md:p-5">
          {details.qualifications &&
            details.qualifications.map((el, index) => (
              <li
                key={index}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px] "
              >
                <div>
                  <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                    {formDate(`${el.startDate}`)} - {formDate(`${el.endDate}`)}
                  </span>
                  <p className="text-[16px] leading-6 font-medium text-textColor">
                    {el.degree}
                  </p>
                </div>
                <p className="text-[16px] leading-6 font-medium text-textColor">
                  {el.university}
                </p>
              </li>
            ))}
        </ul>
      </div>

      <div className="mt-12">
        <h3
          className="text-[20px] leading-[30px] text-headingColor 
        font-semibold   "
        >
          Experience
        </h3>
        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          {details.experiences &&
            details.experiences.map((el, index) => (
              <li key={index} className="p-4 rounded bg-[#fff9ea]">
                <span
                  className="text-yellowColor text-[15px] leading-6
            font-semibold"
                >
                  {formDate(`${el.startDate}`)} - {formDate(`${el.endDate}`)}
                </span>
                <p className="text-[16px] leading-6 font-medium text-textColor">
                  {el.position}
                </p>
                <p className="text-[16px] leading-6 font-semibold text-textColor">
                  {el.hospital}
                </p>
              </li>
            ))}
        </ul>
      </div>

      {/* carosl  */}
      {carosal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="max-w-[500px] h-[500px] w-full m-auto py-16 px-4 relative group">
            <AiOutlineCloseCircle
              onClick={() => setCarosal(false)}
              className=" text-[30px] absolute right-[20px] top-[70px] cursor-pointer "
            />
            <div
              style={{
                backgroundImage: `url(${doctorPath}${slides[currentIndex].certificate})`,
              }}
              className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
            ></div>
            {/* Left Arrow */}
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>
            {/* Right Arrow */}
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
            <div className="flex top-4 justify-center py-2">
              {slides.map((slide, slideIndex) => (
                <div
                  key={slideIndex}
                  onClick={() => goToSlide(slideIndex)}
                  className="text-2xl cursor-pointer"
                >
                  <RxDotFilled />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* carosl end  */}
    </div>
  );
}

export default DoctorAbout;
