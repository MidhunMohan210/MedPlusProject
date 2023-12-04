import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chatRoom",
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "senderType",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    
  },
  senderType:{
    type:String,
    required:true,
  },
  senderName:{
    type:String,
    required:true,
  },
  content:{
    type:String
  },
  notificationSeen:{
    type:Boolean,
    default:false
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
});

const ChatMessage=mongoose.model("ChatMessage",chatMessageSchema)
export default ChatMessage;