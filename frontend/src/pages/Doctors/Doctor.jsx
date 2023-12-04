import { useEffect, useState } from "react";
import DoctorsList from "./DoctorsList";
import { BASE_URL } from "../../config";
import { useDispatch } from "react-redux";
import getDoctors from "../../hooks/useFetchData";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/About/Error";

function Doctor() {
  const dispatch = useDispatch();
  const [docData, setDocData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredResult, setFilteredResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data, loading, error } = getDoctors(
    `${BASE_URL}/doctors/getAllDoctor`
  );
  // console.log(data);

  // Move the filtering logic to a separate function
  const filterDoctors = (data) => {
    return data.filter(
      (doctor) =>
        doctor.isApproved === true &&
        (doctor.name.toLowerCase().includes(search.toLowerCase()) ||
          doctor.specialization.toLowerCase().includes(search.toLowerCase()))
    );
  };

  // console.log("filterDoctors", filterDoctors(data));

  useEffect(() => {
    if (error) {
      console.log("Error in fetching data", error);
    } else if (!loading) {
      setTimeout(() => {
        setDocData(data);
        const filteredDoctors = filterDoctors(data);
        setFilteredResult(filteredDoctors);
        setIsLoading(false);
      }, 1000);
    }
  }, [dispatch, data, loading, error, search]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    const filteredDoctors = filterDoctors(docData);
    setFilteredResult(filteredDoctors);
  };
  return (
    <>
      <section>
        
        {isLoading && 
           <div className="flex items-center justify-center h-screen">
           <Loader />
        </div>
       }
        {error && <Error errorMessage={error.message} />}
        {!isLoading && !error && (
          <section>
            <div className="container text-center">
              <h2 className="heading">Find a Doctor</h2>
              <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between ">
                <input
                  type="search"
                  onChange={handleSearch}
                  className="w-full h-10 py-4 pl-4 pr-2 bg-transparent cursor-pointer focus:outline-none placeholder:text-textColor "
                  placeholder="Search Doctor"
                />
                <button className=" btn mt-0 h-10  rounded-[0px] rounded-r-md flex items-center ">
                  Search
                </button>
              </div>
            </div>
          </section>
        )}
        <section>
          <div className="container">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
              <DoctorsList data={filteredResult} />
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default Doctor;
