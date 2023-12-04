import { createSlice  } from "@reduxjs/toolkit";



  const adminInfo = localStorage.getItem('adminInfo');
  const initialState = {
        adminInfo: adminInfo ? JSON.parse(adminInfo) : null,
  };

const adminAuthSlice = createSlice ({
    name:'adminAuth',
    initialState,
    reducers:{
        setaAminCredentials:(state,action)=>{
            state.adminInfo = action.payload;
            localStorage.setItem('adminInfo',JSON.stringify(action.payload))
        },
        logoutAdmin:(state,action)=>{
            state.adminInfo=null;
            localStorage.removeItem('adminInfo')
        }
    }
})


export const {setaAminCredentials,logoutAdmin} = adminAuthSlice.actions
export default adminAuthSlice.reducer