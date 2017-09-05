var connection = require("./connection.js");

//A query helper to be used by my models
//Every query returns a promise
var orm = {

    //simple select * and order by
    selectAll : function(table, orderBy){
        var promise = new Promise(function(resolve, reject){
            connection.query("SELECT * FROM ?? ORDER BY ??", [table,orderBy], function(err, res){
                if(err){
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
        return promise;
    },

    //select all of one table that has a many to many relationship with another table. concats chosen column of second table into string separated by commas
    selectAllManyToMany : function(table1, table2, intersectionTable, table1Id, table2Id, cols, arrayIdentifier){
        var promise = new Promise(function(resolve, reject){
            var sqlStr = "SELECT";
            sqlStr += " " + cols.toString() + ",";
            sqlStr += " GROUP_CONCAT(?? SEPARATOR ',') AS ??"
            sqlStr += " FROM ??";
            sqlStr += " NATURAL JOIN ??";
            sqlStr += " NATURAL JOIN ??";
            sqlStr += " GROUP BY ??";
            sqlStr += " ORDER BY ??";
            connection.query(sqlStr, [table2Id, arrayIdentifier, table1, table2, intersectionTable, table1Id, table1Id], function(err, res){
                if(err){
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
        return promise;
    },

    //misnomer. Can update multiple fiels as specified by the update info object. updates by id (or certain where condition)
    updateFieldOnId : function(table, updateInfo, idColumn, id){
        var promise = new Promise(function(resolve, reject){
            connection.beginTransaction(function(errCommit){
                if(errCommit){
                    connection.rollback(function(){
                        reject(errCommit);
                    });
                } else {
                    connection.query("UPDATE ?? SET ? WHERE ?? = ?", [table, updateInfo, idColumn, id], function(errUpdate, updateRes){
                        if(errUpdate){
                            connection.rollback(function(){
                                reject(errUpdate);
                            });
                        } else {
                            connection.commit(function(errCommit){
                                if(errCommit){
                                    connection.rollback(function(){
                                        reject(errCommit);
                                    });
                                } else {
                                    resolve(updateRes);
                                }
                            });
                        }
                    });
                }
            });
        });
        return promise;
    },

    //for when you are only inserting on one side of the many to many relationship and you have to insert new records into the junction table
    insertOneManyToMany : function(table1, obj1, junctionTable, table1ForeignKeyName, table2ForeignKeyName, arrayOfInserts){
        var promise = new Promise(function(resolve, reject){
            connection.beginTransaction(function(errTrans){
                if(errTrans){
                    connection.rollback(function(){
                        reject(errTrans);
                    });
                } else {
                    connection.query("INSERT INTO ?? SET ?", [table1, obj1], function(errIns, insRes){
                        if(errIns){
                            connection.rollback(function(){
                                reject(errIns);
                            });
                        } else {
                            if(arrayOfInserts > 0){
                                connection.rollback(function(){
                                    reject("Array of inserts must have something in it");
                                });
                            } else {
                                for(var i = 0; i < arrayOfInserts.length; i++){
                                    arrayOfInserts[i].push(insRes.insertId);
                                }
                                var sqlStr = "INSERT INTO ?? (??,??) VALUES ?";
                                connection.query(sqlStr, [junctionTable, table2ForeignKeyName, table1ForeignKeyName, arrayOfInserts], function(errIns2, ins2Res){
                                    if(errIns2){
                                        connection.rollback(function(){
                                            reject(errIns2);
                                        });
                                    } else {
                                        connection.commit(function(errCommit){
                                            if(errCommit){
                                                connection.rollback(function(){
                                                    reject(errCommit);
                                                });
                                            } else {
                                                resolve(ins2Res);
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