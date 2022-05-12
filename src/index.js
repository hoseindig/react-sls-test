import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainPage from './components/mainPage';
import './index.css';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";


import { Provider } from "react-redux";
import store from "./store";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ToastContainer position="bottom-right" />
    <MainPage></MainPage>
  </Provider>
);


