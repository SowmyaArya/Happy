const express = require('express');
const router =express.Router();


const {Useradd,Getuser,DeleteUser,Updateuser,Login,Userreg,logout,getUserCount} = require('../controller/usercontroller');

router.post('/Useradd' , Useradd);
router.get('/Getuser' , Getuser);
router.get('/getUserCount' , getUserCount);
router.delete('/DeleteUser/:id', DeleteUser);
router.put('/Updateuser/:id',Updateuser);
router.post('/Login',Login);
router.post('/Userreg',Userreg);
router.post('/logout',logout);


module.exports=router;


// router.post('/Login',(req,res) =>{
//     res.send('login success');
// });
// router.post('/Userreg',(req,res) =>{
//     res.send('Register success');
// });