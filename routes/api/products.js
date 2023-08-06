const {Router} = require("express");
const router = Router();

const ctrlProducts = require('../../controllers/products');

// const compileProductCard = (arr, n) => {
//
//   console.log(arr);
//
//   return arr;
// }

// router.get('/', ctrlProducts.getAllProducts);

// Перелік продуктів на стартову сторінку
router.get('/', ctrlProducts.getHomeProducts);

// Перелік всіх продуктів для кожної ваги окремо
router.get('/allItems', ctrlProducts.getAllProducts);

router.get('/pets/:onePet', ctrlProducts.getProductsByPet);

router.get('/categories/:oneCategory', ctrlProducts.getProductsByCategory);

router.get('/product_types/:oneProductType', ctrlProducts.getProductsByTypeProduct);

router.get('/:oneProduct', ctrlProducts.getProductDetails);

module.exports = router;
