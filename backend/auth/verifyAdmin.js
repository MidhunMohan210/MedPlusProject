import jwt from "jsonwebtoken";
import Doctor from "../models/doctorSchema.js";
import User from "../models/userSchema.js";
import Admin from "../models/adminSchema.js";

export const authenticateAdmin = async (req, res, next) => {
  //get token from headers

  const authToken = req.headers.authorization;
  // console.log("token",authToken);
  // console.log(authToken);

  //check token is exist

  if (!authToken || !authToken.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ success: false, message: "No token,authorisation denied" });
  }

  try {
    const token = authToken.split(" ")[1];
    // console.log("token",token);

    //verify token
    const decode = jwt.verify(token, process.env.ADMIN_JWT_SECRET_KEY);
    // console.log("decode",decode);
    req.userId = decode.userId;
    req.type = decode.type;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

export const restrict = (type) => async (req, res, next) => {
  // console.log("typeeeeeeeee",type);
  const userId = req.userId;
  let user;

  const patient = await User.findById(userId);
  const doctor = await Doctor.findById(userId);

  if (patient) {
    user = patient;
  }
  if (doctor) {
    user = doctor;
  }

  // console.log("userrrrr",user);

  if (!type.includes(user.type)) {
    return res
      .status(401)
      .json({ success: false, message: "You are not authorized" });
  }

  next();
};
