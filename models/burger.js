var orm = require("../config/orm.js");

var burger = {
    getBurgers: function() {
        var promise = new Promise(function(resolve, reject){
            orm.selectAllManyToMany("Burgers", "Toppings", "BurgersToppings", "idBurgers")
            .then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        });
        return promise;
    },
    // The variables cols and vals are arrays.
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