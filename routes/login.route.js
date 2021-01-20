const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authentication')

module.exports = function(passport){
    router.get('/', authenticate.checkNotAuthenticated, (req, res) => {
        res.render('login')
    })

    router.post('/', authenticate.checkNotAuthenticated, passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    }), (req, res) => {
        res.redirect('/')
    })

    router.get('/logout', authenticate.checkAuthenticated, (req,res) => {
        req.logOut()
        req.session.destroy()
        res.redirect('/login')
    })

    return router
}