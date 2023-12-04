import errorImg from "../../assets/medplus/404.jpg";
import { useNavigate } from "react-router-dom";

function Error404() {
  const navigate=useNavigate();
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="  w-[400px]">
        <img src={errorImg} alt="" />
      </div>
      {/* <div>
        <button
        onClick={()=>navigate('/users/home')}
         className="p-2 leading-6 bg-blue-500 text-white rounded-md mt-9">Back to home </button>
      </div> */}
    </div>
  );
}

export default Error404;
