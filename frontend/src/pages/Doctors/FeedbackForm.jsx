/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
function FeedbackForm({ details, setFeedbackSubmitted }) {
  const user = JSON.parse(localStorage.getItem("PatientInfo"));
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  // const [submit,setSubmit]=useState(false);

  // console.log(rating);
  // console.log(reviewTitle);
  // console.log(reviewText);

  const handleSubmitReview = async (e) => {

    e.preventDefault();

    if (rating === 0) {
      console.log("hASGhj");
      toast.error("Please provide a rating");
      return;
    }
  
    // Validate reviewTitle
    if (reviewTitle.trim() === '' || reviewTitle.length > 20) {
      toast.error("Review title must be between 1 and 20 characters");
      return;
    }
  
    // Validate reviewText
    if (reviewText.trim() === '' || reviewText.length > 200) {
      toast.error("Review text must be between 1 and 200 characters");
      return;
    }


    // setFeedbackSubmitted(false);
    console.log("haiii");

    const reviewData = {
      rating,
      reviewText,
      reviewTitle,
      doctor: details._id,
      user: user._id,
    };
    // console.log(reviewData);

    try {
      // eslint-disable-next-line react/prop-types
      const res = await fetch(`${BASE_URL}/reviews/createReview`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${token} `,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: reviewData }),
      });

      let result = await res.json();
      toast.success(result.message)
      // console.log("result", result.message);

      if (!res.ok) {
        throw new Error(result.message);
      }
      setReviewText("");
      setReviewTitle("");
      setFeedbackSubmitted(true);
      setTimeout(() => {
        toast.success(result.message);
      }, 1000);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleStarHover = (starIndex) => {
    setHover(starIndex);
  };

  const handleStarClick = (starIndex) => {
    setRating(starIndex);
  };

  return (
    <form action="">
      <div>
        <h3 className="text-headingColor text-[16px] leading-4 font-semibold mb-4">
          How would you rate your overall experience
        </h3>
        <div>
          {[...Array(5).keys()].map((index) => {
            const starIndex = index + 1;
            return (
              <button
                key={starIndex}
                className={`${
                  starIndex <= (rating || hover)
                    ? "text-yellowColor"
                    : "text-gray-400"
                } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                type="button"
                onClick={() => handleStarClick(starIndex)}
                onMouseEnter={() => handleStarHover(starIndex)}
                onMouseLeave={() => handleStarHover(0)}
                onDoubleClick={() => {
                  setHover(0);
                  setRating(0);
                }}
              >
                <AiFillStar />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-[30px]">
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
          Share your feedback and suggestions*
        </h3>
        <input
          type="text"
          placeholder="Title.."
          value={reviewTitle}
          onChange={(e) => setReviewTitle(e.target.value)}
          className="border border-solid border-[#0066ff34] focus:outline px-4 py-3 rounded-md w-full  outline-primaryColor mb-4 "
        />
        <textarea
          className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full
        px-4 py-3 rounded-md 
        "
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="write your message"
        ></textarea>
      </div>

      <button type="submit" onClick={handleSubmitReview} className="btn hover:scale-105 transition duration-100 ease-in-out cursor-pointer ">
        Submit Feedback
      </button>
    </form>
  );
}

export default FeedbackForm;
