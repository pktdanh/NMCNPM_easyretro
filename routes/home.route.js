const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/',(req,res)=>{
    res.render('home',{
        user: req.user ? req.user._doc : null,
    });
    layout: false;
})

module.exports = router
