const router = require('express').Router();
const equipmentCtrl=require('../controllers/equipmentCtrl');
const auth=require('../middleware/auth');
const upload=require("../lib/multer");



router.post('/items/add',auth,upload,equipmentCtrl.addItem);
router.delete('/items/delete/:id',auth,equipmentCtrl.deleteItem);
router.get('/items/:id',equipmentCtrl.getItem);
router.get('/items',equipmentCtrl.getAll);
router.put('/items/update/:id',auth,upload,equipmentCtrl.update);
router.get('/getImage/:id',equipmentCtrl.getImage);







module.exports=router;