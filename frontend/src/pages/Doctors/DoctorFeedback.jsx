/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import avatar from "../../assets/images/avatar-icon.png";
import { formDate } from "../../utils/formDate.js";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";
import { BASE_URL, token } from "../../config.js";
import dayjs from "dayjs";
const path = "http://localhost:7000/userMedia/";




function DoctorFeedback({ details }) {
  const [showFeedBack, setShowFeedBack] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  console.log(reviews);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // eslint-disable-next-line react/prop-types
        const res = await fetch(
          `${BASE_URL}/reviews/getDoctorReviews/${details._id}`,
          {
            method: "get",
            headers: {
              Authorization: `Bearer ${token} `,
              "Content-Type": "application/json",
            },
          }
        );

        let result = await res.json();
        // console.log("result", result.data);
        setReviews(result.data);

        if (!res.ok) {
          throw new Error(result.message);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchReviews();
  }, [feedbackSubmitted]);

  // console.log(reviews);

  return (
    <div>
      <div className="mt-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px] ">
          All reviews ({reviews.length})
        </h4>

        {reviews.map((el, index) => (
          <div key={index} className="flex justify-start gap-10 mb-[30px]">
            <div className="flex gap-3">
              <figure className="w-10 h-10 rounded-full ">
                <img className="w-full" src={`${path}${el.user.photo}`} alt="" />
              </figure>
              <div>
                <h5 className="text-[16px] leading-4 text-primaryColor font-bold  ">
                  {el.user.name}
                </h5>
                <p className="text-[14px] leading-6 text-textColor  ">
                  {dayjs(el.createdAt).format("DD/MM/YYYY")}
                </p>
                <h3 className="mt-1  text__para text-[16px] font-semibold">
                  {el.reviewTitle}
                </h3>
                <p className="mt-3 font-medium text__para text-[15px]">
                  {el.reviewText}
                </p>
              </div>
            </div>

            <div className="flex gap-1">
              {[...Array(el.rating).keys()].map((_, index) => (
                <AiFillStar key={index} color="#FFBF00" />
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* {!showFeedBack && (
        <div className="text-center">
          <button onClick={() => setShowFeedBack(true)} className="btn">
            Give Feedback
          </button>
        </div>
      )} */}

      {/* {showFeedBack && <FeedbackForm details={details} setFeedbackSubmitted={setFeedbackSubmitted}/>} */}
    </div>
  );
}

export default DoctorFeedback;
