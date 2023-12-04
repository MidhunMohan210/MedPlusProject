import User from "../models/userSchema.js";
import Doctor from "../models/doctorSchema.js";



export const userIsBlocked = async (req, res, next) => {
    try {
      const userId = req.userId;
      console.log(userId);
      const patient = await User.findById(userId);
  
      if (!patient) {
        return res.status(404).send("User not found.");
      }
  
      const isBlocked = patient.isBlocked;
  
      if (isBlocked) {
        return res
          .status(403).json({message:"You are blocked and cannot access this resource." })
          
      }
  
      next();
    } catch (error) {
      console.error("Error in userIsBlocked middleware:", error);
      res.status(500).send("Internal Server Error");
    }
  };



export const doctorIsBlocked = async (req, res, next) => {
    try {
      const userId = req.userId;
      console.log(userId);
      const doctor = await Doctor.findById(userId);
  
      if (!doctor) {
        return res.status(404).send("User not found.");
      }
  
      const isBlocked = doctor.isBlocked;
  
      if (isBlocked) {
        return res
          .status(403).json({message:"You are blocked and cannot access this resource." })
          
      }
  
      next();
    } catch (error) {
      console.error("Error in userIsBlocked middleware:", error);
      res.status(500).send("Internal Server Error");
    }
  };
  
