const {Product} = require('../models/product');

const getAllProducts = async (req, res) => {

  const {page = 1, limit = 12} = req.query;

  try {
    const result = await Product.paginate({}, {page, limit});
    res.json(result);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAllProducts,
};