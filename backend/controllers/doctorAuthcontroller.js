import Doctor from "../models/doctorSchema.js";
import { sendOtpTwlio, verifyCodeTwilio } from "./otpController.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const doctorSendOtp = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);
    const phoneNumber = req.body.number;
    const email = req.body.email;
    const photoPath = req.files?.photo[0].filename;
    const certificatePath = req.files?.certificate[0].filename;
    console.log(photoPath);
    console.log(certificatePath);

    let user = null;

    user = await Doctor.findOne({ email });

    // Checking if the user exists

    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const otp = await sendOtpTwlio(phoneNumber);

    res.status(200).json({
      status: true,
      message: "otp send successfully",
      photoPath: photoPath,
      certificatePath: certificatePath,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "error in sending otp" });
  }
};

export const doctorVerifyOtp = async (req, res) => {
  try {
    console.log(req.body);
    const email = req.body.storedData.formData.email;
    const number = req.body.storedData.formData.number;
    const password = req.body.storedData.formData.password;
    const name = req.body.storedData.formData.name;
    const degree = req.body.storedData.formData.degree;
    const gender = req.body.storedData.formData.gender;
    const specialization = req.body.storedData.formData.specialization;
    const type = req.body.storedData.formData.type;
    const college = req.body.storedData.formData.college;
    const photo=req.body.storedData.photoPath;
    const certificate=req.body.storedData.certificatePath;

    const otp = req.body.otp;
    console.log("number",number);

    const verified = await verifyCodeTwilio(number, otp);
    if (verified) {
   /// Hashing password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);


        let user = new Doctor({
          name,
          email,
          number,
          password: hashedPassword,
          gender,
          type,
          photo,
          certificate,
          degree,
          specialization,
          college

        });
        const userResult = await user.save();

        res.status(200).json({ message: "User Created Successfully" });
      }
   }

    // Handle the result of the verification and send an appropriate response
   catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error, Try again!" });
  }
};
