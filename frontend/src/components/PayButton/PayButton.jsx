/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext } from "react";
import { BASE_URL, token } from "../../config";

function PayButton({ docDetails, date, slot }) {
  const user = JSON.parse(localStorage.getItem("PatientInfo"));

  const bookingData = {
    user: user,
    doctor: docDetails,
    date: date,
    slot: slot,
  };

  const handlePayment = async () => {
    try {
      const res = await fetch(`${BASE_URL}/users/makePayment`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Set the Content-Type header
        },
        body: JSON.stringify({
          // Convert the request body to a JSON string
          user: user,
          doctor: docDetails,
          date: date,
          slot: slot,
        }),
      });

      if (res.ok) {
        localStorage.setItem("bookingData", JSON.stringify(bookingData));

        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        }
      } else {
        console.error("Request failed with status", res.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => handlePayment()}
        className="w-full px-2 rounded-md btn"
      >
        Book Appointment
      </button>
    </div>
  );
}

export default PayButton;
