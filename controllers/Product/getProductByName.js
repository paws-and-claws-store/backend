const { Product } = require("../../models/product");

const getProductByName = async (req, res) => {
  const { productName, brand } = req.query;

  const result = await Product.find({
    $or: [{ productName }, { brand }],
  });

  res.json({
    code: 200,
    data: [...result],
  });
};

module.exports = getProductByName;
