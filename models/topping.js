var orm = require("../config/orm.js");

//toppings model.
var topping = {
    //get all toppings defined
    getToppings: function() {
        var promise = new Promise(function(resolve, reject){
            orm.selectAll("Toppings", "nameToppings")
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
module.exports = topping;