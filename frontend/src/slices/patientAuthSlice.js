import { createSlice  } from "@reduxjs/toolkit";



  const PatientInfo = localStorage.getItem('PatientInfo');
  const initialState = {
        PatientInfo: PatientInfo ? JSON.parse(PatientInfo) : null,
  };

const patientAuthSlice = createSlice ({
    name:'patientAuth',
    initialState,
    reducers:{
        setPatientCredentials:(state,action)=>{
            state.PatientInfo = action.payload;
            localStorage.setItem('PatientInfo',JSON.stringify(action.payload))
        },
        logoutPatient:(state,action)=>{
            state.PatientInfo=null;
            localStorage.removeItem('PatientInfo')
        }
    }
})


export const {setPatientCredentials,logoutPatient} = patientAuthSlice.actions
export default patientAuthSlice.reducer