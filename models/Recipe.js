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
   
});

module.exports = mongoose.model('Recipe', recipeSchema);
