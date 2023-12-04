import PaymentSuccessImg from "../../assets/medplus/paymentDone.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL, token } from "../../config";

function PaymentSuccess() {
  // const [patient, setPatient] = useState("");
  // const [doctor, setDoctor] = useState("");
  // const [appointmentDate, setAppointmentDate] = useState("");
  // const [slot, setSlot] = useState("");
  // const [paymentStatus, setPaymentStatus] = useState("");
  // const [paymentId, setPaymentId] = useState("");
  // const [fee, setFee] = useState(0);
  // console.log(patient);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    // console.log(sessionId);

    const sendPaymentData = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/users/session-status?session_id=${sessionId}`,
          {
            method: "get",
            headers: {
              Authorization: `Bearer ${token} `,
            },
          }
        );

        let paymentResult = await res.json();
        if (!res.ok) {
          throw new Error(paymentResult.message);
        }

        const bookingData = await JSON.parse(
          localStorage.getItem("bookingData")
        );

        const dataToSave = {
          doctor: bookingData.doctor,
          patient: bookingData.user,
          fee: bookingData.doctor.details.fee,
          paymentStatus: paymentResult.status,
          appointmentDate: bookingData.date,
          slot: bookingData.slot,
          paymentId: paymentResult.paymentId,
        };

        const BookingRes = await fetch(`${BASE_URL}/users/saveBookingData`, {
          method: "post",
          headers: {
            Authorization: `Bearer ${token} `,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSave),
        });

        let bookingResult = await BookingRes.json();
        if (!res.ok) {
          throw new Error(bookingResult.message);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    sendPaymentData();
  }, []);


  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex  justify-center w-[300px]">
        <img src={PaymentSuccessImg} alt="" />
      </div>
      <div>
        <h3 className="text-headingColor font-semibold mt-4">
          Your payment is{" "}
          <span className="text-green-600 font-semibold">successful !</span>
        </h3>
      </div>
      <p className="text-[14px] font-medium mt-3">Have a nice day.</p>
      <button
        onClick={() => navigate("/users/home")}
        className="p-2 hover:scale-105 transition duration-100 ease-in-out cursor-pointer bg-blue-500 rounded-md text-white mt-4"
      >
        Back to Home
      </button>

      <p className="text__para relative bottom-">
        Your health and well-being are our foremost concerns.
      </p>
    </div>
  );
}

export default PaymentSuccess;
