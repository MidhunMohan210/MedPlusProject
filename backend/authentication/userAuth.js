import jwt from "jsonwebtoken";
import Doctor from "../models/doctorSchema.js";
import User from "../models/userSchema.js";

export const authenticatePatient = async (req, res, next) => {

  //get token from headers

//   const authToken = req.headers.authorization;
  const authToken = req.cookies.jwtPatient;
console.log("cookies",req.cookies);
  console.log("authToken",authToken);

  //check token is exist

  if (!authToken) {
    return res
      .status(401)
      .json({ success: false, message: "No token,authorisation denied" });
  }

  try {
    const token = authToken.split(" ")[1];
    // console.log("token",token);

    //verify token
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decode);
    req.userId = decode.id;
    req.type = decode.type;

    next();
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token is expired" });
    }

    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};
