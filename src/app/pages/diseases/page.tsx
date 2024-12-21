"use client";
import React from "react";
import { useRouter } from "next/navigation";

const DiseaseComponent = () => {
  const router = useRouter();

  const handleRegister = () => {
    router.push("/pages/diseases/registerDisease");
  };

  const handleSearch = () => {
    router.push("/pages/diseases/searchDisease");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg max-w-sm w-full">
        <h2 className="text-xl font-bold text-center mb-4">Disease Management</h2>
        <div className="flex flex-col gap-4">
          <button
            onClick={handleRegister}
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
          >
            Register Disease
          </button>
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition"
          >
            Search Disease
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiseaseComponent;
