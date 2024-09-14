const upload = require('../Middleware/Upload');
const express = require('express');
const router = express.Router();

const { Recipeadd, Getrecipe, getRecipesByCategoryId, Deleterecipe, UpdateRecipe,GetRecipeById } = require('../controller/recipecontroller');

router.post('/Recipeadd', upload.single('recipe_image'), Recipeadd);
router.get('/Getrecipe', Getrecipe);
router.delete('/Deleterecipe/:id', Deleterecipe);
router.put('/UpdateRecipe/:id', UpdateRecipe);
router.get('/category/:categoryId', getRecipesByCategoryId);
router.get('/recipe/:recipeId', GetRecipeById);
// router.get('/recipe/category/:categoryId', async (req, res) => {
//   try {
//     const recipes = await Recipe.find({ categoryId: req.params.categoryId });
//     if (!recipes) {
//       return res.status(404).json({ message: 'No recipes found for this category.' });
//     }
//     res.json(recipes);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error.' });
//   }
// });

module.exports = router;
