import starIcon from "../../assets/images/Star.png";
import { Link } from "react-router-dom";
const path = "http://localhost:7000/doctorMedia/";
// import { useSelector } from "react-redux";

function DoctorsCard(data) {
  // console.log(data);
  // const doctorData = useSelector((state) => state.filteredDoctors);
  // console.log("card data", doctorData);

  return (
    <>
      {data.data.data.map((el) => (
        <div
          key={el._id}
          className="p-3 m-8 transition-transform transform rounded-md shadow-lg lg:p-5 hover:scale-105 sm:m-4 lg:m-0"
        >
          <Link to={`/users/doctorDetails/${el._id}`}>
            <div>
              <img
                src={`${path}${el.photo}`}
                alt=""
                className="w-full rounded-md "
              />
            </div>
            <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5    ">
              Dr. {el.name}
            </h2>
          </Link>
          <div className="flex items-center justify-between gap-8 mt-2 lg:mt-4">
            <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[12px] lg:leading-7 font-semibold rounded">
              {el.specialization}
            </span>
            <div className="flex items-center justify-end ">
              <span className="flex items-center gap-[1px] text-[12px] leading-6 lg:text-[15px] lg:leading-7 font-semibold text-headingColor">
                <img src={starIcon} className="w-5" alt="" />
                4.3
              </span>
              <span className="text-[10px] ml-7 leading-6 lg:text-[12px] lg:leading-7 font-[400] text-headingColor">
                (282)
              </span>
            </div>

            <div className="mt-[18px] lg:mt-5 flex items-center justify-between "></div>
          </div>
          <div>
            <h3 className="text-[10px] mt-2 leading-7 lg:text-[13px] lg:leading-[30px] font-semibold text-headingColor   ">
              +1300 patients{" "}
            </h3>
            <p className="text-[14px] leading-6 font-[400] text-textColor ">
              Caritas Hospital
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

export default DoctorsCard;
