const mongoose = require('mongoose');

const baseSchema = mongoose.Schema(
  {
    HP: {
      type: Number,
      required: true,
    },
    Attack: {
      type: Number,
      required: true,
    },
    Defense: {
      type: Number,
      required: true,
    },
    'Sp. Attack': {
      type: Number,
      required: true,
    },
    'Sp. Defense': {
      type: Number,
      required: true,
    },
    Speed: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

module.exports = baseSchema;
