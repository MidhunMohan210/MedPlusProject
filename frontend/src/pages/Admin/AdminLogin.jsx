import { useEffect, useState } from "react";
// import loginImg from "../../assets/medplus/login.jpg";
import loginImg from "../../assets/medplus/adminLogin.jpg";
// import googleImg from "../../assets/medplus/google.png";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";
import { setaAminCredentials, logoutAdmin } from "../../slices/adminAuthSlice";
import { useDispatch } from "react-redux";

function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  useEffect(()=>{

    const admin=localStorage.getItem("adminInfo")
    if(admin){
      navigate("/admin/users")
    }

  })




  const [formData, setFormData] = useState({
    email: "",
    password: "",
    type:"admin"
  });

  const [loading, setLoading] = useState(false);
  // const { dispatch } = useContext(authContext);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/admin/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      let result = await res.json();
      console.log(result);

      if (!res.ok) {
        throw new Error(result.message);
      }

      dispatch(setaAminCredentials(result));

      setTimeout(() => {
        setLoading(false);
        toast.success(result.message);

        console.log(formData.type);

        navigate("/admin/login");
      }, 1000);
    } catch (error) {
      console.log("error", error);

      setTimeout(() => {
        toast.error(error.message);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 lg:mt-[-60px] mb-[6.5rem]">
      <div className="max-w-sm md:w-1/3">
        <img src={loginImg} alt="Sample image" />
      </div>
      <div className="max-w-sm md:w-1/3">
        {/* <div className="flex items-center text-center md:text-left">
          <label className="mr-1">Sign in with</label>
          <button
            type="button"
            className="mx-1 h-7 w-7 rounded-full relative top-0 text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out transform hover:scale-110 active:scale-95"
          >
            <img src={googleImg} alt="" />
          </button>
        </div> */}
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 font-semibold text-center text-slate-500">
            Admin Login
          </p>
        </div>
        <form onSubmit={submitHandler}>
          <input
            className={`text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded `}
            type="text"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />

          <input
            className={`text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4 `}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
          />

          <div className="flex justify-between mt-4 text-sm font-semibold">
            {/* <label className="flex cursor-pointer text-slate-500 hover:text-slate-600">
              <input className="mr-1" type="checkbox" />
              <span>Remember Me</span>
            </label> */}
            {/* <a
              className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
              href="#"
            >
              Forgot Password?
            </a> */}
          </div>

          <div className="text-center md:text-left">
            <button
              className="px-4 py-2 mt-4 text-xs tracking-wider text-white uppercase bg-blue-600 rounded hover:bg-blue-700"
              type="submit"
            >
              {loading ? (
                <BeatLoader color="#ffffff" margin={3} size={8} />
              ) : (
                "Login"
              )}
            </button>
          </div>
          
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;
