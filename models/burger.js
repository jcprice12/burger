var orm = require("../config/orm.js");

//burger model
var burger = {

    //get all burgers and their toppings
    getBurgers: function() {
        var promise = new Promise(function(resolve, reject){
            orm.selectAllManyToMany("Burgers", "Toppings", "BurgersToppings", "idBurgers", "nameToppings", ["idBurgers", "comments", "date", "devoured", "eatenDate"], "toppings")
            .then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        });
        return promise;
    },

    //devour a burger (update devour and eaten by columns)
    devourBurger: function(idBurgers) {
        var promise = new Promise(function(resolve, reject){
            var burgerObj = {
                "idBurgers" : idBurgers,
                "eatenDate" : new Date().toISOString().slice(0, 19).replace('T', ' '),
                "devoured" : true,
            }
            orm.updateFieldOnId("Burgers", burgerObj, "idBurgers", idBurgers)
            .then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        });
        return promise;
    },

    //create (insert) a burger and toppings
    createBurger: function(burgerObj, toppings) {
        var promise = new Promise(function(resolve, reject){
            orm.insertOneManyToMany("Burgers", burgerObj, "BurgersToppings", "idBurgers", "nameToppings", toppings)
            .then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        });
        return promise;
    },
};
  
  // Export the database functions for the controller.
  module.exports = burger;