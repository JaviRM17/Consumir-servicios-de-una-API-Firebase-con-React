import React, { Component } from "react";
import VideojuegosService from "../services/videojuegosService";

export default class AddVideojuego extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitulo = this.onChangeTitulo.bind(this);
    this.onChangeDescripcion = this.onChangeDescripcion.bind(this);
    this.onChangeImagen = this.onChangeImagen.bind(this);
    this.saveVideojuego = this.saveVideojuego.bind(this);
    this.newVideojuego = this.newVideojuego.bind(this);

    this.state = {
      titulo: "",
      descripcion: "",
      completado: false,
      imagen:"",

      submitted: false,
    };
  }

  onChangeTitulo(e) {
    this.setState({
      titulo: e.target.value,
    });
  }

  onChangeDescripcion(e) {
    this.setState({
      descripcion: e.target.value,
    });
  }

  onChangeImagen(e) {
    this.setState({
      imagen: e.target.value,
    });
  }

  saveVideojuego() {
    let data = {
      titulo: this.state.titulo,
      descripcion: this.state.descripcion,
      completado: false,
      imagen: this.state.imagen
    };

    VideojuegosService.create(data).then(() => {
        console.log("Created successfully!");
        this.setState({
          submitted: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newVideojuego() {
    this.setState({
      titulo: "",
      descripcion: "",
      completado: false,
      imagen:"",

      submitted: false,
    });
  }

  render() { 
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>Videojuego creado correctamente!</h4>
              <button className="btn btn-success" onClick={this.newVideojuego}>
                Añadir Videojuego
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="titulo">Titulo</label>
                <input type="text" className="form-control" id="titulo" required value={this.state.titulo} 
                onChange={this.onChangeTitulo} name="titulo"/>
              </div>
  
              <div className="form-group">
                <label htmlFor="descripcion">Descripcion</label>
                <input type="text" className="form-control" id="descripcion" required value={this.state.descripcion} 
                onChange={this.onChangeDescripcion} name="descripcion"/>
              </div>

              <div className="form-group">
                <label htmlFor="imagen">Imagen</label>
                <input type="text" className="form-control" id="imagen" required value={this.state.imagen} 
                onChange={this.onChangeImagen} name="imagen"/>
              </div>
  
              <button onClick={this.saveVideojuego} className="btn btn-success">
                Guardar
              </button>
            </div>
          )}
        </div>
    );
  }
}