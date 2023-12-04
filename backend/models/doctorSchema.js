import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },
  number: { type: Number, required: true  },
  password: { type: String, required: true },
  gender:{
    type: String,
    enum:["male","female"],
    
  },
  degree: { type: String, required: true },

  photo: { type: String },
  certificate: { type: Array },
  fee: { type: Number },
  college: { type: String },
  type: {
    type: String,
  },

  // Fields for doctors only
  specialization: { type: String },
  qualifications: {
    type: Array,
  },

  experiences: {
    type: Array,
  },

  bio: { type: String, maxLength: 500 },
  about: { type: String },
  timeSlots: { type: Array },
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: Boolean,
    // enum: ["pending", "true", "false"],
    default: true,
  },
  videoCallApprove: {
    type: Boolean,
    // enum: ["pending", "true", "false"],
    default: false,
  },
  certificateApprove: {
    type: Boolean,
    // enum: ["pending", "true", "false"],
    default: false,
  },
  isBlocked: {
    type: Boolean,
    // enum: ["pending", "true", "false"],
    default: false,
  },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

export default mongoose.model("Doctor", DoctorSchema);