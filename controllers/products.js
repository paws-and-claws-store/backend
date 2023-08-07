const {Product} = require('../models/product');
const {ctrlErrorHandler} = require('../helpers');

const getAllProducts = async (req, res) => {
  const result = await Product
    .find()
    .populate('_pet _category _variant _country');
  const data = [];

  result.forEach((card) => {
    card.items.forEach((element) => {
      const newItem = {};
      console.log(element);
      newItem._id = element._id;
      newItem.size = element.size;
      newItem.price = element.price;
      if (element.sale) {
        newItem.sale = element.sale;
      }
      newItem.count = element.count;
      newItem.productCode = element.productCode;
      newItem.productName = card.productName;
      newItem.brand = card.brand;
      newItem.shortDescription = card.shortDescription;
      newItem.fullDescription = card.fullDescription;
      newItem.ingredients = card.ingredients;
      newItem.mainImage = card.mainImage;
      newItem.images = card.images;
      newItem.reviews = card.reviews;
      newItem._pet = card._pet;
      newItem._category = card._category;
      newItem._variant = card._variant;
      newItem._country = card._country;

      data.push(newItem);
    });
  });

  res.json(data);
};

const getHomeProducts = async (req, res) => {
  const result = await Product
    .find({}, {min_sale: 0})
    .populate('_pet _category _variant _country')
    .sort({min_sale: 1})
    .limit(12);
  res.json(result);
};

const getProductsByPet = async (req, res) => {

  const {page = 1, limit = 12} = req.query;
  const {onePet} = req.params;

  try {
    const result = await Product.paginate({'pet.code': onePet}, {page, limit});
    res.json(result);
  } catch (err) {
    throw new Error(err);
  }
};

const getProductsByCategory = async (req, res) => {

  const {page = 1, limit = 12} = req.query;
  const {oneCategory} = req.params;

  try {
    const result = await Product.paginate({'category.code': oneCategory}, {page, limit});
    res.json(result);
  } catch (err) {
    throw new Error(err);
  }
};

const getProductsByTypeProduct = async (req, res) => {

  const {page = 1, limit = 12} = req.query;
  const {oneProductType} = req.params;

  try {
    const result = await Product.paginate({'productType.code': oneProductType}, {page, limit});
    res.json(result);
  } catch (err) {
    throw new Error(err);
  }
};

const getProductDetails = async (req, res, next) => {
  const {oneProduct} = req.params;

  try {
    const result = await Product.findById(oneProduct);
    res.json(result);
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  getAllProducts: ctrlErrorHandler(getAllProducts),
  getHomeProducts: ctrlErrorHandler(getHomeProducts),
  getProductsByPet,
  getProductsByCategory,
  getProductsByTypeProduct,
  getProductDetails,
};