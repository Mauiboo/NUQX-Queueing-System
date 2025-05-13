import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import StaffApp from './StaffApp';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap App with BrowserRouter */}
      <StaffApp />
    </BrowserRouter>
  </React.StrictMode>
);