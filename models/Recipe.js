const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    category: { type: String, required: true },
    preparation: { type: String },
    time: { type: String },
    cookingTime: { type: String },
    servings: { type: String },
    user: { type: String }
});
const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
