import React, { useState } from "react";
import profileImg from "../../../../src/images/user.png";
import { getCurrentUser } from "../../../utils/auth";
function NavAvatar() {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  function capitalizeFirstLetter(val) {
    return String(val)?.charAt(0)?.toUpperCase() + String(val)?.slice(1);
  }

  const user = getCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <div className="relative ml-auto">
      <div
        className="flex bg-[#35408E] w-fit text-white py-[15px] items-center justify-start md:justify-between cursor-pointer"
        onClick={toggleInfo}
      >
        {/* Text - only visible on md and above */}
        <div className="hidden md:flex flex-col text-right justify-center mb-[-15px] mr-[5px]">
          <div className="font-semibold text-lg">
            {user.firstName + " " + user.middleName + " " + user.lastName}
          </div>
          <div className="text-sm text-gray-300">
            {capitalizeFirstLetter(user.department)}
            {" - "}
            {user.role === "departmentHead" ? "Head Department" : "N/A"}
          </div>
        </div>

        {/* Avatar */}
        <img
          className="w-10 md:w-14 h-auto rounded-full border-[2px] border-white object-cover mb-[-15px] mr-[10px]"
          src={`http://localhost:5000${user.profileImage}`}
          alt="Profile"
        />
      </div>

      {/* Dropdown - only visible when showInfo is true AND screen is small */}
      {showInfo && (
        <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg p-4 z-50 w-48 md:hidden">
          <div className="font-semibold text-lg">
            {user.firstName + " " + user.middleName + " " + user.lastName}
          </div>
          <div className="text-sm text-gray-600">
            {capitalizeFirstLetter(user.department)}

            {" - "}
            {user.role === "departmentHead" ? "Head Department" : "N/A"}
          </div>
        </div>
      )}
    </div>
  );
}

export default NavAvatar;
