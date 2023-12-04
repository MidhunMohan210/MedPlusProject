import { useState } from "react";
import { faqs } from "../../assets/data/faqs";
import FaqItem from "./FaqItem";

function FaqList() {
  const [openItem, setOpenItem] = useState(null);

  return (
    <ul className="mt-[58px]">
      {faqs.map((item, index) => (
        <FaqItem item={item} key={index} openItem={openItem} setOpenItem={setOpenItem} />
      ))}
    </ul>
  );
}

export default FaqList;