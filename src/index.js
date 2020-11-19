import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//Añadir para hacer el routing
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  //Cambiar de React.StrictMode a BrowserRouter
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
