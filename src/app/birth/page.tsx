"use client";
import React from "react";
import { useRouter } from "next/navigation";

const BirthComponent = () => {
  const router = useRouter();

  const handleRegister = () => {
    router.push("/birth/register-briths");
  };

  const handleSearch = () => {
    router.push("/birth/search-births");
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="p-6 bg-white shadow-md rounded-lg max-w-sm w-full">
        <h2 className="text-xl font-bold text-center mb-4">Birth Management</h2>
        <div className="flex flex-col gap-4">
          <button
            onClick={handleRegister}
            className="px-4 py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-500 transition"
          >
            Register Birth
          </button>
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-500 transition"
          >
            Search Birth
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

export default BirthComponent;
