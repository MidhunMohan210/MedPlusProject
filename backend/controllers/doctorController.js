import Booking from "../models/bookingSchema.js";
import Doctor from "../models/doctorSchema.js";
import { format } from "date-fns";
import mongoose from "mongoose";

///////// getUserProfile  ////////////

export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId;

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    const { ...rest } = doctor._doc;

    const appointments = await Booking.find({ doctor: doctorId });

    return res.status(200).json({
      success: true,
      message: "Profile info retrieved successfully",
      data: { ...rest, appointments },
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Could not get the profile.",
    });
  }
};

///////// getMyAppointments  ////////////

export const getMyAppointments = async (req, res) => {
  const doctorId = req.userId;

  try {
    //retrieve appointments from bokking database of a specific user
    const bookings = await Booking.find(
      { "doctor._id": doctorId },
      {
        "patient.name": 1,
        indianDate: 1,
        "patient.photo": 1,
        slot: 1,
        isCancelled: 1,
      }
    ).sort({ appointmentDate: -1 });

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

///////// updatedoctor  ////////////

export const updateDoctor = async (req, res) => {
  console.log("req.files", req.files);
  const id = req.params.id;
  // console.log("bodyy", req.body);
  const password = req.body.password;
  // console.log("password", password);
  const photo = req.files?.photo?.[0].filename;
  let certificate = [];
  const certificateFiles = req.files?.certificate;

  if (certificateFiles?.length > 0) {
    for (let i = 0; i < certificateFiles.length; i++) {
      certificate.push(certificateFiles[i].filename);
    }
  } else {
    // If no new certificate files, keep the existing ones
    const existingDoctor = await Doctor.findById(id);
    certificate = existingDoctor.certificate;
  }

  const updateData = { ...req.body, photo, certificate };

  try {
    const updateDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    res.status(200).json({ status: true, message: "successfully updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "failed to updated" });
  }
};

///////// deletedoctor  ////////////

export const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedoctor = await Doctor.findByIdAndDelete(id);

    res.status(200).json({ status: true, message: "successfully deleted" });
  } catch (error) {
    res.status(500).json({ status: false, message: "failed to delete" });
  }
};

///////// getSingledoctor  ////////////

export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id).select("-password");

    res
      .status(200)
      .json({ status: true, message: "doctor found", data: doctor });
  } catch (error) {
    res.status(500).json({ status: false, message: "no single doctor found" });
  }
};

///////// getAlldoctor  ////////////

export const getAllDoctor = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;
    if (query) {
      doctors = await Doctor.find({
        isApproved: "true",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({}).select("-password");
    }

    res
      .status(200)
      .json({ status: true, message: " All doctor found", data: doctors });
  } catch (error) {
    res.status(500).json({ status: false, message: "no doctor found" });
  }
};

////adding time slotes ////////

export const addTimeSlots = async (req, res) => {
  const docId = req.userId;

  try {
    const doctor = await Doctor.findOne({ _id: docId });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const { date, slots } = req.body.data;
    const IndianDate = format(new Date(date), "dd/MM/yyyy");

    const timeSchedule = {
      uniDate: date,
      indianDate: IndianDate,
      slots: slots,
    };

    console.log("timeSchedule", timeSchedule);

    const existingSlotIndex = doctor.timeSlots.findIndex((slot) => {
      return slot.indianDate === timeSchedule.indianDate;
    });
    console.log(existingSlotIndex);

    if (existingSlotIndex !== -1) {
      console.log("exist");
      console.log(doctor.timeSlots[existingSlotIndex].slots);
      slots.forEach((slot) => {
        doctor.timeSlots[existingSlotIndex].slots.push(slot);
      });
    } else {
      // If no matching date is found, handle it accordingly
      if (doctor.timeSlots) {
        doctor.timeSlots.push(timeSchedule);
      } else {
        doctor.timeSlots = [timeSchedule];
      }
    }

    await doctor.save();

    return res.status(200).json({ message: "Time slots added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error adding time slots", error });
  }
};

///////getAvailableDates//////////////

