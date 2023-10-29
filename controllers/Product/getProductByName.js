const { Product } = require("../../models/product");
const { FindByNameOrBrandSchema } = require("../../models/product");
const { HttpError, pagination } = require("../../helpers");

const getProductByName = async (req, res) => {
  const { productName, brand, page = 1 } = req.query;

  const validationResult = FindByNameOrBrandSchema.validate(req.query);

  if (validationResult.error) {
    throw HttpError(400, validationResult.error);
  }
  const productNameLower = productName ? productName.toLowerCase() : undefined;
  const brandLower = brand ? brand.toLowerCase() : undefined;

  // const result = await Product.find({
  //   $or: [
  //     { productName: productNameLower && new RegExp(productNameLower, "i") },
  //     { brand: brandLower && new RegExp(brandLower, "i") },
  //   ],
  // });

  const results = await pagination({
    Model: Product,
    page: Number(page),
    filter: {
      $or: [
        { productName: productNameLower && new RegExp(productNameLower, "i") },
        { brand: brandLower && new RegExp(brandLower, "i") },
      ],
    },
    collectionLinks: ["_pet", "_category", "_variant", "_country"],
  });

  res.json({
    code: 200,
    ...results,
  });
};

module.exports = getProductByName;
