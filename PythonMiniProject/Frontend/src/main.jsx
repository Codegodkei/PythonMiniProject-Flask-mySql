// Main.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createRoot } from 'react-dom';


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
