import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getDoctors from "../../src/hooks/useFetchData";
import { BASE_URL } from "../config";
import DoctorsList from "../pages/Doctors/DoctorsList";
import { services } from "../assets/data/services";

function ServiceDetails() {
  
  const [datas, setDatas] = useState([]);
  const { service } = useParams();
  const { data, loading, error } = getDoctors(
    `${BASE_URL}/doctors/getAllDoctor`
  );

  // Move the filtering logic to a separate function
  const filterDoctors = (doctorsData) => {
    return doctorsData.filter(
      (doctor) =>
        doctor.isApproved === true && doctor.specialization === service
    );
  };

  useEffect(() => {
    if (data) {
      const filteredDoctors = filterDoctors(data);
      setDatas(filteredDoctors);
      console.log(filteredDoctors);
    }
  }, [data, service]);

const subHeading=services.find((x)=>x.name===service).desc
console.log(subHeading);



  return (
    <div>
      <section>
        <section>
          <div className="xl:w-[470px] mx-auto mt-10">
            <h2 className="heading text-center">{service}</h2>
            <p className="text__para text-center">
             {subHeading}
            </p>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
              <DoctorsList data={datas} />
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default ServiceDetails;
