import express from 'express'
import {createReview,getDoctorReviews} from '../controllers/reviewController.js'
import { authenticate } from '../auth/verifyToken.js'


const router=express.Router();

router.post('/createReview',authenticate,createReview)
router.get('/getDoctorReviews/:docId',authenticate,getDoctorReviews)


export default router