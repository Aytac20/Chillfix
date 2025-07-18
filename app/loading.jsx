"use client";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
};

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent backdrop-blur-lg">
      <ClipLoader
        color="#0fb87f"
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
      />
    </div>
  );
};

export default LoadingPage;
