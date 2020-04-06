const mongoose = require('mongoose');
const baseSchema = require('./base');
const nameSchema = require('./name');

const pokemonSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: nameSchema,
  type: {
    type: [String],
    required: true,
  },
  base: baseSchema,
  customAttrs: {},
});

const Pokemon = mongoose.model('pokemon', pokemonSchema);

module.exports = Pokemon;
