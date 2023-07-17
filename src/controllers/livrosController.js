import {Livro} from "../models/index.js";

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {

      const livros = await Livro.find().populate('autor').exec();
      res.status(200).json(livros);
    } catch (err) {
      next(err)
    }
  }

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livro = await Livro.findById(id).populate('autor', 'nome').exec();
      if (!livro) {
        res.status(400).send({ message: 'Id do livro não localizado.' });
      } else {
        res.status(200).send(livro);
      }
    } catch (err) {
      next(err)
    }
  }

  static cadastrarLivro = async (req, res, next) => {
    try {
      const livro = new Livro(req.body);
      await livro.save();
      res.status(201).send(livro.toJSON());
    } catch (err) {
      next(err)
    }
  }

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      await Livro.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: 'Livro atualizado com sucesso' });
    } catch (err) {
      next(err)
    }
  }

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      await Livro.findByIdAndDelete(id);
      res.status(200).send({ message: 'Livro removido com sucesso' });
    } catch (err) {
      next(err)
    }
  }

  static listarLivroPorEditora = async (req, res, next) => {
    try {
      const editora = req.query.editora;
      const livros = await Livro.find({ 'editora': editora }).exec();
      res.status(200).send(livros);
    } catch (err) {
      next(err)
    }
  }
}

export default LivroController;
