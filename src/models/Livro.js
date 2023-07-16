import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: { type: String },
    titulo: { type: String, required: [true, ' titulo é obrigatório'] },
    autor: { type: String, required: [true, ' autor é obrigatório'] },
    editora: { type: String, required: [true, ' editora é obrigatório'] },
    numeroPaginas: { type: Number }
  }
);

const livros = mongoose.model('livros', livroSchema);

export default livros;