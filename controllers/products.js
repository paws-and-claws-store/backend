const { Product } = require("../models/product");
const { ctrlErrorHandler, pagination, sortWeights, sortWeightsOne } = require("../helpers");

const { LIMIT_PAGINATION } = require("../config/consts");

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
