import { createSlice  } from "@reduxjs/toolkit";



  const doctorInfo = localStorage.getItem('doctorInfo');
  const initialState = {
    doctorInfo: doctorInfo ? JSON.parse(doctorInfo) : null,
  };

const doctorAuthSlice = createSlice ({
    name:'doctorAuth',
    initialState,
    reducers:{
        setDoctorCredentials:(state,action)=>{
            state.doctorInfo = action.payload;
            localStorage.setItem('doctorInfo',JSON.stringify(action.payload))
        },
        logoutDoctor:(state,action)=>{
            state.doctorInfo=null;
            localStorage.removeItem('doctorInfo')
        }
    }
})


export const {setDoctorCredentials,logoutDoctor} = doctorAuthSlice.actions
export default doctorAuthSlice.reducer