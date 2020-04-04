const PokemonModel = require('../models/pokemon');

const getPokemons = (req, res) => {
  PokemonModel.find()
    .then((data) => {
      return res.status(200).json({
        err: false,
        data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        err: true,
        message: err,
      });
    });
};

const addPokemon = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      err: true,
      message: 'Body is required',
    });
  }
  const newPokemon = new PokemonModel(req.body);
  PokemonModel.estimatedDocumentCount()
    .then((count) => {
      newPokemon.id = count + 1;
      return newPokemon
        .save()
        .then((data) =>
          res.status(201).json({
            err: false,
            data,
          }),
        )
        .catch((err) =>
          res.json({
            err: true,
            message: err,
          }),
        );
    })
    .catch((err) => {
      res.json({
        err: true,
        message: err,
      });
    });
};

const updatePokemon = (req, res) => {
  const id = parseInt(req.params.id);
  PokemonModel.findOneAndUpdate({ id: id }, req.body, { new: true })
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          err: true,
          message: 'pokemon not found',
        });
      }
      return res.status(202).json({
        err: false,
        data,
      });
    })
    .catch((err) => {
      res.json({
        err: true,
        message: err,
      });
    });
};
const removePokemon = (req, res) => {
  const id = parseInt(req.params.id);
  if (id <= 150) {
    return res.status(400).json({
      err: true,
      message: 'Can not delete item',
    });
  }
  PokemonModel.findOneAndDelete({ id: id })
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          err: false,
          data: 'pokemon not found',
        });
      }
      return res.status(202).json({
        err: false,
        data,
      });
    })
    .catch((err) => {
      res.json({
        err: true,
        message: err,
      });
    });
};

const findPokemon = (req, res) => {
  const id = parseInt(req.params.id);
  PokemonModel.findOne(
    { id: id },
    { _id: 0, name: 1, type: 1, 'base.Attack': 1, 'base.Defense': 1, customProps: 1 },
  )
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          err: true,
          message: 'pokemon details not found',
        });
      }
      return res.status(200).json({
        err: false,
        data,
      });
    })
    .catch((err) => {
      res.json({
        err: true,
        message: err,
      });
    });
};
module.exports.getPokemons = getPokemons;
module.exports.addPokemon = addPokemon;
module.exports.removePokemon = removePokemon;
module.exports.updatePokemon = updatePokemon;
module.exports.findPokemon = findPokemon;
