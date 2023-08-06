const { Router } = require('express');
const router = Router();

const ctrlCategories = require('../../controllers/categories');

router.get('/', () => console.log('Categories'));
// router.get('/allCategories', (req, res) => {
//   res.json({
//     text: 'Category',
//   });
// });
router.get('/allCategories', ctrlCategories.getAllCategories);

module.exports = router;
