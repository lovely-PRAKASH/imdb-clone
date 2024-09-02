import React from "react";

function Pagination({ handlePrev, handleNext, pageNo}) {
  return (
    <div className="bg-gray-400 flex justify-center p-4 mt-5">
      <div onClick={handlePrev} className="px-8 text-xl">
        <i class="fa-solid fa-arrow-left"></i>
      </div>
      <div className="font-bold text-xl">{pageNo}</div>
      <div onClick={handleNext} className="px-8 text-xl">
        <i class="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  );
}

export default Pagination;
