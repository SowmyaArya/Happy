const express = require('express');
const router = express.Router();
const dashboardController = require('../controller/dashboardController');

router.get('/user/count', dashboardController.getTotalUsers);
router.get('/recipe/count', dashboardController.getTotalRecipes);
router.get('/recipe/newToday', dashboardController.getNewRecipesToday);
router.get('/suggestion/count', dashboardController.getTotalSuggestions);

module.exports = router;
