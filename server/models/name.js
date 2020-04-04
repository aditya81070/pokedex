const mongoose = require('mongoose');

const nameSchema = mongoose.Schema(
  {
    english: {
      type: String,
      required: true,
    },
    japanese: String,
    chinese: String,
  },
  {
    _id: false,
  },
);

module.exports = nameSchema;
