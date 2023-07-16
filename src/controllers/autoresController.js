import NaoEncontrado from "../erros/NaoEncontrado.js";
import Autor from "../models/Autor.js";

class AutorController {
  static listarAutores = async (req, res, next) => {
    try {
      const autores = await Autor.find();
      res.status(200).json(autores);
    } catch (err) {
      next(err)
    }
  }

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autor = await Autor.findById(id);
      if (autor) {
        res.status(200).send(autor);
      } else {
       next(new NaoEncontrado('Id do autor não localizado'))
      }
    } catch (err) {
      next(err)
    }
  }

  static cadastrarAutor = async (req, res, next) => {
    try {
      const autor = new Autor(req.body);
      await autor.save();
      res.status(201).send(autor.toJSON());
    } catch (err) {
      next(err)
    }
  }

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorResultado = await autores.findByIdAndUpdate(id, {$set: req.body});

      if (autorResultado !== null) {
        res.status(200).send({message: "Autor atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }

    } catch (erro) {
      next(erro);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorResultado = await autores.findByIdAndDelete(id);

      if (autorResultado !== null) {
        res.status(200).send({message: "Autor removido com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default AutorController;
