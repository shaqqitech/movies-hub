import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-black absolute top-0 left-0">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500"></div>
    </div>
  );
};

export default Spinner;
