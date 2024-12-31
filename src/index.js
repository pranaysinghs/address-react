import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'; // Optional: Add global styles if needed

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Ensure this matches the ID in public/index.html
);