export const getAvailableDates = async (req, res) => {
  const docId = req.userId;

  try {
    const doctor = await Doctor.findById(docId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const dates = doctor.timeSlots.map((timeSlot) => timeSlot.uniDate);
    // console.log(dates);
    res.status(200).json({ data: dates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/////////getAvailable  slots//////////////

export const getAvailableSlots = async (req, res) => {
  const docId = req.userId;
  const date = req.params.date;
  console.log(date);
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

////////remove slotssss/////////

export const removeSlots = async (req, res) => {
  const docId = req.userId;
  const date = req.query.selectedDate;
  const indianDate = format(new Date(date), "dd/MM/yyyy");
  const slot = req.query.slot;

  try {
    const doctor = await Doctor.findById(docId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const filter = {
      _id: docId,
      "timeSlots.indianDate": indianDate,
    };

    const update = {
      $pull: {
        "timeSlots.$.slots": slot,
      },
    };

    const result = await Doctor.updateOne(filter, update);
    await Doctor.updateOne(
      { _id: docId },
      { $pull: { timeSlots: { slots: [] } } }
    );

    if (result.nModified === 1) {
      console.log("result", result);

      return res.status(200).json({ message: "Slot removed successfully" });
    } else {
      return res.status(404).json({ message: "Slot not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error removing slot", error });
  }
};

//////   deleteQualification    ////////////

export const deleteQualification = async (req, res) => {
  const docId = req.userId;
  console.log(docId);
  const indexToDelete = req.query.index;
  console.log("I", indexToDelete);

  try {
    // First, unset the element at the specified index
    await Doctor.updateOne(
      { _id: docId },
      {
        $unset: { ["qualifications." + indexToDelete]: 1 },
      }
    );

    // Then, remove any null values from the qualifications array
    const resultt = await Doctor.updateOne(
      { _id: docId },
      {
        $pull: { qualifications: null },
      }
    );

    console.log("resultt", resultt);

    res.status(200).json({ message: "Qualification deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the qualification" });
  }
};

//////   deleteExperience    ////////////

export const deleteExperience = async (req, res) => {
  const docId = req.userId;
  console.log(docId);
  const indexToDelete = req.query.index;
  console.log("I", indexToDelete);

  try {
    // First, unset the element at the specified index
    await Doctor.updateOne(
      { _id: docId },
      {
        $unset: { ["experiences." + indexToDelete]: 1 },
      }
    );

    // Then, remove any null values from the qualifications array
    const resultt = await Doctor.updateOne(
      { _id: docId },
      {
        $pull: { experiences: null },
      }
    );

    console.log("resultt", resultt);

    res.status(200).json({ message: "experiences deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the experiences" });
  }
};

////// cancel appointment /////////

export const cancelAppointment = async (req, res) => {
  const bookingId = req.params.id;
  const reason = req.body.reason;
  let booking = await Booking.findById(bookingId);
  const doctor = await Doctor.findById(booking.doctor._id);

  try {
    const cancel = await Booking.findByIdAndUpdate(
      bookingId,
      { $set: { isCancelled: true, cancelReason: reason } },
      { new: true }
    );

    const resultUpdate = await Doctor.updateOne(
      { _id: booking.doctor._id, "timeSlots.indianDate": booking.indianDate },
      { $push: { "timeSlots.$.slots": booking.slot } }
    );

    console.log("resultUpdate", resultUpdate);

    if (resultUpdate.matchedCount === 0) {
      const newTimeSlot = {
        uniDate: booking.appointmentDate,
        indianDate: booking.indianDate,
        slots: [booking.slot],
      };
      await Doctor.findByIdAndUpdate(
        booking.doctor._id,

        { $push: { timeSlots: newTimeSlot } },
        { new: true }
      );
    }

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

////// cancel appointment with out deleting slot /////////

export const cancelAppointmentDeleteSlot = async (req, res) => {
  const bookingId = req.params.id;
  const reason = req.body.reason;
  let booking = await Booking.findById(bookingId);
  const doctor = await Doctor.findById(booking.doctor._id);

  try {
    const cancel = await Booking.findByIdAndUpdate(
      bookingId,
      { $set: { isCancelled: true, cancelReason: reason } },
      { new: true }
    );

    if (!cancel) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ status: true, message: "Booking cancelled" });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Booking cancellation failed" });
  }
};
