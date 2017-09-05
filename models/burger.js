var orm = require("../config/orm.js");

var burger = {
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
    createBurger: function(burger, toppings) {
        var promise = new Promise(function(resolve, reject){
            orm.insertOneManyToMany("Burgers", burger, "BurgersToppings", toppings)
            .then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(data);
            });
        });
        return promise;
    },
};
  
  // Export the database functions for the controller.
  module.exports = burger;