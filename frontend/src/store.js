import { configureStore } from "@reduxjs/toolkit";
import patientAuthReducer from "../src/slices/patientAuthSlice";
import doctorAuthReducer from "../src/slices/doctorAuthSlice";
import adminAuthReducer from '../src/slices/adminAuthSlice'

export const store = configureStore({
  reducer: {
   patientAuthReducer,
   doctorAuthReducer,
   adminAuthReducer,
  },
});
