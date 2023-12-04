/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";

// eslint-disable-next-line react/prop-types
function ProfileSettings({ user, refetch }) {
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  console.log(validationError);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    gender: "male",
    bloodType: "",
    photo: null,
  });

  // console.log(formData);
  // const userId=user.id;
  // console.log("userId",userId);
  console.log("userrreee", user);
  const navigate = useNavigate();
  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    setFormData({
      name: user.name,
      email: user.email,
      gender: user.gender,
      bloodType: user.bloodType,
      photo: user.photo,
      number: user.number,
    });
  }, [user]);

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

  /////validation////
  const validateForm = () => {
    const { name, email, number, password, photo } = formData;

    // Validate name
    if (!/^[a-zA-Z\s]{1,25}$/.test(name)) {
      setValidationError(
        "Name must not contain any number and have a maximum of 25 characters"
      );
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
      setValidationError(
        "Phone number must be 10 digits without any characters or special characters"
      );
      return false;
    }

    // Validate password
    if (
      password &&
      !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
        password
      )
    ) {
      setValidationError(
        "Password must contain one uppercase letter, one lowercase letter, one number, and one special character, with a minimum length of 6"
      );
      return false;
    }

    // Validate photo
    if (
      photo &&
      photo.name &&
      !/\.(jpg|jpeg|png)$/.test(photo.name.toLowerCase())
    ) {
      setValidationError(
        "Invalid photo format. Please upload a JPG, JPEG, or PNG file"
      );
      return false;
    }
    if (!formData.name.trim() || !formData.email.trim() || !formData.gender.trim()  || !formData.bloodType.trim() ) {
      setValidationError("Name must be a non-empty string");
      return false;
    }
    // Validate other fields for presence

    setValidationError(""); // Reset validation error if all validations pass
    return true;
  };

  ////validationn

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      console.log("haii");
      toast.error(validationError);
      return; // Don't proceed with submission if validation fails
    }
    console.log("haii");

    setLoading(true);

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    console.log("formDataToSend", [...formDataToSend.entries()]);

    console.log("formData", formData);
    try {
      const res = await fetch(`${BASE_URL}/users/updateUser/${user._id}`, {
        method: "put",
        headers: {
          Authorization: `Bearer ${token} `,
        },
        // body: JSON.stringify({ data: formData })
        body: formDataToSend,
      });

      let result = await res.json();
      console.log("result", result.message);

      if (!res.ok) {
        throw new Error(result.message);
      }

      refetch();

      setLoading(false);
      toast.success(result.message);
    } catch (error) {
      console.log("error", error);

      setTimeout(() => {
        toast.error(error.message);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <section className="h-[250px]  flex flex-col mt-[-20] md:flex-row justify-start space-y-10 md:space-y-0 md:space-x-16  my-2 mx-5 md:mx-0 md:my-0 lg:mt-[-20px] mb-[6.5rem]">
      <div className="max-w-md md:w-[100%] flex flex-col items-start">
        <div className="my-5 items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"></div>

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
          placeholder=" Type your new password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <select
          className="w-full px-4 py-2 mt-4 text-sm border border-gray-300 rounded"
          name="bloodType"
          value={formData.bloodType}
          onChange={handleInputChange}
        >
          <option value="">Select Blood Type</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <div className="flex justify-between px-1 mt-4 text-sm ">
          <div>
            <label htmlFor="type">Gender : </label>
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
            {formData.photo && formData.photo instanceof File && (
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
                   placeholder: font-semibold rounded-lg truncate cursor-pointer flex justify-center "
              >
                Upload Photo
              </label>
            </div>
          </div>
        </div>
        {/* {validationError && (
           <p className="text-red-500 font-light mt-4 ">{validationError}</p>
        )} */}

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
              " Update"
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProfileSettings;
