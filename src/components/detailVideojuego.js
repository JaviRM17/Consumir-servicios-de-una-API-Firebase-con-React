import React, { Component } from "react";
import videojuegosService from "../services/videojuegosService";

export default class Videojuego extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitulo = this.onChangeTitulo.bind(this);
    this.onChangeDescripcion = this.onChangeDescripcion.bind(this);
    this.updateCompletado = this.updateCompletado.bind(this);
    this.updateVideojuego = this.updateVideojuego.bind(this);
    this.deleteVideojuego = this.deleteVideojuego.bind(this);

    this.state = {
      currentVideojuego: {
        id: null,
        titulo: "",
        descripcion: "",
        completado: false,
        imagen: ""
      },
      message: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { videojuego } = nextProps;
    if (prevState.currentVideojuego.id !== videojuego.id) {
      return {
        currentVideojuego: videojuego,
        message: ""
      };
    }

    return prevState.currentVideojuego;
  }

  componentDidMount() {
    this.setState({
      currentVideojuego: this.props.videojuego,
    });
  }

  onChangeTitulo(e) {
    const titulo = e.target.value;

    this.setState(function (prevState) {
      return {
        currentVideojuego: {
          ...prevState.currentVideojuego,
          titulo: titulo,
        },
      };
    });
  }

  onChangeDescripcion(e) {
    const descripcion = e.target.value;

    this.setState((prevState) => ({
      currentVideojuego: {
        ...prevState.currentVideojuego,
        descripcion: descripcion,
      },
    }));
  }

  updateCompletado(status) {
    videojuegosService.update(this.state.currentVideojuego.id, {completado: status}).then(() => {
        this.setState((prevState) => ({
          currentVideojuego : {
            ...prevState.currentVideojuego,
            completado: status,
          },
          message: "Cambiado!",
        }));
    })
    .catch((e) => {
      console.log(e);
    });
  }

  updateVideojuego() {
    const data = {
      titulo: this.state.currentVideojuego.titulo,
      descripcion: this.state.currentVideojuego.descripcion,
    };

    videojuegosService.update(this.state.currentVideojuego.id, data).then(() => {
      this.setState({
        message: "Videojuego actualizado correctamente!",
      });
    })
    .catch((e) => {
      console.log(e);
    });
  }

  deleteVideojuego() {
    videojuegosService.delete(this.state.currentVideojuego.id).then(() => {
        this.props.refreshList();
    })
    .catch((e) => {
      console.log(e);
    });
  }

  render() { 
    const { currentVideojuego } = this.state;

    return (
      <div>
        <h4>Videojuego</h4>
        {currentVideojuego ? (
          <div className="edit-form">
            <img src={currentVideojuego.imagen} style={{width: "150px", height: "150px"}}/>

            <form>
              <div className="form-group">
                <label htmlFor="titulo"><strong>Titulo</strong></label>
                <input type="text" className="form-control" id="titulo" value={currentVideojuego.titulo} onChange={this.onChangeTitulo}/>
              </div>
              <div className="form-group">
                <label htmlFor="descripcion"><strong>Descripcion</strong></label>
                <input type="text" className="form-control" id="descripcion" value={currentVideojuego.descripcion} onChange={this.onChangeDescripcion}/>
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentVideojuego.completado ? "Platino conseguido!!!" : "Me quedan las misiones secundarias..."}
              </div>
            </form>

            {currentVideojuego.completado ? (
              <button className="btn btn-primary mr-2" onClick={() => this.updateCompletado(false)}>
                Pendiente
              </button>
            ) : (
              <button className="btn btn-primary mr-2" onClick={() => this.updateCompletado(true)}>
                Completado
              </button>
            )}

            <button className="btn btn-danger mr-2" onClick={this.deleteVideojuego}>
              Eliminar
            </button>

            <button type="submit" className="btn btn-success" onClick={this.updateVideojuego}>
              Actualizar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Selecciona un videojuego...</p>
          </div>
        )}
      </div>
    );
  }
}