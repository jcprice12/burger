var express = require("express");

var router = express.Router();

// Import models
var burger = require("../models/burger.js");
var topping = require("../models/topping.js");

function formatBurgers(burgersToppings){
    for(var i = 0; i < burgersToppings.length; i++){
        var toppings = burgersToppings[i].toppings;
        var toppingsArr = toppings.split(',');
        toppings = [];
        for(var j = 0; j < toppingsArr.length; j++){
            var toppingObj = {
                "nameToppings" : toppingsArr[j],
            }
            toppings.push(toppingObj);
        }
        burgersToppings[i].toppings = toppings;
    }
    return burgersToppings;
}

router.get("/", function(req, res) {
    var promises = [];
    promises.push(burger.getBurgers());
    promises.push(topping.getToppings());
    Promise.all(promises).then(function(result){
        var myBurgers = formatBurgers(result[0]);
        var hbsObject = {
            burgers: myBurgers,
            toppings : result[1],
        }
        console.log(hbsObject);
        res.render("index", hbsObject);
    }, function(err){
        console.log(err);
        res.status(500).send("Error on the server while getting toppings and burgers. Please try again later");
    });
});

router.put("/:id", function(req, res) {
    var id = req.params.id;
    burger.devourBurger(id)
    .then(function(data){
        console.log(data);
        res.redirect("/");
    }).catch(function(err){
        console.log(err);
        res.status(500).send("Error updating burger with id: " + id);
    });
})

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