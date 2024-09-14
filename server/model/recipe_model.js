const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  recipe_name: {
    type: String,
  },
  recipe_description: {
    type: String,
  },
  recipe_Ingredients:[],
  recipe_method:[],
  recipe_image: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
  },
  preparation_time:{
    type: String,
  },
  cook_time:{
    type: String,
  },
  total_time:{
    type: String,
  },

});

module.exports = mongoose.model("recipe", recipeSchema);
