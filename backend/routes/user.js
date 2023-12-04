import express from 'express'
import {updateUser,deleteUser,getAllUser,getSingleUser,
getUserProfile,getMyAppointments,getAvailableSlots,getAvailableDates,cancelBooking,getAppointmentsDetails} from '../controllers/userController.js'
import { saveBookingData } from '../controllers/bookingController.js'
import {getSingleDoctor} from '../controllers/doctorController.js'
import {createRoom,getRoom,sendChat,getRoomMessages,getNotification,clearNotification} from '../controllers/chatController.js'
import { makePayment,sessionStatus } from '../controllers/paymentController.js'
import {restrict,authenticate} from '../auth/verifyToken.js'
import { authenticatePatient } from '../authentication/userAuth.js'
import { userIsBlocked } from '../auth/isBlocked.js'
import { singleUpload } from '../multer/multer.js';

const router = express.Router();

router.get('/getSingleUser/:id',authenticate,userIsBlocked,restrict(['patient']), getSingleUser)
// router.get('/getAllUser',authenticate,userIsBlocked,restrict(['admin']),getAllUser)
router.delete('/deleteUser/:id',authenticate,userIsBlocked,restrict(['patient']),deleteUser)
router.put('/updateUser/:id',authenticate,userIsBlocked,restrict(['patient']),singleUpload,updateUser)
router.get('/getUserProfile',authenticate,userIsBlocked,restrict(['patient']),getUserProfile)
router.get('/getMyAppointments',authenticate,userIsBlocked,restrict(['patient']),getMyAppointments)
router.get('/getAppointmentsDetails/:id',authenticate,userIsBlocked,restrict(['patient']),getAppointmentsDetails)
router.get('/getSingleDoctor/:id',authenticate,userIsBlocked,getSingleDoctor)
router.get('/getAvailableSlots',authenticate,userIsBlocked,restrict(['patient']),getAvailableSlots)
router.get('/getAvailableDates/:id',authenticate,userIsBlocked,restrict(['patient']),getAvailableDates)
router.post('/makePayment',authenticate,userIsBlocked,restrict(['patient']),makePayment)
router.get('/session-status',authenticate,userIsBlocked,restrict(['patient']),sessionStatus)
router.post('/saveBookingData',authenticate,userIsBlocked,restrict(['patient']),saveBookingData)

router.put('/cancelBooking/:id',authenticate,userIsBlocked,restrict(['patient']),cancelBooking)

router.post('/createRoom/:doctorId/:userId',authenticate,userIsBlocked,restrict(['patient']),createRoom)
router.get('/getRoom/:doctorId/:userId',authenticate,userIsBlocked,restrict(['patient']),getRoom)
router.post('/sendChat/:sender/:roomId/:type/:Id/:senderName',authenticate,userIsBlocked,restrict(['patient']),sendChat)
router.get('/getRoomMessages/:roomId',authenticate,userIsBlocked,restrict(['patient']),getRoomMessages)
router.get('/get-user-notification',authenticate,userIsBlocked,restrict(['patient']),getNotification)
router.post('/clearNotification',authenticate,userIsBlocked,restrict(['patient']),clearNotification)





export default router;