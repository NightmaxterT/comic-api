const express=require('express');
const router =express.Router();
const controller=require('../controllers/comic.controller');
const middleware=require('../Middleware/authen.middle');

router.get('/Comics/GetAll',controller.GetAll);
router.get('/Comics/Search/:name',middleware.authen,controller.SearchByName);
router.get('/Comics/Pagination/:page',middleware.authen,controller.Pagination);
router.get('/',middleware.authen,controller.Pagination);
router.get('/Comics/Follow/:page',middleware.authen,controller.Follow);
router.get('/Comics/:name',middleware.authen,controller.infoComic);
router.get('/Comics/:name/:number',middleware.authen,controller.readComic);
router.get('/Comics/Search/:name',controller.SearchByName);
router.get('/Comics/SearchAdvanced/:values',controller.searchByAll);
router.post('/Comics/add',controller.addComic);
router.delete('/Comics/delete/:Name',controller.deteleComic);
router.patch('/Comics/patch',controller.updateComic)
module.exports=router;