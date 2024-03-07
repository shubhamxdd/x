import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const UserLoading = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <ClipLoader color="lightblue" size={80} />
    </div>
  );
};

export default UserLoading;
