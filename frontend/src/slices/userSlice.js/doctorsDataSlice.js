import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctorData: [],
  filteredDoctors: [],
  bookingData: [],
};

export const doctorDataSlice = createSlice({
  name: "doctorData",
  initialState,
  reducers: {
    setDoctorData: (state, action) => {
      state.doctorData = action.payload;
    },
    setFilteredDoctors: (state, action) => {
      state.filteredDoctors = action.payload;
    },
    setBookingData: (state, action) => {
      state.bookingData = action.payload;
    },
  },
});

export const { setDoctorData, setFilteredDoctors, setBookingData } =
  doctorDataSlice.actions;
export default doctorDataSlice.reducer;
