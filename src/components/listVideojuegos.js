import React, { Component } from "react";
import videojuegosService from "../services/videojuegosService";

import Videojuego from "./detailVideojuego";

export default class VideojuegosList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveVideojuego = this.setActiveVideojuego.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      videojuegos: [],
      currentVideojuego: null,
      currentIndex: -1,
    };

    this.unsubscribe = undefined;
  }

  componentDidMount() {
    this.unsubscribe = videojuegosService.getAll().orderBy("titulo", "asc").onSnapshot(this.onDataChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onDataChange(items) {
    let videojuegos = [];

    items.forEach((item) => {
      let id = item.id;
      let data = item.data();
      videojuegos.push({
        id: id,
        titulo: data.titulo,
        descripcion: data.descripcion,
        completado: data.completado,
        imagen: data.imagen,
      });
    });

    this.setState({
      videojuegos: videojuegos,
    });
  }

  refreshList() {
    this.setState({
      currentVideojuego: null,
      currentIndex: -1,
    });
  }

  setActiveVideojuego(videojuego, index) {
    this.setState({
      currentVideojuego: videojuego,
      currentIndex: index,
    });
  }

  render() { 
    const { videojuegos, currentVideojuego, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Lista de Videojuegos</h4>

          <ul className="list-group">
            {videojuegos &&
              videojuegos.map((videojuego, index) => (
                <li
                  className={ "list-group-item " + (index === currentIndex ? "active" : "") }
                  onClick={() => this.setActiveVideojuego(videojuego, index)}
                  key={index}
                >
                  {videojuego.titulo}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentVideojuego ? (
            <Videojuego
              videojuego={currentVideojuego}
              refreshList={this.refreshList}
            />
          ) : (
            <div>
              <br />
              <p>Selecciona un Videojuego...</p>
            </div>
          )}
        </div>
      </div>
    );
  
  }
}