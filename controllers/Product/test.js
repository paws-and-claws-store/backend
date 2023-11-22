const { Product } = require("../../models/product");
const { FindByNameOrBrandSchema } = require("../../models/product");
const { HttpError, pagination, sort, sortWeights } = require("../../helpers");

const test = async (req, res) => {
  const result = await Product.find();

  const results = sortWeights(result);

  switch (sortBy) {
    case "cheap":
      results.sort((a, b) => {
        if (a.items.some((el) => el.count > 0) && b.items.every((el) => el.count === 0)) {
          return -1;
        }

        if (b.items.some((el) => el.count > 0) && a.items.every((el) => el.count === 0)) {
          return 1;
        }
      });
  }

  res.json({ result });
};

module.exports = test;

//  const sortResult = result.sort((a, b) => {
//    const first = a.items.some((item) => item.count > 0);
//    const second = b.items.some((item) => item.count > 0);

//    if (first && !second) {
//      return -1;
//    }

//    if (!first && second) {
//      return 1;
//    }

//    return 0;
//  });
