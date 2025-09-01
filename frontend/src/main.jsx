import React from 'react';
import './index.css';
import App from './App.jsx';
import { createRoot } from 'react-dom/client'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './redux/store.js';

const container = document.getElementById('root');
const root = createRoot(container); 

root.render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>
);
