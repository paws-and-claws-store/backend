const { ctrlErrorHandler } = require("../../helpers");

const getHomeProducts = require("./getHomeProducts");
const getAllProducts = require("./getAllProducts");
const getProductsByPet = require("./getProductsByPet");
const getProductsByCategory = require("./getProductsByCategory");
const getProductsByTypeProduct = require("./getProductsByTypeProduct");
const getProductDetails = require("./getProductDetails");
const getProductByName = require("./getProductByName");
const checkBasket = require("./checkBasket");

module.exports = {
  getHomeProducts: ctrlErrorHandler(getHomeProducts),
  getAllProducts: ctrlErrorHandler(getAllProducts),
  getProductsByPet: ctrlErrorHandler(getProductsByPet),
  getProductsByCategory: ctrlErrorHandler(getProductsByCategory),
  getProductsByTypeProduct: ctrlErrorHandler(getProductsByTypeProduct),
  getProductDetails: ctrlErrorHandler(getProductDetails),
  getProductByName: ctrlErrorHandler(getProductByName),
  checkBasket: ctrlErrorHandler(checkBasket),
};
