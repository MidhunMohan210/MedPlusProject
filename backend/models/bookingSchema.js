import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    doctor: {
      type:Object,
      ref: "Doctor",
    },
    patient: {
      type:Object,
      required: true,
    },
    fee: { type: Number, required: true },
    appointmentDate: {
      type: String,
      required: true,
    },
    indianDate:{
      type: String,
      required: true,
    },
    slot: { type: String, required: true },
    paymentStatus: {
      type: String,
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
    isCancelled: {
      type: Boolean,
      default: false,
    },
    cancelReason: {
      type: String,
      
    },
    paymentId:{
      required:true,
      type:String
    }
    
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
