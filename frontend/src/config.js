export const BASE_URL='http://localhost:7000/api'
const userInLocal=JSON.parse(localStorage.getItem('PatientInfo'))
const doctorInLocal=JSON.parse(localStorage.getItem('doctorInfo'))
const adminInlocal =JSON.parse(localStorage.getItem('adminInfo'))
export const token= userInLocal?  userInLocal.token:null;
export const docToken=doctorInLocal?  doctorInLocal.token:null;
export const adminToken=adminInlocal?  adminInlocal.token:null;
console.log(adminToken);
export const type= userInLocal?  userInLocal.type:null;

export const userPath ='http://localhost:7000/userMedia/'
export const doctorPath ='http://localhost:7000/doctorMedia/'
