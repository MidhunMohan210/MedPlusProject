import express from 'express'
import session from 'express-session'
import {login, sendOtp ,verifyOtp,resendOtp} from '../controllers/authController.js'
import {doctorSendOtp,doctorVerifyOtp} from '../controllers/doctorAuthcontroller.js'
import { multipleUpload} from "../multer/multer.js";





const router=express.Router()
router.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  }));



// router.post('/register',register)
router.post('/login',login)
router.post('/sendOtp',sendOtp)
router.post('/resendOtp',resendOtp)

router.post('/verifyOtp',verifyOtp)
router.post('/doctorSendOtp',multipleUpload,doctorSendOtp)
router.post('/doctorVerifyOtp',doctorVerifyOtp)



export default router;