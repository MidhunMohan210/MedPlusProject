import PaymentFailedImg from "../../assets/medplus/paymentFailed.jpg";
import { useNavigate } from "react-router-dom";

function PaymentFailed() {
    const navigate=useNavigate()
  return (
    <div className="flex flex-col items-center justify-center">
    <div className="flex  justify-center w-[300px]">
      <img src={PaymentFailedImg} alt="" />
    </div>
    <div>
      <h3 className="text-headingColor font-semibold mt-4">
        Oops Your payment is{" "}
        <span className="text-red-500 font-semibold">Failed !</span>
      </h3>
    </div>
    <p className="text-[14px] font-medium mt-3">Try Again</p>
    <button 
    onClick={()=>navigate('/users/home')}
    className="p-2 hover:scale-105 transition duration-100 ease-in-out cursor-pointer bg-blue-500 rounded-md text-white mt-4">
      Back to Home
    </button>

    <p className="text__para relative bottom-">Your health and well-being are our foremost concerns.</p>
  </div>
  )
}

export default PaymentFailed
