const {Product} = require('../models/product');
const {compileCards, ctrlErrorHandler} = require('../helpers');

// const getAllProducts = async (req, res) => {
//
//   const {page = 1, limit = 12} = req.query;
//
//   try {
//     const result = await Product.paginate({}, {page, limit});
//     res.json(result);
//   } catch (err) {
//     throw new Error(err);
//   }
// };

const getAllProducts = async (req, res) => {
  const result = await Product.find();
  console.log(result);
  const data = [];
  // result.forEach((item) => {
  //   for (const itemKey in item) {
  //     console.log(itemKey);
  //   }
  // });
  res.json(data);
};

// const getHomeProducts = async (req, res) => {
//   try {
//     const result = await Product.find();
//     res.json(compileCards(result, 12));
//   } catch (err) {
//     throw new Error(err);
//   }
// };

const getHomeProducts = async (req, res) => {
  try {
    const result = await Product
      .find({}, {min_sale: 0})
      .sort({min_sale: 1})
      .limit(12);
    res.json(result);
  } catch (err) {
    throw new Error(err);
  }
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
  getHomeProducts,
  getProductsByPet,
  getProductsByCategory,
  getProductsByTypeProduct,
  getProductDetails,
};