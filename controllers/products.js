const {Product} = require('../models/product');

const getAllProducts = async (req, res) => {
  console.log(req.url);
  try {
    const result = await Product.find();
    res.json(result);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAllProducts,
};