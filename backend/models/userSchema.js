import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  number: { type: Number, required: true },
  photo:{type:String},
  type: {
    type: String,
    enum: ["patient", "doctor"],
    default: "patient",
  },
  gender:{
    type: String,
    enum:["male","female"],
    
  },
  bloodType:{type:String},
  isBlocked:{type:Boolean,default:false},
  appoinments:[{type:mongoose.Types.ObjectId,ref:"Appointment"}]

});

export default mongoose.model("User",userSchema)
