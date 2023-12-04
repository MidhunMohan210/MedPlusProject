import ChatRoom from "../models/chatRoom.js";
import ChatMessage from "../models/chatMessage.js";

//get rooms

export const getDoctorRooms = async (req, res) => {
  try {
    const docId = req.params.id;
    // console.log("docccc", docId);
    const rooms = await ChatRoom.find({ doctor: docId }).populate({
      path: "user",
      select: "_id name email",
    });
    // console.log("roomss", rooms);
    if (rooms.length > 0) {
      res.status(200).json(rooms);
    } else {
      res
        .status(404)
        .json({ message: "No rooms found for the specified doctor." });
    }
  } catch (error) {
    console.error("Error fetching doctor rooms:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

////   createRoom   /////

export const createRoom = async (req, res) => {
  try {
    const { doctorId, userId } = req.params;
    let chatRoom = await ChatRoom.findOne({
      user: userId,
      doctor: doctorId,
    });

    if (!chatRoom) {
      chatRoom = new ChatRoom({
        user: userId,
        doctor: doctorId,
        messages: [],
      });
      await chatRoom.save();
    }

    const roomDetails = await ChatRoom.findOne({ _id: chatRoom._id }).populate({
      path: "doctor",
      select: "_id name specialization",
    });
    res
      .status(200)
      .json({ message: "Chat room found or ceated", data: roomDetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating or getting chat room" });
  }
};

///// getRoom  ////

export const getRoom = async (req, res) => {
  try {
    const { doctorId, userId } = req.params;
 

    const room = await ChatRoom.find({
      user: userId,
      doctor: doctorId,
    }).populate({
      path: "doctor",
      select: "_id name specialization ",
    });

    // console.log("room", room);

    if (room) {
      res.status(200).json({ message: "room found", data: room });
    } else {
      res.status(400).json({ message: "Failed to fetch rooms" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error creating or getting chat room" });
  }
};

///  sendChat  ////

export const sendChat = async (req, res) => {
  const { content } = req.body;
  const { sender, roomId, type,Id,senderName } = req.params;


  // console.log("sender", sender);
  // console.log("roomId", roomId);
  // console.log("type", type);

  const newMessage = new ChatMessage({
    room: roomId,
    sender: sender,
    senderType: type,
    receiver:Id,
    content: content,
    senderName:senderName
  });

  await newMessage.save();

  let chatRoom = await ChatRoom.findOne({ _id: roomId });
  // console.log(chatRoom);
  if (chatRoom) {
    chatRoom.messages.push(newMessage._id);
  }
  await chatRoom.save();
  await newMessage.populate([
    { path: "sender", select: "_id name email" },
    {
      path: "room",
      populate: [
        { path: "user", select: "_id name email" },
        { path: "doctor", select: "_id name email" },
      ],
    },
  ]);
  res.json(newMessage);
};

///  getRoomMessages /////

export const getRoomMessages = async (req, res) => {
  const { roomId } = req.params;
  try {
    const messages = await ChatMessage.find({ room: roomId }).sort({
      createdAt: 1,
    });

    if (messages) {
      res.status(200).json(messages);
    } else {
      res
        .status(404)
        .json({ message: "No messages found for the given room." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

///get notification

export const getNotification = async (req, res) => {
  const userId=req.userId
  try {
    const notification = await ChatMessage.find({ receiver: userId,notificationSeen:false }).sort({
      createdAt: -1,
    })
    if (notification) {
      res.status(200).json(notification);
    } else {
      res
        .status(404)
        .json({ message: "No messages found for the given room." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
///clearNotification

export const clearNotification = async (req, res) => {
  const userId=req.userId
  try {
    const notificationSeen = await ChatMessage.updateMany({ receiver: userId },{$set:{notificationSeen:true}})
    if (notificationSeen) {
      res.status(200).json(notificationSeen);
    } else {
      res
        .status(404)
        .json({ message: "No messages found for the given room." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
