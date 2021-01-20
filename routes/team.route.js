const express = require('express');
const authenticate = require('../middlewares/authentication')
const router = express.Router();
const User = require('../models/user')

router.get('/', authenticate.checkAuthenticated, (req, res) => {
    res.render('vwTeam/index', {
        user: req.user ? req.user._doc : null
    });
    layout: false;
})

module.exports = router;