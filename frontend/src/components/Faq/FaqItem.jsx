import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const FaqItem = ({ item, openItem, setOpenItem }) => {
  const isOpen = openItem === item.question;

  const toggleAccordian = () => {
    if (isOpen) {
      // Close the currently open item by setting openItem to null
      setOpenItem(null);
    } else {
      // Open the clicked item by setting openItem to its question
      setOpenItem(item.question);
    }
  };

  return (
    <div
      className={`relative p-3 lg:p-3 rounded-[12px] border border-solid border-[#cbc3c3] mb-5 md:mb-2 lg:mt-4 top-[-17px] cursor-pointer`}
    >
      <div
        className="flex items-center justify-between gap-5"
        onClick={toggleAccordian}
      >
        <h4 className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor">
          {item.question}
        </h4>
        <div
          className={`${isOpen ? "bg-primaryColor text-white border-none" : ""} w-7 h-7 lg:w-8 lg:h-8 border border-solid border-[#141F21] rounded flex items-center justify-center`}
        >
          {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </div>
      </div>
      {isOpen && 
        <div className="mt-4">
          <p className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
            {item.content}
          </p>
        </div>
      }
    </div>
  );
};

export default FaqItem;







