import User from "../models/userSchema.js";
import Booking from "../models/bookingSchema.js";
import Doctor from "../models/doctorSchema.js";
import { format } from "date-fns";
import mongoose from "mongoose";

///////// getUserProfile  ////////////

export const getUserProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).select("-password");
    console.log(user);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    const { password, ...rest } = user._doc;

    return res.status(200).json({
      success: true,
      message: "profile info getting",
      data: { ...rest },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "something went wrong ,cannot get" });
  }
};

///////// getMyAppointments  ////////////

export const getMyAppointments = async (req, res) => {
  const userId = req.userId;

  try {
    //retrieve appointments from bokking database of a specific user
    const bookings = await Booking.find(
      { "patient._id": userId },
      {
        "doctor.name": 1,
        "doctor.specialization": 1,
        "doctor.photo": 1,
        indianDate: 1,
        slot: 1,
        isCancelled: 1,
        cancelReason:1,
      }
    ).sort({appointmentDate:1});

    if (bookings.length === 0) {
      throw new Error(" Oops! You didn't have any appointments yet!");
    }
    res.status(200).json({
      success: true,
      message: "Appointments are getting",
      data: bookings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
        ? error.message
        : "Something Went Wrong ,cannot get appointments",
    });
  }
};




////get appointment details
export const getAppointmentsDetails = async (req, res) => {
  const bookingId = req.params.id;
  console.log("bookingId",bookingId);

  try {
    //retrieve appointments from bokking database of a specific user
    const bookings = await Booking.findById(bookingId)
    

    if (!bookings) {
      throw new Error(" Oops! You didn't have any such appointments !");
    }
    res.status(200).json({
      success: true,
      message: "Appointments are getting",
      data: bookings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
        ? error.message
        : "Something Went Wrong ,cannot get appointments",
    });
  }
};


///////// updateUser  ////////////

export const updateUser = async (req, res) => {
  // console.log("updateUserrrrr");
  // console.log("filee",req.file);
  const id = req.userId;
  // console.log(req.body);
  const { name, email, number, type, gender, appoinments, bloodType } =
    req.body;

  const pic = req.file?.filename;
  const updateData = {
    name,
    email,
    number,
    type,
    gender,
    appoinments,
    bloodType,
    photo: pic,
  };
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );
    console.log("updateUser", updateUser);

    res.status(200).json({ status: true, message: "successfully updated" });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "failed to updated", data: updateUser });
  }
};

///////// deleteUser  ////////////

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteUser = await User.findByIdAndDelete(id);

    res.status(200).json({ status: true, message: "successfully deleted" });
  } catch (error) {
    res.status(500).json({ status: false, message: "failed to delete" });
  }
};

///////// getSingleUser  ////////////

export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password");

    res.status(200).json({ status: true, message: "user found", data: user });
  } catch (error) {
    res.status(500).json({ status: false, message: "no single user found" });
  }
};

///////// getAllUser  ////////////

export const getAllUser = async (req, res) => {
  try {
    console.log("one");
    const allUser = await User.find({}).select("-password");
    console.log("two");
    console.log(allUser);

    res
      .status(200)
      .json({ status: true, message: " All user found", data: allUser });
  } catch (error) {
    res.status(500).json({ status: false, message: "no user found" });
  }
};

////////////get avlailable slotes//////////////

export const getAvailableSlots = async (req, res) => {
  const date = req.query.date;
  const docId = req.query.doctor;
  const indianDate = format(new Date(date), "dd/MM/yyyy");

  try {
    const doctor = await Doctor.findById(docId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    const timeSlots = doctor.timeSlots.find(
      (slot) => slot.indianDate == indianDate
    );
    console.log("timeSlots", timeSlots);
    if (!timeSlots) {
      return res
        .status(404)
        .json({ message: "Time slot not found for the specified date" });
    }

    const slots = timeSlots.slots;
    console.log("slots", slots);
    return res.status(200).json({ message: "Time slotes Found", data: slots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAvailableDates = async (req, res) => {
  const docId = req.params.id;
  console.log(docId);
  try {
    const doctor = await Doctor.findById(docId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const dates = doctor.timeSlots.map((timeSlot) => timeSlot.uniDate);
    console.log(dates);
    res.status(200).json({ data: dates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

///cancel bokking //////

export const cancelBooking = async (req, res) => {
  const bookingId = req.params.id;
  let booking = await Booking.findById(bookingId);
  const doctor = await Doctor.findById(booking.doctor._id);
  console.log("doctor", doctor);
  // console.log("our booking", booking);

  try {
    const cancel = await Booking.findByIdAndUpdate(
      bookingId,
      { $set: { isCancelled: true } },
      { new: true }
    );

    console.log("ID", booking.doctor._id);
    console.log("IND", booking.indianDate);

    const resultUpdate = await Doctor.updateOne(
      { _id: booking.doctor._id, "timeSlots.indianDate": booking.indianDate },
      { $push: { "timeSlots.$.slots": booking.slot } }
    );

    if (!cancel) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ status: true, message: "Booking cancelled" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Booking cancellation failed" });
  }
};
