/* eslint-disable react/prop-types */
import { useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BASE_URL, docToken } from "../../config";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
function DoctorProfileSettings({ data, refetch }) {
  console.log(data);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);

  const [password, setPassword] = useState(data.password);

  const [phoneNumber, setPhoneNumber] = useState(data.number);

  const [bio, setBio] = useState(data.bio);

  const [gender, setGender] = useState(data.gender);

  const [specialization, setSpecialization] = useState(data.specialization);

  const [fee, setFee] = useState(data.fee);

  const [about, setAbout] = useState(data.about);
  const [photo, setPhoto] = useState(null);
  const [certificate, setCertificate] = useState(null);
  console.log(certificate);

  // qualification   /////////////////

  const [showQualificationFields, setShowQualificationFields] = useState("");

  const [qualifications, setQualifications] = useState([
    {
      startDate: "",
      endDate: "",
      degree: "",
      university: "",
    },
  ]);

  const toggleQualificationFields = () => {
    setShowQualificationFields(!showQualificationFields);
  };

  const addQualification = () => {
    setQualifications([
      ...qualifications,
      {
        startDate: "",
        endDate: "",
        degree: "",
        university: "",
      },
    ]);
  };

  const handleQualificationChange = (id, field, value) => {
    setQualifications((prevQualifications) => {
      const newQualifications = prevQualifications.map((qualification) => {
        if (qualification.id === id) {
          return {
            ...qualification,
            [field]: value,
          };
        }
        return qualification;
      });
      return newQualifications;
    });
  };

  const removeQualification = (index) => {
    const newQualifications = [...qualifications];
    newQualifications.splice(index, 1);
    setQualifications(newQualifications);
  };

  // Experience /////////////////

  const [showExperienceFields, setShowExperienceFields] = useState(false);
  const [experiences, setExperiences] = useState([
    {
      startDate: "",
      endDate: "",
      position: "",
      hospital: "",
    },
  ]);

  const toggleExperienceFields = () => {
    setShowExperienceFields(!showExperienceFields);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        startDate: "",
        endDate: "",
        position: "",
        hospital: "",
      },
    ]);
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperiences = [...experiences];
    newExperiences[index][field] = value;
    setExperiences(newExperiences);
  };

  const removeExperience = (index) => {
    const newExperiences = [...experiences];
    newExperiences.splice(index, 1);
    setExperiences(newExperiences);
  };

  const handlePhotoInputChange = (e) => {
    const pic = e.target.files[0];
    setPhoto(pic);
  };

  const handleCertificateInputChange = (e) => {
    const certificate = e.target.files;
    const filesArray = Array.from(certificate);
    setCertificate(filesArray);
    // setCertificate(certificate);
  };

  const submitHandler = async (e) => {


    e.preventDefault();
    let updatedQualifications;
    let updatedExperiences;

    if (Object.values(qualifications[0]).every((value) => value === "")) {
      updatedQualifications = data.qualifications;
    } else {
      updatedQualifications = [...data.qualifications, ...qualifications];
    }

    if (Object.values(experiences[0]).every((value) => value === "")) {
      updatedExperiences = data.experiences;
    } else {
      updatedExperiences = [...data.experiences, ...experiences];
    }

    const dataToUpdate = {
      name,
      email,
      password,
      phoneNumber,
      bio,
      gender,
      specialization,
      fee,
      about,
      qualifications: updatedQualifications,
      experiences: updatedExperiences,
      photo,
      certificate,
    };
    console.log(dataToUpdate);


  
  // Validation checks
  if (!name.trim() || /\d/.test(name)) {
    toast.error("Invalid name");
    return;
  }

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!emailRegex.test(email)) {
    toast.error("Invalid email");
    return;
  }

  if (!bio.trim() || bio.split(/\s+/).length > 50) {
    toast.error("Invalid bio");
    return;
  }

  if (!gender || !specialization || !fee) {
    toast.error("Gender, specialization, and fee are required");
    return;
  }
  // console.log(qualifications);

  // if (qualifications.length === 1 && Object.values(qualifications[0]).every((value) => value === "")) {
  //   toast.error("At least one qualification is required");
  //   return;
  // }

  // if (experiences.length === 1 && Object.values(experiences[0]).every((value) => value === "")) {
  //   toast.error("At least one experience is required");
  //   return;
  // }
  setLoading(true);


    try {
      const formDataToSend = new FormData();

      // Append all the fields from dataToUpdate except qualifications and experiences
      for (const key in dataToUpdate) {
        if (key !== "qualifications" && key !== "experiences" && key !== "certificate" ) {
          formDataToSend.append(key, dataToUpdate[key]);
        }
      }

      // Append qualifications and experiences separately
      if (dataToUpdate.qualifications) {
        for (let i = 0; i < dataToUpdate.qualifications.length; i++) {
          const qualification = dataToUpdate.qualifications[i];
          for (const key in qualification) {
            formDataToSend.append(
              `qualifications[${i}][${key}]`,
              qualification[key]
            );
          }
        }
      }

      if (dataToUpdate.experiences) {
        for (let i = 0; i < dataToUpdate.experiences.length; i++) {
          const experience = dataToUpdate.experiences[i];
          for (const key in experience) {
            formDataToSend.append(`experiences[${i}][${key}]`, experience[key]);
          }
        }
      }

      if (dataToUpdate.certificate) {
        for (let i = 0; i < dataToUpdate.certificate.length; i++) {
          formDataToSend.append(`certificate`, dataToUpdate.certificate[i]);
        }
      }
   



      const res = await fetch(`${BASE_URL}/doctors/updateDoctor/${data._id}`, {
        method: "put",
        headers: {
          Authorization: `Bearer ${docToken} `,
        },
        body: formDataToSend,
      });
      let result = await res.json();
      console.log("result", result.message);

      if (!res.ok) {
        throw new Error(result.message);
      }
      setTimeout(() => {
        setLoading(false);
        toast.success(result.message);
      }, 2000);
      refetch();
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        toast.error(error.message);
        setLoading(false);
      }, 1000);
    }
  };

  const deleteQualification = async (index) => {
    try {
      const res = await fetch(
        `${BASE_URL}/doctors/deleteQualification?index=${index}`,
        {
          method: "delete",
          headers: {
            Authorization: `Bearer ${docToken} `,
          },
        }
      );
      let result = await res.json();
      console.log("result", result);

      if (!res.ok) {
        throw new Error(result.message);
      }
      setTimeout(() => {
        setLoading(false);
        toast.success(result.message);
      }, 2000);
      refetch();
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        toast.error(error.message);
        setLoading(false);
      }, 1000);
    }
  };

  const deleteExperience = async (index) => {
    try {
      const res = await fetch(
        `${BASE_URL}/doctors/deleteExperience?index=${index}`,
        {
          method: "delete",
          headers: {
            Authorization: `Bearer ${docToken} `,
          },
        }
      );
      let result = await res.json();
      console.log("result", result);

      if (!res.ok) {
        throw new Error(result.message);
      }
      setTimeout(() => {
        setLoading(false);
        toast.success(result.message);
      }, 2000);
      refetch();
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        toast.error(error.message);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <form onSubmit={submitHandler} encType="multipart/form-data">
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          id="name"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Name
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="email"
          name="floatemailing_password"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor="floating_password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email
        </label>
      </div>
      <div className="relative hidden z-0 w-full mb-6 group">
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          id="password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor="floating_repeat_password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Password
        </label>
      </div>

      {/* number */}

      <div className="relative z-0 w-full mb-6 group">
        <input
          type="number"
          name="number"
          id="number"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor="floating_repeat_password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Phone Number
        </label>
      </div>

      {/* biooo */}

      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="bio"
          onChange={(e) => setBio(e.target.value)}
          value={bio}
          id="bio"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor="floating_repeat_password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Bio
        </label>
      </div>

      <div className="grid md:grid-cols-3 md:gap-6">
        {/* Gender Select */}
        <div className="relative z-0 w-full mb-6 group">
          <select
            name="gender"
            id="gender"
            onChange={(e) => setGender(e.target.value)}
            value={gender}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          >
            <option value="" disabled selected>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <label
            htmlFor="gender"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Gender
          </label>
        </div>

        {/* Specialization Select */}
        <div className="relative z-0 w-full mb-6 group">
          <select
            name="specialization"
            id="specialization"
            onChange={(e) => setSpecialization(e.target.value)}
            value={specialization}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          >
            <option value="" disabled selected>
              Select Specialization
            </option>
            <option value="Cardiologist">Pediatrics</option>
         
            <option value="Neurologist">Neurology</option>
         
            <option value="Pediatrician">Pediatrics</option>
            <option value="Psychiatrist">Dermatology</option>
          </select>
          <label
            htmlFor="specialization"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Specialization
          </label>
        </div>

        {/* Fee Input */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="number"
            name="fee"
            id="fee"
            onChange={(e) => setFee(e.target.value)}
            value={fee}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="fee"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Fee
          </label>
        </div>
      </div>

      <h1 className="mt-2 mb-4 font-bold m">Qualifications</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.qualifications.map((qualification, index) => (
          <div
            key={qualification.id} // Make sure each qualification has a unique ID
            className="relative p-4 mb-4 bg-blue-100 border border-blue-500 shadow-md rounded-2xl"
          >
            <button
              className="absolute text-red-500 top-2 right-2 hover:text-red-700"
              onClick={() => removeQualification(qualification.id)} // Use ID to remove qualification
            >
              <RiDeleteBin6Fill onClick={() => deleteQualification(index)} />
            </button>
            <p className="mb-2 text-lg font-semibold">
              {`Degree: ${qualification.degree}`}
            </p>
            <p className="mb-1 text-base">
              {`University: ${qualification.university}`}
            </p>
            <p className="text-sm text-gray-500">
              {`Start Date: ${qualification.startDate}`}
            </p>
            <p className="text-sm text-gray-500">
              {`End Date: ${qualification.endDate}`}
            </p>
          </div>
        ))}
      </div>

      <div>
        <button
          type="button"
          className="p-2 mb-8 text-white bg-gray-500 rounded-md cursor-pointer"
          onClick={toggleQualificationFields}
        >
          {showQualificationFields
            ? "Hide Qualifications"
            : "Add Qualification"}
        </button>
      </div>

      {showQualificationFields && (
        <div>
          {qualifications.map((qualification, index) => (
            <div key={index}>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="date"
                    name={`startDate${index}`}
                    id={`startDate${index}`}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={qualification.startDate}
                    onChange={(e) =>
                      handleQualificationChange(
                        qualification.id, // Use ID to identify the qualification
                        "startDate",
                        e.target.value
                      )
                    }
                  />
                  <label
                    htmlFor={`startDate${index}`}
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Start Date
                  </label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="date"
                    name={`endDate${index}`}
                    id={`endDate${index}`}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={qualification.endDate}
                    onChange={(e) =>
                      handleQualificationChange(
                        qualification.id, // Use ID to identify the qualification
                        "endDate",
                        e.target.value
                      )
                    }
                  />
                  <label
                    htmlFor={`endDate${index}`}
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    End Date
                  </label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name={`degree${index}`}
                    id={`degree${index}`}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={qualification.degree}
                    onChange={(e) =>
                      handleQualificationChange(
                        qualification.id, // Use ID to identify the qualification
                        "degree",
                        e.target.value
                      )
                    }
                  />
                  <label
                    htmlFor={`degree${index}`}
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Degree
                  </label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name={`university${index}`}
                    id={`university${index}`}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={qualification.university}
                    onChange={(e) =>
                      handleQualificationChange(
                        qualification.id, // Use ID to identify the qualification
                        "university",
                        e.target.value
                      )
                    }
                  />
                  <label
                    htmlFor={`university${index}`}
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    University
                  </label>
                </div>
              </div>

              <button
                type="button"
                title="Remove Qualification"
                className="p-1 mb-10 text-white bg-red-500 rounded-md"
                onClick={() => removeQualification(qualification.id)} // Use ID to remove qualification
              >
                <RiDeleteBin6Fill />
              </button>

              <button
                type="button"
                title="Add More Qualification"
                className="p-1 ml-4 text-white bg-green-600 rounded-md"
                onClick={addQualification}
              >
                <VscAdd />
              </button>
            </div>
          ))}
        </div>
      )}

      <h1 className="mt-2 mb-4 font-bold m">Experience</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.experiences.map((experiences, index) => (
          <div
            key={index}
            className="relative p-4 mb-4 bg-blue-100 border border-blue-500 shadow-md rounded-2xl"
          >
            <button className="absolute text-red-500 top-2 right-2 hover:text-red-700">
              <RiDeleteBin6Fill onClick={() => deleteExperience(index)} />
            </button>
            <p className="mb-2 text-lg font-semibold">
              {`Position: ${experiences.position}`}
            </p>
            <p className="mb-1 text-base">
              {`Hospital: ${experiences.hospital}`}
            </p>
            <p className="text-sm text-gray-500">
              {`Start Date: ${experiences.startDate}`}
            </p>
            <p className="text-sm text-gray-500">
              {`End Date: ${experiences.endDate}`}
            </p>
          </div>
        ))}
      </div>

      <div>
        <button
          type="button"
          className="p-2 mb-8 text-white bg-gray-500 rounded-md cursor-pointer"
          onClick={toggleExperienceFields}
        >
          {showExperienceFields ? "Hide Experiences" : "Add Experience"}
        </button>
      </div>

      {showExperienceFields && (
        <div>
          {experiences.map((experience, index) => (
            <div key={index}>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="date"
                    name={`expStartDate${index}`}
                    id={`expStartDate${index}`}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={experience.startDate}
                    onChange={(e) =>
                      handleExperienceChange(index, "startDate", e.target.value)
                    }
                  />
                  <label
                    htmlFor={`expStartDate${index}`}
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Start Date
                  </label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="date"
                    name={`expEndDate${index}`}
                    id={`expEndDate${index}`}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={experience.endDate}
                    onChange={(e) =>
                      handleExperienceChange(index, "endDate", e.target.value)
                    }
                  />
                  <label
                    htmlFor={`expEndDate${index}`}
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    End Date
                  </label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name={`position${index}`}
                    id={`position${index}`}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={experience.position}
                    onChange={(e) =>
                      handleExperienceChange(index, "position", e.target.value)
                    }
                  />
                  <label
                    htmlFor={`position${index}`}
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Position
                  </label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name={`hospital${index}`}
                    id={`hospital${index}`}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={experience.hospital}
                    onChange={(e) =>
                      handleExperienceChange(index, "hospital", e.target.value)
                    }
                  />
                  <label
                    htmlFor={`hospital${index}`}
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Hospital
                  </label>
                </div>
              </div>

              <button
                type="button"
                title="Remove Experience"
                className="p-1 mb-10 text-white bg-red-500 rounded-md"
                onClick={() => removeExperience(index)}
              >
                <RiDeleteBin6Fill />
              </button>

              <button
                type="button"
                title="Add More Experience"
                className="p-1 ml-4 text-white bg-green-600 rounded-md"
                onClick={addExperience}
              >
                <VscAdd />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-center gap-7">
        {/* /////////////////////photo upload///////////////////// */}

        <div className="flex flex-col items-center gap-3 mb-5 mt-7">
          {photo && (
            <figure className=" w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center ">
              <img
                src={URL.createObjectURL(photo)}
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
      {certificate?.map((certificate, index) => (
        <figure
          key={index}
          className="w-[60px] h-[60px]  border-2 border-solid border-primaryColor flex items-center justify-center"
        >
          <img
            src={URL.createObjectURL(certificate)}
            alt={`Certificate ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </figure>
      ))}

          <div className="relative w-[160px] h-[50px]  ">
            <input
              type="file"
              name="certificate"
              id="certificate"
              onChange={handleCertificateInputChange}
              accept=".jpg,.png"
              multiple
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

      <div className="mt-[30px] mb-4">
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
          About
        </h3>
        <textarea
          onChange={(e) => setAbout(e.target.value)}
          value={about}
          className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full
        px-4 py-3 rounded-md 
        "
          placeholder="write something about you"
        ></textarea>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {loading ? (
          <BeatLoader color="#ffffff" margin={3} size={8} />
        ) : (
          " Update"
        )}
      </button>
    </form>
  );
}

export default DoctorProfileSettings;
