import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './interceptors/axios';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//  ------------- Quando for fazer build trocar para: React.StrictMode -----------
  <>
    <App />
  </>
);
