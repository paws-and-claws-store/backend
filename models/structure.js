const {Schema, model} = require('mongoose');

const petSchema = new Schema({
  ua: {
    type: String,
    required: true,
  },
  en: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
});

const categorySchema = new Schema({
  ua: {
    type: String,
    required: true,
  },
  en: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  _pet: {
    type: Schema.Types.ObjectId,
    ref: 'Pet',
  }
});

const variantSchema = new Schema({
  ua: {
    type: String,
    required: true,
  },
  en: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  _pet: {
    type: Schema.Types.ObjectId,
    ref: 'Pet',
  },
  _category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
});

const Pet = model('Pet', petSchema);
const Category = model('Category', categorySchema);
const Variant = model('Variant', variantSchema);

module.exports = {
  Pet,
  Category,
  Variant,
};