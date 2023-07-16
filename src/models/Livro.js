import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: { type: String },
    titulo: { type: String, required: [true, ' titulo é obrigatório'] },
    autor: { type: String, required: [true, ' autor é obrigatório'] },
    editora: {
      type: String,
      required: [true, ' editora é obrigatório'],
      enum: {
        values: ['Casa do código', 'Alura'],
        message: 'A editora {VALUE} não é um valor permitido'
      }
    },
    numeroPaginas: {
      type: Number,
      min: [10, 'O número de páginas deve estar entre 10 e 5000 páginas. Valor fornecido: {VALUE}'],
      max: [5000, 'O número de páginas deve estar entre 10 e 5000 páginas.Valor fornecido: {VALUE}']

    }
  }
);

const livros = mongoose.model('livros', livroSchema);

export default livros;