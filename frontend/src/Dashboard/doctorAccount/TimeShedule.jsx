import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BASE_URL, docToken } from "../../config";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";

function TimeShedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showGrid, setShowGrid] = useState(false);
  const [selectedGrid, setSelectedGrid] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(selectedGrid);

  const handleToogle = () => {
    setShowGrid(!showGrid);
  };

  const handleGridClick = (value) => {
    if (selectedGrid.includes(value)) {
      setSelectedGrid(selectedGrid.filter((item) => item !== value));
    } else {
      setSelectedGrid([...selectedGrid, value]);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);

    if (selectedGrid.length > 0) {
      // Ask for confirmation before changing the date
      const confirmChange = window.confirm(
        "You have unsaved changes. Are you sure you want to change the date without submitting?"
      );

      if (!confirmChange) {
        return;
      }
    }
    setSelectedGrid([]); // Clear selectedGrid
    setSelectedDate(date);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const newScheduleItem = {
      date: new Date(selectedDate),
      slots: selectedGrid,
    };
    try {
      const res = await fetch(`${BASE_URL}/doctors/addTimeSlots`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${docToken} `,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: newScheduleItem }),
      });

      let result = await res.json();
      console.log("result", result.message);

      if (!res.ok) {
        throw new Error(result.message);
      }

      setTimeout(() => {
        setLoading(false);
        setSelectedGrid([]);
        toast.success(result.message);
      }, 1000);
    } catch (error) {
      console.log("error", error);

      setTimeout(() => {
        toast.error(error.message);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="mt-4">
      <DatePicker
        className="border"
        placeholderText="Select Date"
        showIcon
        selected={selectedDate}
        dateFormat="dd/MM/yyyy"
        minDate={new Date()}
        // onChange={(date) => setSelectedDate(date)}
        filterDate={(date) => date.getDay() !== 0}
        isClearable
        onChange={handleDateChange}
      />
      <div>
        <button
          onClick={handleToogle}
          className="p-2 mt-6 rounded bg-[#4cc6c6] text-white hover:bg-[#660f56]"
        >
          Select Time Slots
        </button>
      </div>

      {showGrid && (
        <div>
          <div className="grid grid-cols-3 gap-4 mt-6 w-[450px] text-center text-white">
            {[
              "10 am to 11 am",
              "11 am to 12 am",
              "12 pm to 1 pm",
              "1 am to 2 pm",
              "2 am to 3 pm",
              "3 am to 4 pm",
              "4 am to 5 pm",
              "5 am to 6 pm",
              "6 am to 7 pm",
            ].map((value) => (
              <div
                key={value}
                onClick={() => handleGridClick(value)}
                className={`${
                  selectedGrid.includes(value)
                    ? "bg-[#f72585]   p-3 rounded-lg  hover:scale-105 transition duration-100 ease-in-out cursor-pointer  "
                    : " p-3 rounded-lg bg-violet-600 hover:bg-[#f72585] hover:scale-105 transition duration-100 ease-in-out cursor-pointer "
                }   `}
              >
                {value}{" "}
              </div>
            ))}
          </div>

          <div
            onClick={handleSubmit}
            className="bg-green-500 rounded-lg text-white mt-6 w-[100px] p-2 text-center hover:scale-105 transition duration-100 ease-in-out cursor-pointer "
          >
            {loading ? <BeatLoader color={'#ffff'} sizeUnit={"5px"}  /> : "Submit"}
          </div>
        </div>
      )}
    </div>
  );
}

export default TimeShedule;
