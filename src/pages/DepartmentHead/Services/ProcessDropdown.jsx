import React from "react";

const ProcessDropdown = ({
  index,
  selectedValues = [],
  onChange,
  processes,
}) => {
  return (
    <div className="process-item">
      <span className="process-text" style={{ color: "black" }}>
        Process {index + 1}
      </span>

      {[0].map((subIndex) => (
        <select
          key={subIndex}
          className="custom-dropdown"
          value={selectedValues[subIndex] || processes[0].name}
          onChange={(e) => onChange(index, subIndex, e.target.value)}
        >
          {processes.map((process, index) => (
            <option key={index} value={process.name}>
              {process.name}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
};

export default ProcessDropdown;
