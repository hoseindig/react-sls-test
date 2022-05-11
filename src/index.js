import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from "react-toastify";

import MainPage from './components/mainPage';
import './index.css';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer position="bottom-right" />
    <MainPage></MainPage>
  </React.StrictMode>
);


