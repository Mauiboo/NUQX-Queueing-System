import React from "react";
import NULogo from "../../../../src/images/NULogo.png";

function Logo() {
  const handleToggleSideBar = () => {
    document.body.classList.toggle("toggle-sidebar");
  };

  const logoStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    lineHeight: 1,
  };

  return (
    <div style={logoStyle}>
      <div
        className="ml-[10px] md:ml-0"
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          className="max-h-[100px] w-20 md:w-full mr-[6px]"
          src={NULogo}
          alt="NU Logo"
        />
        <h1 className="text-white text-[1.5rem] mt-2 md:text-[2rem] font-[200]">
          NUQX
        </h1>
      </div>
    </div>
  );
}

export default Logo;
