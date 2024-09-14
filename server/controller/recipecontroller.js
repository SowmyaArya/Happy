const recipeSchema = require('../model/recipe_model');

const Recipeadd = async (req, res) => {
    try {
        const { recipe_name, recipe_description, recipe_Ingredients, recipe_method, category_id, preparation_time, cook_time, total_time } = req.body;
        if (!req.file) {
            throw new Error('Recipe image is required');
        }
        const recipe_img = req.file.filename;

        const parsedIng = JSON.parse(recipe_Ingredients);
        const parsedMethod = JSON.parse(recipe_method);

        const recipedata = new recipeSchema({
            recipe_name,
            recipe_description,
            recipe_Ingredients: parsedIng,
            recipe_method: parsedMethod,
            recipe_image: recipe_img,
            category: category_id,
            preparation_time,
            cook_time,
            total_time,
        });
        
        const recipedatasave = await recipedata.save();
        res.send(recipedatasave);

    } catch (error) {
        console.error("Error in Recipeadd:", error.message);
        res.status(500).send("Server Error: " + error.message);
    }
};

const Getrecipe = async (req, res) => {
    try {
        const recipes = await recipeSchema.find().populate('category');
        res.send(recipes);
    } catch (err) {
        console.error("Error in Getrecipe:", err.message);
        res.status(500).send("Issue");
    }
};

const getRecipesByCategoryId = async (req, res) => {
    const { categoryId } = req.params;
  
    try {
      const recipes = await recipeSchema.find({ category: categoryId });
  
      if (!recipes.length) {
        console.log(`No recipes found for category ID: ${categoryId}`);
        return res.status(404).json({ message: 'No recipes found for this category' });
      }
  
      res.json(recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

const Deleterecipe = async (req, res) => {
    try {
        const recipe = await recipeSchema.findById(req.params.id);
        if (!recipe) {
            return res.status(404).send("Recipe not found");
        }
        await recipeSchema.findByIdAndDelete(req.params.id);
        res.json({ success: "Recipe Deleted", recipe });
    } catch (error) {
        console.error("Error in Deleterecipe:", error.message);
        res.status(500).send("Server Error: " + error.message);
    }
};

const UpdateRecipe = async (req, res) => {
  try {
      const { 
          recipe_name, 
          recipe_description, 
          recipe_Ingredients, 
          recipe_method, 
          category_id, 
          preparation_time, 
          cook_time, 
          total_time 
      } = req.body;

      const recipe_img = req.file ? req.file.filename : null;

      // Prepare the updated fields
      const updatedFields = {
          recipe_name,
          recipe_description,
          recipe_Ingredients: Array.isArray(recipe_Ingredients) ? recipe_Ingredients : JSON.parse(recipe_Ingredients),
          recipe_method: Array.isArray(recipe_method) ? recipe_method : JSON.parse(recipe_method),
          category: category_id,
          preparation_time,
          cook_time,
          total_time,
      };

      // Add image field if it exists
      if (recipe_img) {
          updatedFields.recipe_image = recipe_img;
      }

      const updatedRecipe = await recipeSchema.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
      res.json({ success: "Recipe updated", recipe: updatedRecipe });
  } catch (error) {
      console.error("Error in UpdateRecipe:", error.message);
      res.status(500).send("Server Error: " + error.message);
  }
};

const GetRecipeById = async (req, res) => {
    try {
      const recipe = await recipeSchema.findById(req.params.recipeId).populate('category');
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
      res.json(recipe);
    } catch (error) {
      console.error('Error fetching recipe by ID:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = { Recipeadd, Getrecipe, getRecipesByCategoryId, Deleterecipe, UpdateRecipe,GetRecipeById };
