var router = require('express').Router();
var TutorialController = require('../controllers/tutorial.controller')
var verification = require('../middleware/verifyJwtToken');
router.get('/tutorials', [verification.verifyToken], TutorialController.findAll)
router.get('/tutorial/:id', TutorialController.findById)
router.post('/tutorial/store', TutorialController.Store)
router.delete('/tutorial/:id', TutorialController.Delete)
router.put('/tutorial/:id', TutorialController.Update);
router.get('/all', TutorialController.findAll)
module.exports = router;