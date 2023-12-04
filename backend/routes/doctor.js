import express from 'express'
import {updateDoctor,deleteDoctor,getAllDoctor,getSingleDoctor,getDoctorProfile,getMyAppointments,addTimeSlots,getAvailableDates,getAvailableSlots
,removeSlots,deleteQualification,deleteExperience,cancelAppointment,cancelAppointmentDeleteSlot} from '../controllers/doctorController.js'
import {getDoctorRooms,getRoomMessages,sendChat,getNotification,clearNotification} from '../controllers/chatController.js'
import {authenticateDoctor,restrict} from '../auth/verifyDoctorToken.js'
import { multipleUpload} from "../multer/multer.js";
import { doctorIsBlocked,userIsBlocked } from '../auth/isBlocked.js';
import {authenticate} from '../auth/verifyToken.js'

const router = express.Router();

router.get('/getSingleDoctor/:id',authenticate,userIsBlocked,getSingleDoctor)
router.get('/getAllDoctor',authenticate,userIsBlocked,getAllDoctor)
router.delete('/deleteDoctor/:id',authenticateDoctor,doctorIsBlocked,restrict(['doctor']),deleteDoctor)
router.put('/updateDoctor/:id',authenticateDoctor,doctorIsBlocked,restrict(['doctor']),multipleUpload,updateDoctor)
router.get('/getDoctorProfile',authenticateDoctor,doctorIsBlocked,restrict(['doctor']),getDoctorProfile)
router.get('/getMyAppointments',authenticateDoctor,doctorIsBlocked,restrict(['doctor']),getMyAppointments)
router.post('/addTimeSlots',authenticateDoctor,doctorIsBlocked,restrict(['doctor']),addTimeSlots)
router.get('/getAvailableDates',authenticateDoctor,doctorIsBlocked,restrict(['doctor']),getAvailableDates)
router.get('/getAvailableSlots/:date',authenticateDoctor,doctorIsBlocked,restrict(['doctor',]),getAvailableSlots)
router.get('/removeSlots',authenticateDoctor,doctorIsBlocked,restrict(['doctor']),removeSlots)
router.delete('/deleteQualification',authenticateDoctor,doctorIsBlocked,restrict(['doctor']),deleteQualification)
router.delete('/deleteExperience',authenticateDoctor,doctorIsBlocked,restrict(['doctor']),deleteExperience)
router.put('/cancelAppointment/:id',authenticateDoctor,doctorIsBlocked,restrict(['doctor']),cancelAppointment)
router.put('/cancelAppointmentDeleteSlot/:id',authenticateDoctor,doctorIsBlocked,restrict(['doctor']),cancelAppointmentDeleteSlot)

router.get('/get-doctor-rooms/:id',authenticateDoctor,doctorIsBlocked,restrict(['doctor']),getDoctorRooms)
router.get('/get-room-messages/:roomId',authenticateDoctor,doctorIsBlocked,restrict(['doctor']),getRoomMessages)
router.post('/sendChat/:roomId/:sender/:type/:Id/:senderName',authenticateDoctor,doctorIsBlocked,restrict(['doctor']),sendChat)
router.get('/get-doctor-notification',authenticateDoctor,doctorIsBlocked,restrict(['doctor']),getNotification)
router.post('/clearNotification',authenticateDoctor,doctorIsBlocked,restrict(['doctor']),clearNotification)



export default router