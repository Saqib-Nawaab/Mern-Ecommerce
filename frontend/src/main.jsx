import React from 'react';
import './index.css';
import App from './App.jsx';
import { createRoot } from 'react-dom/client'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import axios from 'axios';

// Configure axios to include token in all requests
axios.interceptors.request.use(
  (config) => {
    // Check for user token for user-related requests
    if (config.url?.includes('/user/')) {
      const token = localStorage.getItem("token");
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    // Check for seller token for seller-related requests
    if (config.url?.includes('/seller/')) {
      const sellerToken = localStorage.getItem("sellerToken");
      if (sellerToken && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${sellerToken}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 responses by clearing invalid tokens
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear tokens on 401 errors
      localStorage.removeItem("token");
      localStorage.removeItem("sellerToken");
    }
    return Promise.reject(error);
  }
);

const container = document.getElementById('root');
const root = createRoot(container); 

root.render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>
);
