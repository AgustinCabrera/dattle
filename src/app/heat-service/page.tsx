"use client";
import React from "react";
import { useRouter } from "next/navigation";

const HeatServiceComponent = () => {
  const router = useRouter();

  const handleRegister = () => {
    router.push("/heat-service/register-heat-service");
  };

  const handleSearch = () => {
    router.push("/heat-service/search-heat-service");
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="p-6 bg-white shadow-md rounded-lg max-w-sm w-full">
        <h2 className="text-xl font-bold text-center mb-4">Heat & Service Management</h2>
        <div className="flex flex-col gap-4">
          <button
            onClick={handleRegister}
            className="px-4 py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-500 transition"
          >
            Register Heat
          </button>
          <button
            onClick={handleRegister}
            className="px-4 py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-500 transition"
          >
            Register Service
          </button>
          <button
            onClick={handleRegister}
            className="px-4 py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-500 transition"
          >
            Register Rectal Palpation
          </button>
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-500 transition"
          >
            Search Heat & Service
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 bg-gray-950 text-white font-medium rounded-lg hover:bg-gray-800 transition"
          >Back</button>
        </div>
      </div>
    </div>
  );
};

export default HeatServiceComponent;
