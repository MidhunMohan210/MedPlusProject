import React, { useState, createContext } from "react";
import signup from "../assets/medplus/signup.jpg";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";


function Signup() {
  const FormDataContext = createContext();
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState(""); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    gender: "male",
    type: "patient",
  });
  // console.log(formData);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


///// validation /////

const validateForm = () => {
  const { name, email, number, password } = formData;

  if (!name || !email || !number || !password) {
    setValidationError("All fields are required");
    return false;
  }

  // Validate name
  if (!/^[a-zA-Z\s]{1,25}$/.test(name)) {
    setValidationError("Name must not contain any number and have a maximum of 25 characters");
    return false;
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setValidationError("Invalid email address");
    return false;
  }

  // Validate phone number
  if (!/^\d{10}$/.test(number)) {
    setValidationError("Phone number must be 10 digits without any characters or special characters");
    return false;
  }

  // Validate password
  if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password)) {
    setValidationError("Password must contain one uppercase letter, one lowercase letter, one number, and one special character, with a minimum length of 6");
    return false;
  }

  setValidationError(""); // Reset validation error if all validations pass
  return true; // All validations passed
};




  const submitHandler = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    console.log("formData", formData);
    try {
      const res = await fetch(`${BASE_URL}/auth/sendOtp`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify({ data: formData }),
      });

      let result = await res.json();
      console.log("result", result.message);

      if (!res.ok) {
        throw new Error(result.message);
      }

      localStorage.setItem("signUpData", JSON.stringify(formData));

      setTimeout(() => {
        setLoading(false);
        toast.success(result.message);
        navigate("/otp");
      }, 2000);
    } catch (error) {
      console.log("error", error);

      setTimeout(() => {
        toast.error(error.message);
        setLoading(false);
      }, 1000);
    }
  };
  
  
  return (
    <section className="h-screen flex flex-col mt-5 md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 lg:mt-[-60px] mb-[6.5rem]">
      <div className="hidden max-w-sm md:w-1/3 md:block lg:block xl:block">
        <img src={signup} alt="Sample image" />
      </div>
      <div className="max-w-sm md:w-1/3 ">
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 font-semibold text-center text-slate-500">
            Create an<span className="text-blue-700"> Account </span>
          </p>
        </div>

        <input
          className="w-full px-4 py-2 text-sm border border-gray-300 border-solid rounded"
          type="text"
          placeholder="Full Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />

        <input
          className="w-full px-4 py-2 mt-4 text-sm border border-gray-300 border-solid rounded"
          type="email"
          placeholder="Email Address"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          className="w-full px-4 py-2 mt-4 text-sm border border-gray-300 border-solid rounded"
          type="number"
          placeholder="Mobile Number"
          name="number"
          value={formData.number}
          onChange={handleInputChange}
        />
        <input
          className="w-full px-4 py-2 mt-4 text-sm border border-gray-300 border-solid rounded"
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />

        <div className="flex justify-between px-1 mt-4 text-sm ">
          
          <div>
            <label htmlFor="type">Gender : </label>
            <select
              name="gender"
              id="type"
              value={formData.gender}
              onChange={handleInputChange}
              className="  py-1 px-2 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div className="text-center md:text-left ">
          <button
            //disabled={loading && true}
            onClick={submitHandler}
            className="w-full px-4 py-2 mt-4 text-xs tracking-wider text-white uppercase bg-blue-600 rounded hover:bg-blue-700"
            type="submit"
          >
            {loading ? (
              <BeatLoader color="#ffffff" margin={3} size={8} />
            ) : (
              " Signup"
            )}
          </button>
        </div>
        <div className="mt-4 text-sm font-semibold text-center text-slate-500 md:text-left">
          Already have an Account ?{" "}
          {/* <a
            className="text-red-600 hover:underline hover:underline-offset-4"
            href="#"
          >
            Login
          </a> */}
          <Link
            to="/users/login"
            className="text-red-600 hover:underline hover:underline-offset-4"
          >
            Login
          </Link>
        {validationError && 
        <p className="text-red-500 font-light mt-4 ">{validationError}</p>}

        </div>
      </div>
    </section>
  );
}

export default Signup;
