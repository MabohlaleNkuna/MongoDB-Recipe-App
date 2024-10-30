const Recipe = require('../models/Recipe.js');

// Create a new recipe
const createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create({ ...req.body, user: req.user._id });
    console.log(recipe)

    res.status(201).json(recipe);
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message });
  }
};

// Get all recipes for the logged-in user with pagination
const getAllRecipes = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const recipes = await Recipe.find({ user: req.user._id })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const count = await Recipe.countDocuments({ user: req.user._id });
    res.json({
      recipes,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a recipe by ID, but only if it belongs to the logged-in user
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ _id: req.params.id, user: req.user._id });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a recipe by ID, but only if it belongs to the logged-in user
const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { ...req.body },
      { new: true }
    );
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found or you are not authorized to update it' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a recipe by ID, but only if it belongs to the logged-in user
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found or you are not authorized to delete it' });
    }
    res.json({ message: 'Recipe removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
