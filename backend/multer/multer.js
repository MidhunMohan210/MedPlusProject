import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/doctorMedia");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

export const multipleUpload = upload.fields([
  { name: "photo", maxCount: 1 },
  { name: "certificate", maxCount: 10 },
]);

console.log("multerrrr");

const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/userMedia");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + Date.now() + "-" + file.originalname);
  },
});

const uploadUser = multer({ storage: userStorage });

export const singleUpload = uploadUser.single("photo");
