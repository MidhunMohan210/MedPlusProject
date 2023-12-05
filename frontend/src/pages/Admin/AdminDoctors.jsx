import { useState, useEffect } from "react";
import fetchDoctors from "../../hooks/useFetchData";
import { BASE_URL, adminToken } from "../../config";
// import CertificateModal from "../../components/modals/CertificateModal";
const path = "http://localhost:7000/doctorMedia/";
import Swal from "sweetalert2";
import { FcVideoCall } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Pagination from "../../components/pagination/Pagination";

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [certificate, setCertificate] = useState("");
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carosal, setCarosal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);

  const navigate = useNavigate();

  const modalHandler = (certificate) => {
    setCarosal(true);
    console.log(certificate);
    // Swal.fire({
    //   title: "Certificate",
    //   // text: "Modal with a custom image.",
    //   imageUrl: `${path}${certificate}`,
    //   imageWidth: 400,
    //   imageHeight: 300,
    //   imageAlt: "Custom image",
    // });

    const slides = certificate?.map((certificate) => ({
      certificate: certificate,
    }));
    setSlides(slides);
  };

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

  const handleApprove = async (docId) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
      cancelButtonText: "Cancel it",
    });

    if (confirmResult.isConfirmed) {
      try {
        const res = await fetch(`${BASE_URL}/admin/HandleApprove/${docId}`, {
          method: "put",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });

        let result = res.json();

        if (!res.ok) {
          throw new Error(result.message);
        }
        Swal.fire({
          title: "Done!",
          text: "Your changed the doctor status.",
          icon: "success",
        });
        refetch();
      } catch (error) {
        console.log("error", error);
        Swal.fire({
          title: "Error!",
          text: "An error occurred while changing the status .",
          icon: "error",
        });
      }
    }
  };

  ///handle blockkkk/////

  const handleBlock = async (docId) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
      cancelButtonText: "Cancel it",
    });

    if (confirmResult.isConfirmed) {
      try {
        const res = await fetch(`${BASE_URL}/admin/HandleBlock/${docId}`, {
          method: "put",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });

        let result = res.json();

        if (!res.ok) {
          throw new Error(result.message);
        }
        Swal.fire({
          title: "Done!",
          text: "Your changed the doctor status.",
          icon: "success",
        });
        refetch();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "An error occurred while changing the status .",
          icon: "error",
        });
        console.log("error", error);
      }
    }
  };

  const createRoom = async () => {
    const { value: roomId } = await Swal.fire({
      title: "Create a Room",
      text: "Enter a Room ID",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Create",
    });
    if (roomId) {
      navigate(`/admin/room/${roomId}`);
    }
  };

  const { data, error, loading, refetch } = fetchDoctors(
    `${BASE_URL}/admin/getAllDoctors`
  );

  useEffect(() => {
    if (error) {
      console.log(error);
    } else if (!error && !loading) {
      setDoctors(data);
    }
  }, [error, loading, data]);
  // console.log(doctors);

  ////  approve video call /////

  const approveVideoCall = async (docId, status) => {
    try {
      const res = await fetch(
        `${BASE_URL}/admin/approveVideoCall/${docId}?status=${status}`,
        {
          method: "post",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      let result = res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }
      Swal.fire({
        title: "Done!",
        text: "Your changed the doctor status.",
        icon: "success",
      });
      refetch();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while changing the status .",
        icon: "error",
      });
      console.log("error", error);
    }
  };

  //// approve certificate ///

  const approveCertificate = async (docId, status) => {
    try {
      const res = await fetch(
        `${BASE_URL}/admin/approveCertificate/${docId}?status=${status}`,
        {
          method: "post",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      let result = res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }
      Swal.fire({
        title: "Done!",
        text: "Your changed the doctor status.",
        icon: "success",
      });
      refetch();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while changing the status .",
        icon: "error",
      });
      console.log("error", error);
    }
  };


  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentDoctors = doctors.slice(firstPostIndex, lastPostIndex);

  return (
    <div>
      <section className="container">
        <div className="relative mx-5 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-[#9cedf8]">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Sl.No
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Specialization
                </th>
                <th scope="col" className="px-6 py-3">
                  video call
                </th>

                <th scope="col" className="px-6 py-3">
                  Certificate
                </th>
                <th scope="col" className="px-6 py-3">
                  Approve
                </th>
                <th scope="col" className="px-6 py-3">
                  Options
                </th>
              </tr>
            </thead>
            <tbody className="border-2">
              {currentDoctors.length > 0 ? (
                currentDoctors.map((doctor, index) => (
                  <tr
                    className="bg-white border-b hover:bg-gray-100 "
                    key={index}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">{doctor.name}</td>
                    <td className="px-6 py-4">{doctor.email}</td>
                    <td className="px-6 py-4">{doctor.specialization}</td>

                    <td className="pl-12 cursor-pointer text-[26px] py-4">
                      <FcVideoCall onClick={() => createRoom()} />
                      <div className=" flex  items-center mt-2 ">
                        <button
                          onClick={() => approveVideoCall(doctor._id, true)}
                          className={`bg-gray-500 p-1 rounded-lg text-[12px] text-white mr-2 hover:bg-green-500 ${
                            doctor.videoCallApprove ? "bg-green-500" : ""
                          }`}
                        >
                          Pass
                        </button>
                        <button
                          onClick={() => approveVideoCall(doctor._id, false)}
                          className={`bg-gray-500 p-1 rounded-lg text-[12px] text-white mr-2 hover:bg-red-500 ${
                            !doctor.videoCallApprove ? "bg-red-500" : ""
                          }`}
                        >
                          Fail
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        onClick={() => modalHandler(doctor.certificate)}
                        className="flex justify-center hover:text-blue-700 hover:font-medium cursor-pointer mb-2 font-semibold"
                      >
                        view
                      </a>
                      <button
                        onClick={() => approveCertificate(doctor._id, true)}
                        className={`bg-gray-500 p-1 rounded-lg text-[12px] text-white mr-2 hover:bg-green-500 ${
                          doctor.certificateApprove ? "bg-green-500" : ""
                        }`}
                      >
                        Pass
                      </button>
                      <button
                        onClick={() => approveCertificate(doctor._id, false)}
                        className={`bg-gray-500 p-1 rounded-lg text-[12px] text-white mr-2 hover:bg-red-500 ${
                          !doctor.certificateApprove ? "bg-red-500" : ""
                        }`}
                      >
                        Fail
                      </button>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleApprove(doctor._id)}
                        className={`px-4 py-2 font-semibold text-green-700 bg-green-100 border border-green-500 rounded-2xl hover:bg-green-500 hover:text-white hover:border-transparent ${
                          !(
                            doctor.videoCallApprove && doctor.certificateApprove
                          )
                            ? "disabled:opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={
                          !(
                            doctor.videoCallApprove && doctor.certificateApprove
                          )
                        }
                      >
                        {doctor.isApproved ? "Reject" : "Approve"}
                      </button>
                    </td>

                    {doctor.isBlocked ? (
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleBlock(doctor._id)}
                          className={`px-4 py-2 font-semibold text-yellow-700 bg-yellow-100 border border-yellow-500 rounded
                         hover:bg-yellow-500 hover:text-white hover:border-transparent ${
                           doctor.isApproved
                             ? ""
                             : "opacity-50 cursor-not-allowed pointer-events-none"
                         } `}
                        >
                          Unblock
                        </button>
                      </td>
                    ) : (
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleBlock(doctor._id)}
                          className={`px-4 py-2 font-semibold text-red-700 bg-red-100 border border-red-500 rounded hover:bg-red-500
                         hover:text-white hover:border-transparent ${
                           doctor.isApproved
                             ? ""
                             : "opacity-50 cursor-not-allowed pointer-events-none"
                         }`}
                        >
                          Block
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr className="bg-white border-b hover:bg-gray-200">
                  <td
                    colSpan={8}
                    className="px-6 py-4 font-medium text-center text-gray-900"
                  >
                    No Doctors Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      {openModal && (
        <div className=" w-[400px] h-[350px] p-4 fixed inset-0 mx-auto my-auto    bg-gray-300 drop-shadow-2xl ">
          <div>
            <img src={`${path}${certificate}`} alt="" />
          </div>
          <div>
            <button
              onClick={() => setOpenModal(false)}
              className="bg-red-500 p-2 rounded-md mt-2 text-white "
            >
              Close
            </button>
          </div>
        </div>
      )}

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
                backgroundImage: `url(${path}${slides[currentIndex].certificate})`,
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


      <div className="mt-20">
        <Pagination
          postPerPage={postPerPage}
          totalPosts={doctors.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default AdminDoctors;
