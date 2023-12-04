import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
	return (
		<>
			<div className="bg-[#192633] h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20 md:mt-10">
				<div className="p-5 ">
					<ul>
						<p className="text-white font-bold text-3xl pb-6">
							Med<span className="text-blue-600">Plus</span>
						</p>
						<div className="flex gap-6 pb-5">
							<FaInstagram className="text-2xl cursor-pointer hover:text-yellow-600" />
							<FaTwitter className="text-2xl cursor-pointer hover:text-blue-600" />
							<FaLinkedin className="text-2xl cursor-pointer hover:text-blue-600" />
							<FaYoutube className="text-2xl cursor-pointer hover:text-red-600" />
						</div>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-white font-bold text-2xl pb-4">For Patients</p>
						<li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
						Patient Information
						</li>
						<li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
						Preparing for a Visit
						</li>
						<li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
						Patient Portal
						</li>
						<li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
						Reports
						</li>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-white font-bold text-2xl pb-4">Fellowship Programs</p>
						<li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
						Pediatric Critical Care
						</li>
						<li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
						Radiology
						</li>
						<li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
						Diabetic Foot
						</li>
						<li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
						Fetal Medicine
						</li>
						<li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
							Obstetric Ultrasound
						</li>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-white font-bold text-2xl pb-4">Support</p>
						<li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
							Contact
						</li>
						<li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
							Support Portals
						</li>
						<li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
							List Of Charges
						</li>
						<li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
							Downloads & Resources
						</li>
						<li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
							Videos
						</li>

						<Link to='/doctorSignup'>
						
						<li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
							Signup as Doctor
						</li>

						</Link>
						<Link to='admin/login'>
						
						<li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
							Admin Login
						</li>

						</Link>
					</ul>
				</div>
			</div>
			
		</>
	);
}

export default Footer;