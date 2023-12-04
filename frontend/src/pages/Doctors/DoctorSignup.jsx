import React, { useState, createContext } from "react";
import signup from "../../assets/medplus/doctorSignup.jpg";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";
import avatar from "../../assets/images/doctor-img01.png";

function DoctorSignup() {
  // const FormDataContext = createContext();
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    gender: "male",
    type: "doctor",
    degree: "",
    specialization: "",
    college: "",
    photo: null,
    certificate: null,
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoInputChange = (e) => {
    const pic = e.target.files[0];
    setFormData({
      ...formData,
      photo: pic,
    });
  };

  const handleCertificateInputChange = (e) => {
    const certificate = e.target.files[0];
    setFormData({
      ...formData,
      certificate: certificate,
    });
  };

  ///////////////////validation///////////////////////////

  const validateForm = () => {
    const { name, email, number, password, photo, certificate } = formData;

    // Validate name
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      setValidationError("Name must be filled not contain any number");
      return false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError("Invalid email address");
      return false;
    }

    if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password)) {
      setValidationError("Password must contain one uppercase letter, one lowercase letter, one number, and one special character, with a minimum length of 6");
      return false;
    }

    // Validate phone number
    if (!/^\d{10}$/.test(number)) {
      setValidationError(
        "Phone number must be filled and  10 digits without any characters or special characters"
      );
      return false;
    }

    // Validate other fields for presence
    for (const key in formData) {
      if (
        key !== "photo" &&
        key !== "certificate" &&
        (typeof formData[key] !== "string" || !formData[key].trim())
      ) {
        setValidationError(
          "All fields except photo and certificate are required"
        );
        return false;
      }
    }

    if (!photo || !certificate) {
      setValidationError("Both photo and certificate are required");
      return false;
    }

    // Validate photo and certificate extensions
    if (photo && !/\.(jpg|jpeg|png)$/.test(photo.name.toLowerCase())) {
      setValidationError(
        "Invalid photo file format. Supported formats: jpg, jpeg, png"
      );
      return false;
    }

    if (
      certificate &&
      !/\.(jpg|jpeg|png)$/.test(certificate.name.toLowerCase())
    ) {
      setValidationError(
        "Invalid certificate file format. Supported formats: jpg, jpeg, png"
      );
      return false;
    }

    setValidationError(""); // Reset validation error if all validations pass
    return true; // All validations passed
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error(validationError);
      return; // Don't proceed with submission if validation fails
    }

    setLoading(true);
    try {
      // Create a new FormData object
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      console.log("formDataToSend entries:", [...formDataToSend.entries()]);

      const res = await fetch(`${BASE_URL}/auth/doctorSendOtp`, {
        method: "post",
        body: formDataToSend,
      });

      let result = await res.json();
      console.log("result", result);

      if (!res.ok) {
        throw new Error(result.message);
      }
      const dataToSave = {
        formData: formData,
        photoPath: result.photoPath,
        certificatePath: result.certificatePath,
      };

      localStorage.setItem("doctorSignUpData", JSON.stringify(dataToSave));

      setTimeout(() => {
        setLoading(false);
        toast.success(result.message);
        navigate("/doctorOtp");
      }, 2000);
    } catch (error) {
      console.log("error", error.message);

      setTimeout(() => {
        toast.error(error.message);
        setLoading(false);
      }, 1000);
    }
  };
  return (
    <form encType="multipart/form-data" onSubmit={submitHandler}>
      <section className="h-screen flex flex-col lg:mt-[-10p5x]  md:flex-row justify-center  md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 mb-[6.5rem]">
        <div className="flex justify-center w-full gap-3 px-16 sm:flex-col lg:flex-row">
          <div className="w-1/3">
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

            {/* degree */}
            <input
              className="w-full px-4 py-2 mt-4 text-sm border border-gray-300 border-solid rounded"
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          {/* //////////////////////////////////////////////////////////////////// */}
          <div className="w-1/2 px-16 mt-12 ">
            <select
              className="w-full px-4 py-2 mt-4 text-sm border border-gray-300 border-solid rounded"
              name="degree" // Change the name to "degree" or the appropriate field name
              value={formData.degree}
              onChange={handleInputChange}
            >
              <option value="" disabled selected>
                Select Degree
              </option>
              <option value="MBBS">
                MBBS - Bachelor of Medicine, Bachelor of Surgery
              </option>
              <option value="MD">MD - Doctor of Medicine</option>
              <option value="DO">DO - Doctor of Osteopathic Medicine</option>
              <option value="MRCP">
                MRCP - Membership of the Royal College of Physicians
              </option>
              <option value="FRCP">
                FRCP - Fellow of the Royal College of Physicians
              </option>
            </select>

            {/* specialisation */}

            <select
              className="w-full px-4 py-2 mt-4 text-sm border border-gray-300 border-solid rounded"
              name="specialization" // Change the name to "specialization" or the appropriate field name
              value={formData.specialization}
              onChange={handleInputChange}
            >
              <option value="" disabled selected>
                Select Specialization
              </option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Ophthalmology">Ophthalmology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Neurology">Neurology</option>
              <option value="Psychiatry">Psychiatry</option>
              <option value="Pediatrics">Pediatrics</option>
            </select>

            {/* college */}
            <input
              className="w-full px-4 py-2 mt-4 text-sm border border-gray-300 border-solid rounded"
              type="text"
              placeholder="College of education"
              name="college"
              value={formData.college}
              onChange={handleInputChange}
            />

            <div className="flex justify-between px-1 mt-4 text-sm ">
              <div>
                <label for="type">Gender : </label>
                <select
                  name="gender"
                  id="type"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="px-2 py-1 leading-tight text-gray-500 focus:outline-none focus:shadow-outline"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-center gap-7">
              {/* /////////////////////photo upload///////////////////// */}

              <div className="flex flex-col items-center gap-3 mb-5 mt-7">
                {formData.photo && (
                  <figure className=" w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center ">
                    <img
                      src={URL.createObjectURL(formData.photo)}
                      alt=""
                      className="w-full rounded-full"
                    />
                  </figure>
                )}
                <div className="relative w-[160px] h-[50px]  ">
                  <input
                    type="file"
                    name="photo"
                    id="photo"
                    onChange={handlePhotoInputChange}
                    accept=".jpg,.png"
                    className="absolute top-0 left-0 h-full opacity-0 cursor-pointer"
                  />
                  <label
                    htmlFor="photo"
                    className="absolute top-0 left-0 w-full h-fullflex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor 
          font-semibold rounded-lg truncate cursor-pointer flex justify-center "
                  >
                    Upload Photo
                  </label>
                </div>
              </div>

              {/* /////////////////////ceritificate upload///////////////////// */}

              <div className="flex flex-col items-center gap-3 mb-5 mt-7">
                {formData.certificate && (
                  <figure className=" w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center ">
                    <img
                      src={URL.createObjectURL(formData.certificate)}
                      alt=""
                      className="w-full rounded-full"
                    />
                  </figure>
                )}
                <div className="relative w-[160px] h-[50px]  ">
                  <input
                    type="file"
                    name="certificate"
                    id="certificate"
                    onChange={handleCertificateInputChange}
                    accept=".jpg,.png"
                    className="absolute top-0 left-0 h-full opacity-0 cursor-pointer"
                  />
                  <label
                    htmlFor="certificate"
                    className="absolute top-0 left-0 w-full h-fullflex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor 
          font-semibold rounded-lg truncate cursor-pointer flex justify-center "
                  >
                    Upload Certificate
                  </label>
                </div>
              </div>
            </div>

            <div className="text-center md:text-left ">
              <button
                //disabled={loading && true}

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
            <div className="mt-4 text-sm font-semibold text-center text-slate-500 ">
              Already have an Account ?{" "}
              <Link
                to="/doctors/login"
                className="text-red-600 hover:underline hover:underline-offset-4"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
}

export default DoctorSignup;
