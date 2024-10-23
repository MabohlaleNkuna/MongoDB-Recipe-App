// routes/recipeRoutes.js
const express = require('express');
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipeController');

const router = express.Router();

router.post('/recipes', createRecipe);
router.post('/recipes/bulk', createMultipleRecipes);
router.get('/recipes', getAllRecipes);
router.get('/recipes/:id', getRecipeById);
router.put('/recipes/:id', updateRecipe);
router.delete('/recipes/:id', deleteRecipe);

module.exports = router;
