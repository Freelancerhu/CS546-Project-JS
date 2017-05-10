var express = require('express');
var router = express.Router();
const data = require("../data");
const customerData = data.customers;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


//register
router.get('/register', function(req, res) {
    res.render('test/register');
});

//test page
router.get('/123', function(req, res) {
    res.render('test/123');
});

//login
router.get('/login', function(req, res) {
    res.render('test/login');
});

//Register Customer
router.post('/register', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var gender = req.body.gender;
    var phoneNumb = req.body.phoneNumb;
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var zipCode = req.body.zipCode;
    var security = req.body.security;
    var answer = req.body.answer;

    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords not match').equals(req.body.password);


    var errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        })
    } else {
        var newCustomer = {
            email: email,
            password: password,
        };

        customerData.addUser(newCustomer).then((err, info) => {
            if (err) throw err;
        });

        req.flash('success_msg', 'You are registered');
        res.redirect('/customers/login');

    }
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    customerData.getUserByEmail(username, function(err, user) {
        if (err) throw err;
        if (!user) {
            return done(null, false, {message: 'Unkown Email'});
        }

        customerData.comparePassword(password, user.password, function(err, isMatch) {
            if (err) throw err;
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Invalid Password'});
            } 
        }) 
    }) 
  }));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


router.post('/login',
    passport.authenticate('local', {successRedirect:'/customers/123', failureRedirect:'/customers/login', failureFlash: true}),
    function(req, res) {
        res.redirect('/');
    });

router.get('/logout', function(req, res) {
    req.logout();

    req.flash('success_msg', 'You are loggede out!');
    res.redirect('/customers/login');
})



module.exports = router;