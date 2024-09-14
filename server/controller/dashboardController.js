const UserModel = require('../model/user_model'); // Adjust the path as needed
const RecipeModel = require('../model/recipe_model'); // Adjust the path as needed
const SuggestionModel = require('../model/Suggestion_model'); // Adjust the path as needed

// Get total count of users
const getTotalUsers = async (req, res) => {
  try {
    const count = await UserModel.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users count', error });
  }
};

// Get total count of recipes
const getTotalRecipes = async (req, res) => {
  try {
    const count = await RecipeModel.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes count', error });
  }
};

// Get count of new recipes created today
const getNewRecipesToday = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const count = await RecipeModel.countDocuments({
      createdAt: { $gte: startOfDay, $lte: endOfDay }
    });

    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching new recipes count', error });
  }
};

// Get total count of suggestions
const getTotalSuggestions = async (req, res) => {
  try {
    const count = await SuggestionModel.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching suggestions count', error });
  }
};

module.exports = {
  getTotalUsers,
  getTotalRecipes,
  getNewRecipesToday,
  getTotalSuggestions
};
