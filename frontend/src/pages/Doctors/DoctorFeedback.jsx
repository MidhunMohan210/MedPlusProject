/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BASE_URL, token } from "../../config.js";
import dayjs from "dayjs";
import Pagination from "../../components/pagination/Pagination.jsx";
// const path = "http://localhost:7000/userMedia/";
import { userPath } from "../../config.js";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";


function DoctorFeedback({ details }) {
  const [reviews, setReviews] = useState([]);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(3);
  const user = JSON.parse(localStorage.getItem("PatientInfo"));

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

  const deleteReviewe = async (reviewId) => {
    const result=await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
    if(result.isConfirmed){

      try {
        // eslint-disable-next-line react/prop-types
        const res = await fetch(`${BASE_URL}/reviews/deleteReview/${reviewId}`, {
          method: "delete",
          headers: {
            Authorization: `Bearer ${token} `,
            "Content-Type": "application/json",
          },
        });
  
        let result = await res.json();
        setFeedbackSubmitted(!feedbackSubmitted)
        // console.log("result", result.data);
  
        if (!res.ok) {
          throw new Error(result.message);
        }
      } catch (error) {
        console.log("error", error);
        Swal.fire({
          title: "Error!",
          text: "An error occurred while deleting the review.",
          icon: "error",
        });
      }
    }
  };

  // console.log(reviews);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentReviews = reviews.slice(firstPostIndex, lastPostIndex);

  return (
    <div>
      <div className="mt-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px] ">
          All reviews ({reviews.length})
        </h4>

        {currentReviews.map((el, index) => (
          <div key={index} className="flex justify-start gap-10 mb-[30px]">
            <div className="flex gap-3">
              <figure className="w-10 h-10 rounded-full ">
                <img
                  className="w-full"
                  src={`${userPath}${el.user.photo}`}
                  alt=""
                />
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

            <div>
              <div className="flex gap-1">
                {[...Array(el.rating).keys()].map((_, index) => (
                  <AiFillStar key={index} color="#FFBF00" />
                ))}
              </div>
              {user._id == el.user._id && (
                <div
                  onClick={() => deleteReviewe(el._id)}
                  className="flex justify-center items-center mt-7 text-[19px] hover:scale-125 hover:text-red-500 transition ease-in-out"
                >
                  <MdDeleteForever />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-20 flex justify-start">
        <Pagination
          postPerPage={postPerPage}
          totalPosts={reviews.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default DoctorFeedback;
