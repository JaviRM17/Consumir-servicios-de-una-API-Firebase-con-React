import firebase from "../firebase";

const db = firebase.collection("/videojuegos");

class VideojuegosService {
  getAll() {
    return db;
  }

  create(videojuego) {
    return db.add(videojuego);
  }

  update(id, value) {
    return db.doc(id).update(value);
  }

  delete(id) {
    return db.doc(id).delete();
  }
}

export default new VideojuegosService();