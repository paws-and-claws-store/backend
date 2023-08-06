const {ctrlErrorHandler} = require('../helpers');
const {Pet, Category, Variant} = require('../models/structure');

const getPetsStructure = async (req, res) => {
  const result = await Pet.find();
  res.json(result);
};

const getCategoryStructure = async (req, res) => {
  const {idPet} = req.params;
  const categories = await Category.find({_pet: idPet}).populate('_pet');
  res.json(categories);
};

const getVariantStructure = async (req, res) => {
  const {idPet, idCategory} = req.params;
  const variants = await Variant.find({_pet: idPet, _category: idCategory}).populate('_pet _category');
  res.json(variants);
};

module.exports = {
  getPetsStructure: ctrlErrorHandler(getPetsStructure),
  getCategoryStructure: ctrlErrorHandler(getCategoryStructure),
  getVariantStructure: ctrlErrorHandler(getVariantStructure),
};