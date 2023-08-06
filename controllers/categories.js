const Categorie = require('../models/categories');

const getAllCategories = async (req, res, next) => {
  try {
    const result = await Categorie.find({ id_pet: '64cef53b53f2bc3e1c80705e' });
    console.log('result:', result);

    res.json({
      data: result,
    });
  } catch (error) {
    throw new Error(err);
  }
};

module.exports = {
  getAllCategories,
};
