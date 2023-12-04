import Doctor from "../models/doctorSchema.js";
import Booking from "../models/bookingSchema.js";
import { format, parse, parseISO } from "date-fns";

export const saveBookingData = async (req, res) => {
  // console.log("Bokking Data", req.body);

  const date = parseISO(req.body.appointmentDate);
  const IndianDate = format(date, "dd/MM/yyyy");
  const paymentId = req.body.paymentId;

  const bookingExist = await Booking.findOne({ paymentId: paymentId });

  try {
    if (bookingExist) {
      res.status(200).json({ data: bookingExist });
      return;
    }

    const {
      doctor: { details: doctorDetails },
      patient,
      fee,
      appointmentDate,
      slot,
      paymentStatus = "pending",
      isPaid = true,
      paymentId,
    } = req.body;

    const newBooking = new Booking({
      doctor: doctorDetails,
      patient,
      fee,
      appointmentDate,
      indianDate: appointmentDate, 
      slot,
      indianDate: IndianDate.toString(), 
      paymentStatus,
      isPaid,
      paymentId,
    });

    const savedBooking = await newBooking.save();

    const doctorId = req.body.doctor.details._id;
    let doctor = await Doctor.findOne({ _id: doctorId });
  
    const dateIndex = doctor.timeSlots.findIndex(
      (slot) => slot.indianDate === newBooking.indianDate
    );
    if (dateIndex !== -1) {
      const slotToDelete = newBooking.slot;

      const updateResult = await Doctor.updateOne(
        { _id: doctor._id, "timeSlots.indianDate": newBooking.indianDate },
        { $pull: { "timeSlots.$.slots": slotToDelete } }
      );

      const deleteObj = await Doctor.updateOne(
        { _id: doctor._id, "timeSlots.indianDate": newBooking.indianDate },
        {
          $pull: {
            timeSlots: {
              indianDate: newBooking.indianDate,
              slots: { $size: 0 }
            }
          }
        }
      )

      console.log(deleteObj);
      

    }



    res
      .status(200)
      .json({ message: "Booking saved Succesfully", data: savedBooking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const cancelBooking = async (req, res) => {
  console.log("haiii");
  const bookingId = req.params.id;
  try {
    const booking = await Booking.findById(bookingId);
    // console.log('our booking', booking);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const cancel = await Booking.findByIdAndUpdate(
      bookingId,
      { $set: { isCancelled: true } },
      { new: true }
    );

    const update=await Doctor.updateOne(
      {
        _id: booking.doctor._id, // Assuming doctor has its own _id
        'doctor.timeSlots.indianDate': booking.indianDate,
      },
      {
        $push: {
          'doctor.timeSlots.$.slots': booking.slot,
        },
      }
    );

    console.log("updateeee",update);


    res.status(200).json({ status: true, message: "Booking cancelled" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: false, message: "Booking cancellation failed" });
  }
};

