import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import useRoute from "./routes/user.js";
import doctorRoute from "./routes/doctor.js";
import adminRoute from "./routes/admin.js";
import reviewRoute from "./routes/review.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
// import { truncate } from "fs";
import { Server } from "socket.io";

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const dbURL = "mongodb://127.0.0.1:27017/MedPlus";
const dbURL = "mongodb+srv://midhunmohan210:ANo8D5WIecyTYdrx@cluster0.q7zygry.mongodb.net/";

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

dotenv.config();

const app = express();
app.use(cookieParser());

const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "public")));

//configuring cors

const corsOptions = {
  origin: true,
  credentials: true,
};

//configuring middlwares
const currentWorkingDir = path.resolve()
const parentDir = path.dirname(currentWorkingDir);
console.log("parentDir",parentDir);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use("/api/auth", authRoute);
app.use("/api/users", useRoute);
app.use("/api/doctors", doctorRoute);
app.use("/api/admin", adminRoute);
app.use("/api/reviews", reviewRoute);

// if (process.env.NODE_ENV === "production") {
//   const __dirname = path.resolve();
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));
//   app.get('*', (req, res) =>
//   res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
// );
// }else{
//   app.get('/', (req, res) => {
//     res.send('API is running....');
//   });

// }

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(parentDir, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(parentDir, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

const server = app.listen(port, () => {
  try {
    console.log(`server is running on port ${port}`);
  } catch (error) {
    console.log(error);
  }
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://www.medplus.midhunmohan.online ,https://medplus.midhunmohan.online",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected with socket io", socket.id);

  socket.on("setup", (user) => {
    //  console.log(userData);
    socket.join(user); //joined in a room of number userId
    console.log(user);
    socket.emit("connected"); //confirmation to the client that the setup process is complete.
  });

  socket.on("join_chat", (room) => {
    socket.join(room);
    console.log("user joined in the room:", room);
  });

  socket.on("new message", (newMessageReceived) => {
    console.log("newMessageReceived", newMessageReceived);
    var chat = newMessageReceived.room;
    if (!chat.user || !chat.doctor) {
      return console.log("chat.users not defined");
    }

    // socket.to(chat._id).emit("message received",newMessageReceived)

    socket.in(chat._id).emit("message received", newMessageReceived);

    if (chat.user._id === newMessageReceived.sender._id) {
      socket.to(chat._id).emit("message received", newMessageReceived);
    }

    if (chat.doctor._id === newMessageReceived.sender._id) {
      socket.to(chat._id).emit("message received", newMessageReceived);
    }
  });

  socket.off("setup", () => {
    console.log("User Disconnected");
    socket.leave(user);
  });
});
