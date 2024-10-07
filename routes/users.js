var express = require('express');
var router = express.Router();
var controller=require('../helpers/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/addBooks',controller.addBooks)
router.post('/particularList',controller.particularList)
router.post('/booksList',controller.booksList)
router.post('/updateBooks',controller.updateBooks)
router.post('/deleteBooks',controller.deleteBooks)
router.get('/searchBooks',controller.searchBooks)

module.exports = router;
