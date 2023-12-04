import User from "../models/userSchema.js";
import Doctor from "../models/doctorSchema.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import generatePatientToken from "../jwt/patient/patientJwt.js";
import generateDoctorToken from "../jwt/doctor/doctorJwt.js";
import { sendOtpTwlio, verifyCodeTwilio } from "./otpController.js";

export const sendOtp = async (req, res) => {
  try {
    const phoneNumber = req.body.data.number;
    const email = req.body.data.email;
    const type = req.body.data.type;
    let user = null;

    if (type === "patient") {
      user = await User.findOne({ email });
    } else if (type === "doctor") {
      user = await Doctor.findOne({ email });
    }

    // Checking if the user exists

    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const otp = await sendOtpTwlio(phoneNumber);

    res.status(200).json({ status: true, message: "otp send successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "error in sending otp" });
  }
};


///resend otp//
export const resendOtp = async (req, res) => {
  const phoneNumber=req.query.number
  console.log("phoneNumber",phoneNumber);
  try {

    const otp = await sendOtpTwlio(phoneNumber);

    res.status(200).json({ status: true, message: "otp send successfully" });
  } catch (error) {
    console.log(error);
     res.status(500).json({ status: false, message: "error in sending otp" });
  }
};








export const verifyOtp = async (req, res) => {
  try {
    console.log(req.body);
    const email = req.body.storedData.email;
    const number = req.body.storedData.number;
    const password = req.body.storedData.password;
    const name = req.body.storedData.name;
    const gender = req.body.storedData.gender;
    const type = req.body.storedData.type;
    const otp = req.body.otp;

    const verified = await verifyCodeTwilio(number, otp);
    if (verified) {
      // Hashing password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      if (type === "patient" || type === "doctor") {
        let user = new (type === "patient" ? User : Doctor)({
          name,
          email,
          number,
          password: hashedPassword,
          gender,
          type,
        });
        const userResult = await user.save();

        res.status(200).json({ message: "User Created Successfully" });
      }
    }

    // Handle the result of the verification and send an appropriate response
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error, Try again!" });
  }
};

export const login = async (req, res) => {
  let token;
  try {
    const { email, password, type } = req.body;
    console.log(type);

    const userModel = type === "patient" ? User : Doctor;

    const user = await userModel.findOne({ email: email });
    if (!user) {
      res.status(404).json({ message: "Invalid user" });
    } else {
      if (user.isBlocked) {
        res.status(401).json({ message: "User is blocked" });
      } else {
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        console.log(isPasswordMatch);
        if (!isPasswordMatch) {
          res.status(400).json({ message: "Invalid email or password" });
        } else {
          if (type === "doctor" && !user.isApproved) {
            res.status(401).json({ message: "Doctor approval pending" });
          } else {
            if (type === "patient") {
              token = generatePatientToken(user._id, res);
            } else if (type === "doctor") {
              console.log("user._id", user._id);

              token = generateDoctorToken(user._id, res);
            }
            // const token = generateToken(user);

            // console.log("tokennnmmmmm", token);
            // res.cookie("jwtPatient", token, { httpOnly: true, maxAge: maxAge * 1000 });
            const { password, appointments, ...rest } = user._doc;
            res.status(200).json({
              status: true,
              message: "Login Successful!!",
              token,
              data: { ...rest, token: token },
              type,
            });
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Failed to login!" });
  }
};
