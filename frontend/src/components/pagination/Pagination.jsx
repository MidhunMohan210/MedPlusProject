// eslint-disable-next-line react/prop-types
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";

function Pagination({ totalPosts, postPerPage, setCurrentPage, currentPage }) {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i);
  }

  const previous=async()=>{
    if(currentPage >1){
      setCurrentPage(currentPage-1)
    }
  }
  const next=async()=>{
    console.log(currentPage);
    console.log(pages.length);
    if(currentPage <pages.length){
      setCurrentPage(currentPage+1)
    }
  }

  return (
    <div className="flex justify-center ">
    <nav aria-label="Page navigation example ">
      <ul className="inline-flex -space-x-px text-base h-10 gap-3">
        <li onClick={()=>previous()}>
          <a
            href="#"
            className="flex items-center justify-center text-[30px] px-4 h-10 ms-0 leading-tight hover:scale-125 transition ease-in-out"
          >
            <IoIosArrowRoundBack/>
          </a>
        </li>
        {pages.map((page, index) => (
          <li 
            onClick={() => setCurrentPage(page)}
            key={index}
          >
            <a
              href="#"
              className={`${
                currentPage === page ? "bg-violet-500 text-white border rounded-full" : ""
              } flex items-center justify-center px-4 h-10 leading-tight  hover:bg-gray-100 hover:text-gray-700`}
            >
              {page}
            </a>
          </li>
        ))}
        <li onClick={()=>next()}>
            
          <a
            href="#"
            className="flex items-center text-[30px] justify-center px-4 h-10 leading-tight hover:scale-125 transition ease-in-out"
          >
           <IoIosArrowRoundForward/>
          </a>
        </li>
      </ul>
    </nav>
  </div>
  
  
  );
}

export default Pagination;
