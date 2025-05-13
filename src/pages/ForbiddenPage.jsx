import React from "react";
import { useNavigate } from "react-router-dom";

const ForbiddenPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-8xl font-bold text-red-600 mb-4">403</h1>
      <h2 className="text-4xl font-semibold mb-2">Access Denied</h2>
      <p className="mb-6 text-gray-700">
        You do not have permission to view this page.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="w-fit bg-[#35408e] text-white px-4 py-1 rounded transition"
      >
        Go Back
      </button>
    </div>
  );
};

export default ForbiddenPage;
