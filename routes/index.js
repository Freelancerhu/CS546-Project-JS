var express = require('express');
var router = express.Router();
const customerRoutes = require("./customers");
const productRoutes = require("./products");

const constructorMethod = (app) => {
    app.use("/customers", customerRoutes);
    app.use("/products", productRoutes);

    app.use("/", (req, res) => {
        // res.sendStatus(404).json({error: "Not found! :("});
        res.render('test/index');
    })
};

module.exports = constructorMethod;





//get Homepage
// router.get('/', function(req, res) {
//     res.render('index');
// });


// function ensureAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     } else {
//         req.flash('error_msg', 'You are not logged in');
//         res.redirect('index');
//     }
// }