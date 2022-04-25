var router = require('express').Router();
var UserController = require('../controllers/user.controller');
var middleware = require('../middleware/verifyJwtToken')
router.get('/users', middleware.verifyToken, UserController.findAll);
router.get('/user/:id', UserController.findById);
router.get('/auth/profile', middleware.verifyToken, UserController.Me);
router.post('/user/store', UserController.Store);
router.put('/user/:id', UserController.Update);
router.delete('/user/:id', UserController.Delete);
module.exports = router;
