const {Schema, model} = require("mongoose");

const productSchema = new Schema({
  country: {
    type: String,
  },
  capital: {
    type: String,
  },
});

const Product = model('product', productSchema);

module.exports = {
  Product,
};