import React from "react";

const ServicesList = () => {
  const services = [
    { id: "0001", name: "Enrollment" },
    { id: "0002", name: "Graduation" },
  ];

  return (
    <div className="services-list" style={{ color: "black" }}>
  <h4 style={{ color: "black" }}>Services</h4>
  <table>
    <thead>
      <tr>
        <th style={{ color: "white" }}>Process ID</th>
        <th style={{ color: "white" }}>Process Name</th>
      </tr>
    </thead>
    <tbody>
      {services.map((service, index) => (
        <tr key={index}>
          <td style={{ color: "black" }}>{service.id}</td>
          <td style={{ color: "black" }}>{service.name}</td>
        </tr>
      ))}
    </tbody>
  </table>

  <table>
    <thead>
      <tr>
        <th style={{ color: "white" }}>Department Name</th>
        <th style={{ color: "white" }}>Process Request</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{ color: "black" }}>Registrar</td>
        <td style={{ color: "black" }}>Transcript Request</td>
      </tr>
      <tr>
        <td style={{ color: "black" }}>Library</td>
        <td style={{ color: "black" }}>Book Borrowing</td>
      </tr>
    </tbody>
  </table>
</div>

  );
};

export default ServicesList;
