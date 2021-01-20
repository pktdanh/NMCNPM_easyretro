const express = require('express');
const authenticate = require('../middlewares/authentication')
const router = express.Router();
const User = require('../models/user')

router.get('/', authenticate.checkAuthenticated, (req, res) => {
    res.render('vwDashboard/index', {
        user: req.user ? req.user._doc : null
    });
    layout: false;
})
router.get('/publicboard', authenticate.checkAuthenticated, (req, res) => {
    res.render('vwpublicboard/index', {
        user: req.user ? req.user._doc : null
    });
    layout: false;
})

module.exports = router;