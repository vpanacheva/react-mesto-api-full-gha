const mongoose = require('mongoose');
const { REGEX_URL } = require('../utils/constants');

const { ObjectId } = mongoose.Schema.Types;
const { Schema } = mongoose;

const cardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
    },

    link: {
      type: String,
      required: true,
      validate: {
        validator: (url) => REGEX_URL.test(url),
        message: 'Требуется ввести URL',
      },
    },

    owner: {
      type: ObjectId,
      ref: 'user',
      required: true,
    },

    likes: [
      {
        type: ObjectId,
        ref: 'user',
        default: [],
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('card', cardSchema);
