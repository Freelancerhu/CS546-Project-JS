var express = require('express');
var router = express.Router();
var Cart = require("../data/cart");

router.get('/checkout', isLoggedIn, function(req, res, next){
  console.log("aaa");
  if(!req.session.cart){
    return res.redirect('/shopping-cart');
  }
  var cart =new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg})
});

router.post('/checkout', isLoggedIn, function(req, res, next){
    console.log("a");
    if(!req.session.cart){
      return res.redirect('/shopping-cart');
    }
    var cart =new Cart(req.session.cart);
    req.session.cart = null;
    res.redirect('/')
    // var stripe = require("stripe")(
    //   "sk_test_OK8iUCjvbtOYItHGJTMPZjWv"
    // );
    
    // stripe.charges.create({
    //   amount: cart.totalPrice * 100,
    //   currency: "usd",
    //   source: req.body.stripeToken,
    //   description: "Test Charge"
    // }, function(err, charge) {
    //     if(err) {
    //       req.flash('error', err.message);
    //       return res.redirect('/checkout');
    //     }
    //     var order = new Order({
    //       user: req.user,
    //       cart: cart,
    //       address: req.body.address,
    //       name: req.body.name,
    //       paymentId: charge.id,
    //     });
    //     order.save(function(err, result) {
    //       req.flash('success', 'Successfully bought product!');
    //       req.session.cart = null;
    //       res.redirect('/')
    //     });
        
    // });

    
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/user/signin');
}

function notLoggedIn(req, res, next){
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

module.exports = router;