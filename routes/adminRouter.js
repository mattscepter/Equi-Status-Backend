const router = require('express').Router();


const adminController=require('../controllers/adminCtrl.js');


router.post("/sign-up",
    adminController.register
  );


router.post("/login",
    adminController.login
  );

router.post('/logout', adminController.logout)

router.post('/refresh_token', adminController.generateAccessToken)

module.exports=router;