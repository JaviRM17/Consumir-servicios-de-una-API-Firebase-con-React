import logo from './logo.svg';
import './App.css';

import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";
import AddVideojuego from "./components/addVideojuego";
import ListVideojuegos from "./components/listVideojuegos";

function App() {
  return (
    <div>
        <nav className="navbar navbar-expand navbar-dark bg-primary">
          <a href="/videojuegos" className="navbar-brand">
            Tajamar-Videojuegos
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/videojuegos"} className="nav-link">
                Videojuegos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Añadir Videojuego
              </Link>
            </li>
          </div>
        </nav>
        <br/><h2 class="text-center">React Firestore CRUD</h2><br/>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/videojuegos"]} component={ListVideojuegos} />
            <Route exact path="/add" component={AddVideojuego} />
          </Switch>
        </div>
      </div>
  );
}

export default App;
