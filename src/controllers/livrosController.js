import { Livro } from "../models/index.js";
import RequisocaoIncorreta from '../erros/RequisicaoIncorreta.js'
class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      // const { limite = 5, pagina = 1,campoOrdenacao = '_id,ordem = -1 } = req.body

      //  limite = parseInt(limite)
      //  pagina = parseInt(pagina)

      //  if (limite > 0 && pagina > 0) {
      const livros = await Livro.find()
        // .sort({ [campoOrdenacao]: ordem }) // ordenar por titulo
        //  .skip((pagina - 1) * limite)
        //   .limit(limite)
        .populate('autor')
        .exec();
      res.status(200).json(livros);

      //  } else {
      //   next(new RequisocaoIncorreta)
      // }
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

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const { editora, titulo } = req.query;

      // opção 1 regex; const regex = new RegExp(titulo, 'i')

      const busca = {}
      if (editora) busca.editora = editora
      if (titulo) busca.titulo = { $regex: titulo, $options: 'i' }

      const livros = await livros.find(busca)

      res.status(200).send(livros);
    } catch (err) {
      next(err)
    }
  }
}

export default LivroController;
