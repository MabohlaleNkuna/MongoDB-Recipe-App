const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    recipeName: { type: String, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    category: { type: String, required: true },
    preparation: { type: String },
    time: { type: String },
    cookingTime: { type: String },
    servings: { type: String },
    imageUrl: { type: String }, // Add the image URL field here
});

module.exports = mongoose.model('Recipe', recipeSchema);
