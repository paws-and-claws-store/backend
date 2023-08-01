const {Router} = require("express");
const router = Router();

const ctrlProducts = require('../../controllers/products');

router.get('/', ctrlProducts.getAllProducts);

router.get('/pets/:onePet', ctrlProducts.getProductsByPet);

router.get('/categories/:oneCategory', ctrlProducts.getProductsByCategory);

router.get('/product_types/:oneProductType', ctrlProducts.getProductsByTypeProduct);

router.get('/:oneProduct', ctrlProducts.getProductDetails);

module.exports = router;
