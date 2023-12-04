import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BASE_URL, token } from "../../config";
import PayButton from "../../components/PayButton/PayButton";

function SidePanel(details) {
  console.log(details);
  const [date, setDate] = useState(new Date());
  console.log(date);
  const [openDates, setOpenDates] = useState([]);
  const [slots, setSlots] = useState([]);
  const [showSlots, setShowSlots] = useState(false); // State to control the visibility of slots
  const [selectedTime, setselectedTime] = useState("");
  console.log(selectedTime);

  const getAvailableDates = async () => {
    const res = await fetch(
      `${BASE_URL}/users/getAvailableDates/${details.details._id}`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    let result = await res.json();
    setOpenDates(result.data);
  };

  // Function to convert backend date strings to Date objects
  const parseBackendDates = (dates) => {
    return dates.map((dateStr) => new Date(dateStr));
  };

  // Function to highlight specific dates
  const highlightDates = parseBackendDates(openDates);

  const searchSlots = async () => {
    const res = await fetch(
      `${BASE_URL}/users/getAvailableSlots?date=${date.toISOString()}&doctor=${
        details.details._id
      }`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    let result = await res.json();
    console.log(result);
    setShowSlots(true);
    setSlots(result.data);
  };

  const handleChange = (date) => {
    setDate(date);
    setShowSlots(false);
  };

  console.log(slots);
  console.log(showSlots);

  return (
    <div className="p-3 rounded-md shadow-panelShadow lg:p-5">
      <div className="flex items-center justify-between">
        <p className="mt-0 font-semibold text__para ">Consultation Fee</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          {details.details.fee}
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="mt-0 font-semibold text__para text-headingColor">
          Choose available Date
        </p>

        <div className="mt-6">
          <DatePicker
            className="border border-solid-black"
            placeholderText="select a date"
            showIcon
            selected={date}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            onChange={handleChange}
            filterDate={(date) => date.getDay() !== 0}
            isClearable
            onFocus={() => getAvailableDates()}
            highlightDates={highlightDates} // Pass the array of dates to highlight
          />
        </div>
        <button
          onClick={() => searchSlots()}
          className="mt-3 bg-teal-400 text-white rounded-md p-2 hover:scale-105 transition duration-100 ease-in-out cursor-pointer"
        >
          Search slots
        </button>
        {showSlots && slots?.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 mt-12 w-[300px] text-center text-white">
            {slots.map((slot, index) => (
              <div
                onClick={() => setselectedTime({ slot })}
                key={index}
                className={` ${
                  selectedTime.slot === slot
                    ? "bg-[#f72585] border-[1.5px] border-black p-3 rounded-lg hover-bg-[#f72585] hover:scale-105 transition duration-100 ease-in-out cursor-pointer relative"
                    : " p-3 rounded-lg bg-violet-500 hover-bg-[#f72585] hover:scale-105 transition duration-100 ease-in-out cursor-pointer relative"
                } `}
              >
                {slot}
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <PayButton docDetails={details} date={date} slot={selectedTime.slot} />
      {/* <button className="w-full px-2 rounded-md btn">Book Appointment</button> */}
    </div>
  );
}

export default SidePanel;
