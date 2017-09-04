var connection = require("./connection.js");

var orm = {
    selectAllManyToMany : function(table1, table2, intersectionTable, orderBy){
        var promise = new Promise(function(resolve, reject){
            var sqlStr = "SELECT *";
            sqlStr += " FROM ??";
            sqlStr += " NATURAL JOIN ??";
            sqlStr += " NATURAL JOIN ??";
            sqlStr += " ORDER BY ?";
            connection.query(sqlStr, [table1, table2, intersectionTable, orderBy], function(err, res){
                if(err){
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });

        return promise;
    },

    insertOneManyToMany : function(table1, obj1, table2, arrayOfObjs){
        var promise = new Promise(function(resolve, reject){
            connection.beginTransaction(function(errTrans){
                if(errTrans){
                    reject(errTrans);
                } else {
                    connection.query("INSERT INTO ?? SET ?", obj1, function(errIns, insRes){
                        if(errIns){
                            reject(errIns);
                        } else {
                            if(arrayOfObjs > 0){
                                reject("Array of Objects must have something in it");
                            } else {
                                var sqlStr = "INSERT INTO ?? SET ?";
                                // var keys = Object.keys(arrayOfObjs[0]);
                                // for (var i = 0; i < keys.length; i++){
                                //     if(i === (keys.length - 1)){
                                //         sqlStr += (keys[i]+ ") ");
                                //     } else {
                                //         sqlStr += (keys[i] + ",");
                                //     }
                                // }
                                connection.query(sqlStr, [table2, arrayOfObjs], function(errIns2, ins2Res){
                                    if(errIns2){
                                        reject(errIns2);
                                    } else {
                                        connection.commit(function(errCommit){
                                            if(errCommit){
                                                reject(errCommit);
                                            } else {
                                                resolve(true);
                                            }
                                        });
                                    }
                                });
                            }
                            
                        }
                    });
                }
            });
        });

        return promise;
    },
}

module.exports = orm;