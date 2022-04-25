var router = require('express').Router();
var AuthController = require('../controllers/auth.controller');
const refreshTokens = [];
router.post('/auth/register', AuthController.Register);
router.post('/auth/login', AuthController.Login);
router.post('/auth/logout', (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(token => t !== token);

    res.send("Logout successful");
});
module.exports = router;