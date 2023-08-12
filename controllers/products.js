const {Product} = require('../models/product');
const {ctrlErrorHandler, pagination, sortWeights, sortWeightsOne} = require('../helpers');

const {LIMIT_PAGINATION} = require('../config/consts');

/*const getAllProducts = async (req, res) => {
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
};*/

const getHomeProducts = async (req, res) => {
  const result = await Product
    .find({}, {min_sale: 0})
    .populate('_pet _category _variant _country')
    .sort({min_sale: 1})
    .limit(LIMIT_PAGINATION);

  res.json(sortWeights(result));
};

const getAllProducts = async (req, res) => {
  const {page = 1} = req.query;

  const result = await pagination({
    Model: Product,
    page: Number(page),
    collectionLinks: ['_pet', '_category', '_variant', '_country'],
  });

  res.json({...result, docs: sortWeights(result.docs)});
};

const getProductsByPet = async (req, res) => {
  const {page = 1} = req.query;
  const {idPet} = req.params;

  const result = await pagination({
    Model: Product,
    page: Number(page),
    filter: {_pet: idPet},
    collectionLinks: ['_pet', '_category', '_variant', '_country'],
  });

  res.json({...result, docs: sortWeights(result.docs)});
};

const getProductsByCategory = async (req, res) => {
  const {page = 1} = req.query;
  const {idCategory} = req.params;

  const result = await pagination({
    Model: Product,
    page: Number(page),
    filter: {_category: idCategory},
    collectionLinks: ['_pet', '_category', '_variant', '_country'],
  });

  res.json({...result, docs: sortWeights(result.docs)});
};

const getProductsByTypeProduct = async (req, res) => {
  const {page = 1} = req.query;
  const {idVariant} = req.params;

  const result = await pagination({
    Model: Product,
    page: Number(page),
    filter: {_variant: idVariant},
    collectionLinks: ['_pet', '_category', '_variant', '_country'],
  });

  res.json({...result, docs: sortWeights(result.docs)});
};

const getProductDetails = async (req, res) => {
  const {idProduct} = req.params;

  const result = await Product
    .findById(idProduct, '-min_sale')
    .populate('_pet _category _variant _country');
    
  res.json(sortWeightsOne(result));
}

module.exports = {
  getAllProducts: ctrlErrorHandler(getAllProducts),
  getHomeProducts: ctrlErrorHandler(getHomeProducts),
  getProductsByPet: ctrlErrorHandler(getProductsByPet),
  getProductsByCategory: ctrlErrorHandler(getProductsByCategory),
  getProductsByTypeProduct: ctrlErrorHandler(getProductsByTypeProduct),
  getProductDetails: ctrlErrorHandler(getProductDetails),
};