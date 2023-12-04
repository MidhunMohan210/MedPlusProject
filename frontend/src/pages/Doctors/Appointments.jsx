/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import DoctorFetchData from "../../hooks/DoctorFetchData";
import { BASE_URL, docToken } from "../../config";
const path = "http://localhost:7000/userMedia/";
import Swal from "sweetalert2";

function Appointments() {
  const [openMlodal, setOpenModal] = useState(false);
  const [reason, setReason] = useState("");
  const [selectedBooking,setSelectedBooking]=useState('')

  useEffect(() => {
    document.body.style.overflow = openMlodal ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openMlodal]);

  const { error, loading, data, refetch } = DoctorFetchData(
    `${BASE_URL}/doctors/getMyAppointments`
  );
  const [Appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      setAppointments(data);
    }
  }, [Appointments, data, loading]);




  const deleteAppointment = async (id) => {
    console.log(id);
  
    

    try {
      const res = await fetch(`${BASE_URL}/doctors/cancelAppointment/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${docToken}`,
        },
        body: JSON.stringify({ reason }),
      });

      let result = res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }
      Swal.fire({
        title: "Done!",
        text: "Your cancelled the appointment.",
        icon: "success",
      });
      refetch();
      setOpenModal(false)
    } catch (error) {
      console.log("error", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while Cancelling .",
        icon: "error",
      });
      setOpenModal(false)

    }
    // } else if (confirmResult.isDenied) {
    //   const reason = confirmResult.value;
    //   console.log(reason);
    //   try {
    //     const res = await fetch(
    //       `${BASE_URL}/doctors/cancelAppointmentDeleteSlot/${id}`,
    //       {
    //         method: "put",
    //         headers: {
    //           "Content-Type": "application/json",

    //           Authorization: `Bearer ${docToken}`,
    //         },
    //         body: JSON.stringify({ reason }),
    //       }
    //     );

    //     let result = res.json();

    //     if (!res.ok) {
    //       throw new Error(result.message);
    //     }
    //     Swal.fire({
    //       title: "Done!",
    //       text: "Your cancelled the appointment.",
    //       icon: "success",
    //     });
    //     refetch();
    //   } catch (error) {
    //     console.log("error", error);
    //     Swal.fire({
    //       title: "Error!",
    //       text: "An error occurred while Cancelling .",
    //       icon: "error",
    //     });
    //   }
    // }
  };

  const deleteAppointmentWithOutSave = async (id) => {
    console.log(id);
  
    

    try {
      const res = await fetch(`${BASE_URL}/doctors/cancelAppointmentDeleteSlot/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${docToken}`,
        },
        body: JSON.stringify({ reason }),
      });

      let result = res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }
      Swal.fire({
        title: "Done!",
        text: "Your cancelled the appointment.",
        icon: "success",
      });
      refetch();
      setOpenModal(false)
    } catch (error) {
      console.log("error", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while Cancelling .",
        icon: "error",
      });
      setOpenModal(false)

    }
    // } else if (confirmResult.isDenied) {
    //   const reason = confirmResult.value;
    //   console.log(reason);
    //   try {
    //     const res = await fetch(
    //       `${BASE_URL}/doctors/cancelAppointmentDeleteSlot/${id}`,
    //       {
    //         method: "put",
    //         headers: {
    //           "Content-Type": "application/json",

    //           Authorization: `Bearer ${docToken}`,
    //         },
    //         body: JSON.stringify({ reason }),
    //       }
    //     );

    //     let result = res.json();

    //     if (!res.ok) {
    //       throw new Error(result.message);
    //     }
    //     Swal.fire({
    //       title: "Done!",
    //       text: "Your cancelled the appointment.",
    //       icon: "success",
    //     });
    //     refetch();
    //   } catch (error) {
    //     console.log("error", error);
    //     Swal.fire({
    //       title: "Error!",
    //       text: "An error occurred while Cancelling .",
    //       icon: "error",
    //     });
    //   }
    // }
  };





  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-6 mt-5">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white ">
          <div>
            <button
              id="dropdownActionButton"
              data-dropdown-toggle="dropdownAction"
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5  dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
            >
              <span className="sr-only">Action button</span>
              Action
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {/* <!-- Dropdown menu --> */}
            <div
              id="dropdownAction"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
            >
              <ul
                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownActionButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Reward
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Promote
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Activate account
                  </a>
                </li>
              </ul>
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Delete User
                </a>
              </div>
            </div>
          </div>
          <label for="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-2">
          <thead className="text-xs text-black uppercase bg-[#6a8fe6]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Appointments &&
              Appointments.map((el, index) => (
                <tr
                  key={index}
                  className="bg-white border-b  hover:bg-[#cecece] hover:text-black dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={`${path}${el.patient.photo}`}
                      alt="Jese image"
                    />
                    <div className="ps-3">
                      <div className="text-black font-semibold">
                        {el.patient.name}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{el.indianDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                      {el.slot}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {el.isCancelled ? (
                      <button
                        // onClick={() => cancelBooking(el._id)}
                        className="bg-orange-500 p-2 text-white rounded-md hover:scale-110 transition duration-100 ease-in-out cursor-pointer "
                      >
                        Cancelled
                      </button>
                    ) : (
                      <button
                        onClick={() => {setOpenModal(true);setSelectedBooking(el._id)}}
                        className="bg-red-500 p-2 text-white rounded-md hover:scale-110 transition duration-100 ease-in-out cursor-pointer "
                      >
                        Cancell
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* modall */}

      {openMlodal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="m-10 flex max-w-lg flex-col items-center rounded-md border px-8 py-10 text-gray-800 shadow-lg bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 rounded-xl bg-red-50 p-2 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>

            <p className="mt-4 text-center text-xl font-bold">
              Cancelling Appointment
            </p>

            {/* Input field for cancellation reason */}
            <div className="mt-4 w-full">
              <input
                type="text"
                onChange={(e) => setReason(e.target.value)}
                value={reason}
                id="cancellationReason"
                className="w-full border rounded-md px-3 py-2 mt-1"
                placeholder="Enter reason for cancellation"
              />
            </div>

            <div className="mt-8 flex flex-col justify-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
              <button
                onClick={() => deleteAppointment(selectedBooking)}
                className="whitespace-nowrap rounded-md bg-green-500 px-4 py-3 font-medium text-white"
              >
                Save slot
              </button>
              <button 
              onClick={()=>deleteAppointmentWithOutSave(selectedBooking)}
              className="whitespace-nowrap rounded-md bg-red-500 px-4 py-3 font-medium text-white">
                Delete slot
              </button>
              <button
                onClick={() => setOpenModal(false)}
                className="whitespace-nowrap rounded-md bg-gray-200 px-4 py-3 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Appointments;
