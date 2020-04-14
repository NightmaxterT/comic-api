const express=require('express');
const router =express.Router();
const controller=require('../controllers/user.controller');
const middleware=require('../Middleware/authen.middle');

router.get('/Users/Register',controller.Register);
router.post('/Users/Register',controller.postRegister);
router.get('/Users/Login',controller.Login);
router.post('/Users/Login',controller.postLogin);
router.get('/Users/GetAll',controller.getAllUser);
router.get('/Users/Search/:Name',controller.searchUser);
router.post('/Users/add',controller.addUser);
router.delete('/Users/delete/:ID',controller.deleteUser);
router.patch('/Users/update',controller.updateUser);
module.exports=router;