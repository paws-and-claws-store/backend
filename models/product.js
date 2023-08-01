const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  productName: {
    type: String,
    required: [true, "Product name is required"],
  },
  pet: {
    ua: String,
    en: String,
    code: String,
  },
  category: {
    us: String,
    ua: String,
    code: String,
  },
  brand: {
    type: String,
    required: [true, "Brand is required"],
  },
  size: {
    type: Number,
    required: [true, "Size is required"],
  },
  price: {
    type: Number,
    required: [true, "Size is required"],
  },
  sale: {
    type: Number,
  },
  count: {
    type: Number,
    required: [true, "Count is required"],
  },
  productType: {
    type: String,
    required: [true, "Product type is required"],
  },
  shortDiscription: {
    type: String,
  },
  fullDiscription: {
    type: String,
  },
  ingredients: {
    type: String,
  },
  mainImage: {
    type: String,
  },
  images: {
    type: [String],
  },
  favorite: {
    type: Boolean,
    required: true,
    default: false,
  },
  reviews: {
    type: [String],
  },
  productCode: {
    type: String,
    unique: true,
  },
  producingCountry: {
    ua: String,
    en: String,
    code: String,
  },
});

const Product = model("product", productSchema);

module.exports = {
  Product,
};
