import { useEffect, useState } from "react";
import loginImg from "../assets/medplus/login.jpg";
// import googleImg from "../assets/medplus/google.png";
import { Link, useNavigate } from "react-router-dom";

import { BASE_URL } from "../config.js";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";
import { useDispatch } from "react-redux";
import { setPatientCredentials } from "../slices/patientAuthSlice.js";
import { setDoctorCredentials } from "../slices/doctorAuthSlice.js";

function DoctorLogin() {
  const navigate = useNavigate();
  const doctor=localStorage.getItem("doctorInfo")

  useEffect(()=>{
    if(doctor){
      navigate("/doctors/home")
    }

  })
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    type: "",
  });

  const [loading, setLoading] = useState(false);
  // const { dispatch } = useContext(authContext);

  // State variables for validation
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};

    // Validate email
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!formData.email.match(emailRegex)) {
      errors.email = "Invalid email address";
    } else {
      delete errors.email; // Clear the email error if it's valid
    }

    // Validate password
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!formData.password.match(passwordRegex)) {
      errors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 6 characters long.";
    } else {
      delete errors.password; // Clear the password error if it's valid
    }

    // Validate type
    if (!formData.type) {
      errors.type = "Please select your type (Doctor/Patient)";
    } else {
      delete errors.type; // Clear the type error if it's valid
    }

    setErrors(errors);
    setIsValid(Object.keys(errors).length === 0);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    validateForm();

    if (!isValid) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      let result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }
      console.log(result.data);

      console.log(formData.type);
      if (formData.type === "patient") {
        dispatch(setPatientCredentials(result.data));
      } else {
        dispatch(setDoctorCredentials(result.data));
      }

      setTimeout(() => {
        setLoading(false);
        toast.success(result.message);

        console.log(formData.type);
        if (formData.type === "doctor") {
          navigate("/doctors/home");
        } else {
          navigate("/users/home");
          // history.push("/users/home");
        }
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
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 lg:mt-[-60px] mb-[6.5rem]">
      <div className="max-w-sm md:w-1/3">
        <img src={loginImg} alt="Sample image" />
      </div>
      <div className="max-w-sm md:w-1/3">
        {/* <div className="flex items-center text-center md:text-left">
          <label className="mr-1">Sign in with</label>
          <button
            type="button"
            className="mx-1 h-7 w-7 rounded-full relative top-0 text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out transform hover:scale-110 active:scale-95"
          >
            <img src={googleImg} alt="" />
          </button>
        </div> */}
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 font-semibold text-center text-slate-500">
            User Login
          </p>
        </div>
        <form onSubmit={submitHandler}>
          <input
            className={`text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded ${
              errors.email ? "border-red-500" : ""
            }`}
            type="text"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && (
            <div className="text-sm text-red-500">{errors.email}</div>
          )}
          <input
            className={`text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4 ${
              errors.password ? "border-red-500" : ""
            }`}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
          {errors.password && (
            <div className="text-sm text-red-500">{errors.password}</div>
          )}
          <div className="flex justify-between mt-4 text-sm font-semibold">
            {/* <label className="flex cursor-pointer text-slate-500 hover:text-slate-600">
              <input className="mr-1" type="checkbox" />
              <span>Remember Me</span>
            </label> */}
            {/* <a
              className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
              href="#"
            >
              Forgot Password?
            </a> */}
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-4">
              <label className="mr-4 text-sm text-slate-500">I am a:</label>
              <label>
                <input
                  type="radio"
                  value="doctor"
                  name="type"
                  checked={formData.type === "doctor"}
                  onChange={handleInputChange}
                />
                Doctor
              </label>
              <label>
                <input
                  type="radio"
                  value="patient"
                  name="type"
                  checked={formData.type === "patient"}
                  onChange={handleInputChange}
                />
                Patient
              </label>
            </div>
            {errors.type && (
              <div className="text-sm text-red-500">{errors.type}</div>
            )}
          </div>
          <div className="text-center md:text-left">
            <button
              className="px-4 py-2 mt-4 text-xs tracking-wider text-white uppercase bg-blue-600 rounded hover:bg-blue-700"
              type="submit"
            >
              {loading ? (
                <BeatLoader color="#ffffff" margin={3} size={8} />
              ) : (
                "Login"
              )}
            </button>
          </div>
          <div className="mt-4 text-sm font-semibold text-center text-slate-500 md:text-left">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-red-600 hover:underline hover:underline-offset-4"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default DoctorLogin;
