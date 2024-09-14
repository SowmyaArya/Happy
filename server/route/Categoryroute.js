const upload = require('../Middleware/Upload');
const express = require('express');
const router = express.Router();

const { AddCategory, Getcategory, UpdateCategory, DeleteCategory } = require('../controller/Categorycontroller');

router.post('/AddCategory', upload.single('category_image'), AddCategory);
router.get('/GetCategory', Getcategory);
router.put('/UpdateCategory/:id', UpdateCategory);
router.delete('/DeleteCategory/:id', DeleteCategory);

module.exports = router;
