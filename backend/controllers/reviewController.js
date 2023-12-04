import Review from "../models/reviewSchema.js";
import Doctor from "../models/doctorSchema.js";

////get all reviews

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    res
      .status(200)
      .json({ success: true, message: "Successful", data: reviews });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: "Not found" });
  }
};



///grt doctor review////

export const getDoctorReviews = async (req, res) => {
  const docId=req.params.docId;
  try {
    const reviews = await Review.find({doctor:docId}).populate({path:"user",select:"name photo"})
    res
      .status(200)
      .json({ success: true, message: "Successful", data: reviews });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: "Not found" });
  }
};





///create Review

export const createReview = async (req, res) => {

    const {rating,reviewText,reviewTitle,doctor,user}=req.body.data
    console.log("doctor",doctor);


  const newReview = new Review(req.body.data);
  try {
    const savedReview = await newReview.save();
    await Doctor.findByIdAndUpdate(doctor, {
      $push: { reviews: savedReview._id },
    });

    res
    .status(200)
    .json({ success: true, message: "Review Added Successfully", data: savedReview });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error in creating review" });

  }
};
