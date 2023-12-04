import mongoose from "mongoose";

const chatRoom=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor"
    },
    messages:[{type:mongoose.Schema.Types.ObjectId,ref:"ChatMessage"}]
})

const ChatRoom=mongoose.model("chatRoom",chatRoom)
export default ChatRoom;