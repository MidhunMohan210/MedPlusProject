
import React, { useState } from "react";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";


function DoctorOtp() {
    const [loading,setLoading]=useState(false);

    const navigate=useNavigate()
    const [formData, setFormData] = useState({
      code1: "",
      code2: "",
      code3: "",
      code4: "",         
      code5: "",
      code6: "",
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
  
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    console.log("formDataOtp", formData);
    const storedDataString = localStorage.getItem("doctorSignUpData");
    const storedData = JSON.parse(storedDataString);
    console.log("storedData",storedData);
    const number = storedData.formData.number;
    let lastThree = number.slice(-3);
    console.log("number", number);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const combinedOtp = Object.values(formData).join("").toString()
      console.log(combinedOtp);
      const data={
  
        storedData:storedData,
       
        otp:combinedOtp
      }
      console.log("data",data);
      try {
        setLoading(true);
  
        const res = await fetch(`${BASE_URL}/auth/doctorVerifyOtp`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
          body: JSON.stringify(data),
        });
  
        let result=await res.json();
        console.log("resultOtp",result);
  
        if (!res.ok) {
          throw new Error(result.message);
        }

        localStorage.removeItem('doctorSignUpData')
  
        console.log("loading",loading);
        setTimeout(() => {
          toast.success(result.message);
          navigate("/doctors/login");
        }, 1000);
  
      } catch (error) {
        setLoading(false);
        setTimeout(() => {
          toast.error("invalid OTP");
        }, 1000);
      }
    };




    ///resend otp///
    const resendOtp = async (number) => {
      try {
        const res = await fetch(`${BASE_URL}/auth/resendOtp?number=${number}`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
        });
  
        let result = await res.json();
        console.log("resultOtp", result);
  
        if (!res.ok) {
          throw new Error(result.message);
        }
        toast.success(result.message);
      } catch (error) {
        toast.error(error.message);
      }
    };
  
    return (
      <div>
        {/* component */}
        <div className="relative flex flex-col justify-center overflow-hidden bg-gray-50 py-12 ">
          <div className="relative bg-white px-6 pt-8 pb-7 shadow-xl mx-auto w-full max-w-[30rem] rounded-2xl">
            <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div className="font-semibold text-3xl">
                  <p>OTP Verification</p>
                </div>
                <div className="flex flex-row text-sm font-medium text-gray-400">
                  <p>
                    We have sent a code to your number {` ****** ${lastThree}`}{" "}
                  </p>{" "}
                </div>
              </div>
  
              <div>
                <form>
                  <div className="flex flex-col space-y-16">
                    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs gap-2">
                      <div className="w-16 h-16 ">
                        <input
                          className="w-full h-full flex flex-col items-center justify-center text-center px-1 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          id=""
                          maxLength={1}
                          name="code1"
                          value={formData.code1}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="w-16 h-16 ">
                        <input
                          className="w-full h-full flex flex-col items-center justify-center text-center px-1 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          id=""
                          maxLength={1}
                          name="code2"
                          value={formData.code2}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="w-16 h-16 ">
                        <input
                          className="w-full h-full flex flex-col items-center justify-center text-center px-1 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          id=""
                          maxLength={1}
                          name="code3"
                          value={formData.code3}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="w-16 h-16 ">
                        <input
                          className="w-full h-full flex flex-col items-center justify-center text-center px-1 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          id=""
                          maxLength={1}
                          name="code4"
                          value={formData.code4}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="w-16 h-16 ">
                        <input
                          className="w-full h-full flex flex-col items-center justify-center text-center px-1 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          id=""
                          maxLength={1}
                          name="code5"
                          value={formData.code5}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="w-16 h-16 ">
                        <input
                          className="w-full h-full flex flex-col items-center justify-center text-center px-1 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          id=""
                          maxLength={1}
                          name="code6"
                          value={formData.code6}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
  
                    <div className="flex flex-col space-y-5">
                      <div>
                        <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                        onClick={handleSubmit}>
                          {loading ? 
               
                              <BeatLoader
                                color="#ffffff"
                                margin={3}
                                size={8}
                              /> :"Verify Account"}
                            
                          </button>
                       
                      </div>
  
                      <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                        <p> Didn't receive code?</p>{" "}
                        <div
                        onClick={() => resendOtp(number)}

                          className="flex flex-row items-center text-blue-600 cursor-pointer"
                          
                        >
                          Resend
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default DoctorOtp
