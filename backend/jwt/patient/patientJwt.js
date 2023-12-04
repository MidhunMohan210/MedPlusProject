import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generatePatientToken = (userId, res) => {
  console.log(userId);
  const token = jwt.sign({ userId }, process.env.PATIENT_JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  res.cookie("jwtPatient", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token
};

export default generatePatientToken;
