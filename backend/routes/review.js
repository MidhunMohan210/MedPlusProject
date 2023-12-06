import express from 'express'
import {createReview,getDoctorReviews,deleteReview} from '../controllers/reviewController.js'
import { authenticate } from '../auth/verifyToken.js'


const router=express.Router();

router.post('/createReview',authenticate,createReview)
router.get('/getDoctorReviews/:docId',authenticate,getDoctorReviews)
router.delete('/deleteReview/:reviewId',authenticate,deleteReview)


export default router