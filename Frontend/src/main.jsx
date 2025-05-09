import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Toaster } from 'react-hot-toast';
import DataProvider from './context/DataProvider';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataProvider>
      
        <App />
        <Toaster position="top-right" reverseOrder={false} />

    </DataProvider>
  </React.StrictMode>
);