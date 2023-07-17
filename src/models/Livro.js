import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: { type: String },
    titulo: { type: String, required: [true, ' titulo é obrigatório'] },
    autor: {
       type: mongoose.Schema.Types.ObjectId,
       ref:'autores',
        required: [true, ' autor é obrigatório']
      
      },
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
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message:"O número de páginas deve estar entre 10 e 5000 páginas, o valor fornecido foi de {VALUE} páginas."
      }

    }
  }
);

const Livro = mongoose.model('livros', livroSchema);

export default Livro;