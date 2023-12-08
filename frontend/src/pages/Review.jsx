import { useEffect, useState } from "react";
import FeedbackForm from "./Doctors/FeedbackForm";
import { BASE_URL, token } from "../config";
import { useParams } from "react-router-dom";
// const path = "http://localhost:7000/doctorMedia/";
import { doctorPath } from "../config";

function Review() {
  const [data, setData] = useState({});
  const [doctor, setDoctor] = useState({});

  let { id } = useParams();

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/users/getAppointmentsDetails/${id}`,
          {
            method: "get",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        let result = await res.json();
        console.log(result);
        setData(result.data);
        setDoctor(result.data.doctor);

        if (!res.ok) {
          throw new Error(result.message);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchBookingData();
  }, []);

  console.log(data);
  console.log(doctor);

  return (
    <div className="grid grid-cols-3 p-7 ">
      <div>
        <div className="m-10 max-w-sm">
          <div className="rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg">
            <div className="relative mx-auto w-36 rounded-full">
              <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
              <img
                className="mx-auto h-full w-full rounded-full object-cover"
                src={`${doctorPath}${doctor.photo}`}
                alt=""
              />
            </div>

            <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">
              {doctor.name}
            </h1>
            <h3 className="font-lg text-semibold text-center leading-6 text-gray-600">
              {doctor.specialization}
            </h3>

            <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
              <li className="flex items-center py-3 text-sm">
                <span>Status</span>
                <span className="ml-auto">
                  <span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">
                    Paid ₹{doctor.fee}
                  </span>
                </span>
              </li>
              <li className="flex items-center py-3 text-sm">
                <span>Date</span>
                <span className="ml-auto"> {data.indianDate}</span>
              </li>
              <li className="flex items-center py-3 text-sm">
                <span>Time</span>
                <span className="ml-auto">
                  {doctor.indianDate} at {data.slot}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="col-span-2 mt-10">
        <FeedbackForm details={doctor} />
      </div>
    </div>
  );
}

export default Review;
