import { createSlice } from "@reduxjs/toolkit";

const initialState={
    bookingData:[]
}


export const bookingDataSlice = createSlice({
    name: "Booking Data",
    initialState,
    reducers: {
      setBookingData: (state, action) => {
        return {
          ...state,
          bookingData: action.payload,
        };
      },
    },
  });

console.log(initialState.bookingData);


export const {setBookingData}=bookingDataSlice.actions;
export default bookingDataSlice.reducer;
