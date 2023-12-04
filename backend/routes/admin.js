import express from "express";
import { restrict, authenticateAdmin } from "../auth/verifyAdmin.js";
import { getAllUser,getAllDoctor, blockUser,login ,
    handleApprove,handleBlock,getBookings,cancelBooking,approveVideoCall,approveCertificate} from "../controllers/adminController.js";
const router = express.Router();

router.get("/getAllUser", getAllUser);
router.post("/login", login);
router.get("/getAllDoctors", getAllDoctor);
router.put("/blockUser/:id",authenticateAdmin, blockUser);
router.put('/HandleApprove/:id',authenticateAdmin,handleApprove)
router.put('/HandleBlock/:id',authenticateAdmin,handleBlock)
router.get('/getBookings',authenticateAdmin,getBookings)
router.put('/cancelBooking/:id',authenticateAdmin,cancelBooking)
router.post('/approveVideoCall/:id',authenticateAdmin,approveVideoCall)
router.post('/approveCertificate/:id',authenticateAdmin,approveCertificate)

export default router;
