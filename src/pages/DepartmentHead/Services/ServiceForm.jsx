import React, { useState } from "react";

const ServiceForm = () => {
  const [description, setDescription] = useState("");
  const [serviceName, setServiceName] = useState(""); 
  const maxChars = 250;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Service Submitted:\nName: ${serviceName}\nDescription: ${description}`);
  };

  const handleClear = () => {
    setServiceName("");
    setDescription("");
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
    maxWidth: '500px',
    margin: '20px',
    padding: '20px',
    background: '#fff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    marginRight: '-800px',
    marginTop: '20px',
    height: '350px',
  };

  const titleStyle = {
    fontSize: '22px',
    color: '#2D2D75',
    marginBottom: '10px',
  };

  const labelStyle = {
    fontSize: '16px',
    fontWeight: '500',
    color: 'black',
    marginBottom: '5px',
    
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '14px',
  };

  const textareaStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '14px',
    minHeight: '100px',
    resize: 'none',
  };

  const charCounterStyle = {
    fontSize: '12px',
    color: '#666',
    textAlign: 'right',
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '10px',
  };

  const buttonStyle = {
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',

  };

  const submitBtnStyle = {
    ...buttonStyle,
    backgroundColor: '#35408E',
    color: 'white',
    border: 'none',
    width: '100px',
    height: '45px',
    marginLeft: '260px', 
    position: 'absolute',
    bottom: '-30px',
  };
  
  const clearBtnStyle = {
    ...buttonStyle,
    backgroundColor: '#35408E',
    color: 'white',
    border: 'none',
    width: '100px',
    height: '45px',
    position: 'absolute',
    bottom: '-30px',
    marginLeft: '380px', 

  };
  

  return (
    <div style={formStyle}>
      <style>
        {`
          input::placeholder,
          textarea::placeholder {
            color: black;
          }
        `}
      </style>

      <h2 style={titleStyle}>Service Details</h2>
      
      <label style={labelStyle} htmlFor="service-name">Service Name*</label>
      <input 
        type="text" 
        id="service-name" 
        style={inputStyle} 
        placeholder="Enter service name"
        value={serviceName} 
        onChange={(e) => setServiceName(e.target.value)} 
      />

      <label style={labelStyle} htmlFor="service-description">Service Description Steps</label>
      <textarea
        id="service-description"
        style={textareaStyle}
        placeholder="Enter service description steps..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={maxChars}
      />
      <div style={charCounterStyle}>{description.length}/{maxChars}</div>
      <div style={buttonGroupStyle}>
          <button 
            style={submitBtnStyle} 
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button 
            style={clearBtnStyle} 
            onClick={handleClear}
          >
            Clear
          </button> 
      </div>
    </div>
  );
};

export default ServiceForm;
