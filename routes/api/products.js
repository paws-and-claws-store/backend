const {Router} = require("express");
const router = Router();

const ctrlProducts = require('../../controllers/products');

router.get('/', ctrlProducts.getAllProducts);

module.exports = router