const express = require('express');
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/recipes', protect, createRecipe);
router.get('/recipes', protect, getAllRecipes);
router.get('/recipes/:id', protect, getRecipeById);
router.put('/recipes/:id', protect, updateRecipe);
router.delete('/recipes/:id', protect, deleteRecipe);

module.exports = router;
