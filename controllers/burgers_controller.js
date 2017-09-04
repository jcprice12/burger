var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

router.get("/", function(req, res) {
    burger.getBurgers()
    .then(function(data) {
        var hbsObject = {
            burgers: data,
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    }).catch(function(err){
        console.log(err);
        var hbsObj = {
            burgers : [],
        }
        res.render("index", hbsObj);
    });
});

router.post("/", function(req, res){
    var formData = req.body;
    console.log(formData);
    burger.createBurger(burger, toppings)
    .then(function(data){
        console.log(data)
        res.redirect("/");
    }).catch(function(err){
        console.log(err);
        res.redirect("/");
    });
});

// Export routes for server.js to use.
module.exports = router;