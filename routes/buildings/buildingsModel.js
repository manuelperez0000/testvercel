const mongoose = require('mongoose');

const { Schema } = mongoose;

const Buildings = new Schema({
  municipios: { type: String, default: "", required: true },
  tipo: { type: String, default: "", required: true },
  parroquias: { type: String, default: "", required: true },
  descripcion: { type: String, default: "", required: false },
  precio: { type: Number, default: 0, required: true },
  cantidadCuartos: { type: Number, default: 0, required: true },
  ventaOAlquiler: { type: String, default: "", required: true },
  cantidadBanos: { type: Number, default: 0, required: true },
  cantidadEstacionamientos: { type: Number, default: 0, required: true },
  metrosTerreno: { type: Number, default: 0, required: false },
  metrosConstruccion: { type: Number, default: 0, required: true },
  idPublicante: { type: String, default: "", required: true },
  date: { type: Date, default: Date.now, required: false },
  images: { type: Array, default: [], required: false },
})

module.exports = mongoose.model('Buildings', Buildings);