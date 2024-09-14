const express = require('express');
const router =express.Router();


const {Suggadd,Getsug} = require('../controller/Suggestioncontroller');

router.post('/Suggadd' , Suggadd);
router.get('/Getsug' , Getsug);
module.exports=router;