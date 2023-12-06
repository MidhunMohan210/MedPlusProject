import User from "../models/userSchema.js";
import Booking from "../models/bookingSchema.js";
import Doctor from "../models/doctorSchema.js";
import Admin from "../models/adminSchema.js";
import generateAdminToken from "../jwt/admin/adminJwt.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({email});
    console.log(admin);
    if (!admin) {
      return res.status(404).json({ message: "Invalid admin" });
    } else {
      const isPasswordMatch = admin.password === password;

      if (!isPasswordMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const { name } = admin._doc;

      const token = generateAdminToken(admin._id, res);
      console.log("token admin");
      return res.status(200).json({
        status: true,
        message: "Login Successful!!",
        token,
        data: { email, name,type:"admin" },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "Failed to login!" });
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
///////// getAllDoctor  ////////////

export const getAllDoctor = async (req, res) => {
  try {
    const allDoctor = await Doctor.find({}).select("-password");

    if (allDoctor) {
      res
        .status(200)
        .json({ status: true, message: " All doctors found", data: allDoctor });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "no doctors found" });
  }
};

///////// block user  ////////////

export const blockUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ status: false, message: "User Not found" });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();
    res.status(200).json({
      status: true,
      message: `user is ${user.isBlocked ? "blocked" : "unblocked"}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Internal server error!" });
  }
};

export const handleApprove = async (req, res) => {
  console.log("hoooiiiiiiii");
  const docId = req.params.id;
  try {
    const doctor = await Doctor.findById(docId);
    if (!doctor) {
      res.status(404).json({ status: false, message: "doctor Not found" });
    }

    doctor.isApproved = !doctor.isApproved;
    console.log(doctor.isApproved);
    // await doctor.save();
    const updateDoc = await Doctor.updateOne(
      { _id: docId },
      { $set: { isApproved: doctor.isApproved } }
    );
    console.log(updateDoc);
    res.status(200).json({
      status: true,
      message: `Doctor is ${doctor.isApproved ? "approved" : "rejected"}`,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error!" });
  }
};

////hanlde blockkkk ////////////

export const handleBlock = async (req, res) => {
  console.log("hooo");
  const docId = req.params.id;
  console.log(docId);

  try {
    const doctor = await Doctor.findById(docId);
    console.log("doctor", doctor);
    if (!doctor) {
      res.status(404).json({ status: false, message: "doctor Not found" });
    }

    doctor.isBlocked = !doctor.isBlocked;
    console.log("kukuhjkh", doctor.isBlocked);
    // await doctor.save();
    const updateDoc = await Doctor.updateOne(
      { _id: docId },
      { $set: { isBlocked: doctor.isBlocked } }
    );
    console.log(updateDoc);

    res.status(200).json({
      status: true,
      message: `Doctor is ${doctor.isBlocked ? "Blocked" : "unblocked"}`,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error!" });
  }
};

///get bookings  ///////

export const getBookings = async (req, res) => {
  try {
    //retrieve appointments from bokking database of a specific user
    const bookings = await Booking.find(
      {},
      { "patient.name": 1, indianDate: 1, "doctor.name": 1, slot: 1,"isCancelled":1 }
    );
    console.log("bookings", bookings);

    if (bookings.length === 0) {
      throw new Error(" Oops! You didn't have any bookings yet!");
    }
    res.status(200).json({
      success: true,
      message: "bookings are getting",
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

/////////   cancelBooking ///////////

export const cancelBooking = async (req, res) => {
  const bookingId = req.params.id;
  try {
    const cancel = await Booking.findByIdAndUpdate(
      bookingId,
      { $set: { isCancelled: true } },
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


//appro  videocall ////
export const approveVideoCall = async (req, res) => {
  const docId = req.params.id;
  const status=req.query.status;
  console.log("status",status);
  console.log("docId",docId);
  try {
    const changeStatus = await Doctor.findByIdAndUpdate(
      docId,
      { $set: { videoCallApprove: status } },
      { new: true }
    );

    if (!changeStatus) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ status: true, message: "Doctor status changed" });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Change status failed" });
  }
};


//approveCertificate ////
export const approveCertificate = async (req, res) => {
  const docId = req.params.id;
  const status=req.query.status;
  console.log("status",status);
  console.log("docId",docId);
  try {
    const changeStatus = await Doctor.findByIdAndUpdate(
      docId,
      { $set: { certificateApprove: status } },
      { new: true }
    );

    if (!changeStatus) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ status: true, message: "Doctor status changed" });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Change status failed" });
  }
};
