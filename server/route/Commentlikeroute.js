const express = require('express');
const { addCommentLike } = require('../controller/Commentlikecontroller');
const router = express.Router();

router.post('/like', addCommentLike);

module.exports = router;
