const { Schema, model } = require('mongoose');

const categorieSchema = new Schema({
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
  },
  id_pet: {
    type: Schema.Types.ObjectId,
    ref: 'pet',
  },
});

const Categorie = model('category', categorieSchema);

module.exports = Categorie;
