var orm = require("../config/orm.js");

var topping = {
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