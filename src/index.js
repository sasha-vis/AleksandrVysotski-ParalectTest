import React from 'react';
import ReactDOM from 'react-dom/client';

// Connect basic styles to index.js file
import './index.css';

import App from './App.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
