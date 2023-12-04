/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BASE_URL, docToken } from "../../config";
import getAvailableDates from "../../hooks/DoctorFetchData";
import { IoCloseCircle } from "react-icons/io5";
function TimeManagement() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [openDates, setOpenDates] = useState([]);
  const [availableSlots, setAvailableslots] = useState([]);
  

  const { data, loading, error } = getAvailableDates(
    `${BASE_URL}/doctors/getAvailableDates`
  );
  useEffect(() => {
    if (error) {
      console.log("Error in Doctor profile fetching data");
    } else if (data && !loading) {
      setOpenDates(data);
    }
  }, [error, data, loading, openDates]);

  // Example of backend dates in the specified format
  const backendDates = data;

  // Function to convert backend date strings to Date objects
  const parseBackendDates = (dates) => {
    return dates.map((dateStr) => new Date(dateStr));
  };

  // Function to highlight specific dates
  const highlightDates = parseBackendDates(backendDates);

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    console.log("date",date);

    const res = await fetch(
      `${BASE_URL}/doctors/getAvailableSlots/${date.toISOString()}`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${docToken} `,
        },
      }
    );
    let result = await res.json();
  
    console.log("result", result.data);
    setAvailableslots(result.data);
  };

  const reFetchData=()=>{
    console.log("herreee");
    handleDateChange(selectedDate)
  }

  const handleRemoveSlot = async (slot) => {
    try {
      const res = await fetch(
        `${BASE_URL}/doctors/removeSlots?selectedDate=${selectedDate.toISOString()}&slot=${slot}`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${docToken} `,
          },
        }
      );
      let result = await res.json();
      reFetchData();
      if (!res.ok) {
        throw new Error(result.message);
      }
      reFetchData();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <div className="mt-6">
        <DatePicker
          classNameName="border"
          placeholderText="Select Date"
          showIcon
          selected={selectedDate}
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          onChange={handleDateChange}
          filterDate={(date) => date.getDay() !== 0}
          isClearable
          highlightDates={highlightDates} // Pass the array of dates to highlight
        />
      </div>

      {availableSlots?.length > 0 ? (
        <div className="grid grid-cols-3 gap-4 mt-12 w-[450px] text-center text-white  ">
          {availableSlots.map((slot, index) => (
            <div
              key={index} // Use a unique key for each mapped element
              className="p-3 rounded-lg bg-violet-600 hover:bg-[#f72585] hover:scale-105 transition duration-100 ease-in-out cursor-pointer relative"
            >
              {slot}
              <button
                className="absolute top-[-8px] right-[-4px] text-black text-[25px]  "
                onClick={() => handleRemoveSlot(slot)}
              >
                <IoCloseCircle />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-12 flex ml-6">
          <h3>No slots opened yet!</h3>
        </div>
      )}
    </div>
  );
}

export default TimeManagement;
