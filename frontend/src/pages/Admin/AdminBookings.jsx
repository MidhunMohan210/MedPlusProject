/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import AdminFetchData from "../../hooks/AdminFetchData";
import { BASE_URL, adminToken } from "../../config";

function Appointments() {
  const { error, loading, data, refetch } = AdminFetchData(
    `${BASE_URL}/admin/getBookings`
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

  const cancelBooking = async (id) => {
    console.log(id);
    try {
      const res = await fetch(`${BASE_URL}/admin/cancelBooking/${id}`, {
        method: "put",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      let result = res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }
      refetch();
    } catch (error) {
      console.log("error", error);
    }
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
                Doctor
              </th>
              <th scope="col" className="px-6 py-3">
                Patient
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
                    <div className="ps-3">
                      <div className="text-black font-semibold">
                        {el.doctor.name}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{el.patient.name}</td>
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
                        onClick={() => cancelBooking(el._id)}
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
    </div>
  );
}

export default Appointments;
