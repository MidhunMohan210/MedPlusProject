/* eslint-disable react/prop-types */
const path = "http://localhost:7000/doctorMedia/";

function CertificateModal({ certificate }) {
  return (
    <div className=" w-[400px] h-[300px] p-4 fixed inset-0 mx-auto my-auto  flex justify-center items-center bg-gray-300 drop-shadow-2xl ">
      <div>
        <img src={`${path}${certificate}`} alt="" />
      </div>
    </div>
  );
}

export default CertificateModal;
