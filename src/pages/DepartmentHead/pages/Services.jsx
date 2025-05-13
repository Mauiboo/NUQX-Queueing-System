import React, { useState } from "react";
import ServiceForm from "../Services/ServiceForm";
import ServicesList from "../Services/ServiceList";
import ProcessDropdown from "../Services/ProcessDropdown";
import "./Services.css";

const Services = () => {
  const [selectedProcesses, setSelectedProcesses] = useState(
    Array(5).fill("Accounting")
  );

  const processes = [
    { id: 1, name: "Accounting" },
    { id: 2, name: "Admission" },
    { id: 3, name: "Registrar" },
    { id: 4, name: "N/A" },
  ];

  const handleSelectChange = (index, value) => {
    const newSelectedProcesses = [...selectedProcesses];
    newSelectedProcesses[index] = value;
    setSelectedProcesses(newSelectedProcesses);
  };

  return (
    <div className="services-container">
      <ServiceForm />

      <div className="process-title" style={{ textAlign: 'right', marginLeft: '320px' }}>
  <h2>Process</h2>
</div>


      <div className="process-container">
        {[0, 1, 2, 3, 4].map((index) => (
          <ProcessDropdown
            key={index}
            index={index}
            selectedValue={selectedProcesses[index]}
            onChange={handleSelectChange}
            processes={processes}
          />
        ))}
      </div>
      <ServicesList />
    </div>
  );
};

export default Services;