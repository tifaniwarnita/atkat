(function () {
    'use strict';
    var mysql = require('mysql');

    // Creates MySql database connection
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "12345",
        database: "atkat"
    });

    angular.module('atkatApp')
        .service('dbService', ['$q', dbService]);

    function dbService($q) {

        return {
            getATK: getATK,
            insertATK: insertATK,
            deleteATK: deleteATK,
            getPemakai: getPemakai,
            insertPemakai: insertPemakai
        };

        function getATK() {
          var deferred = $q.defer();
          var query = "SELECT * FROM t_master_atk";
          connection.query(query, function (err, rows) {
             if (err) deferred.reject(err);
             deferred.resolve(rows);
          });
          return deferred.promise;
        }

        function insertATK(newatk) {
          var deferred = $q.defer();
          var query = "INSERT INTO t_master_atk SET ?";
          connection.query(query, newatk, function (err, res) {
              if (err) deferred.reject(err);
              deferred.resolve(res.insertId);
          });
          return deferred.promise;
        }

        function deleteATK(id) {
          var deferred = $q.defer();
          var query = "DELETE FROM t_master_atk WHERE id = ?";
          connection.query(query, [id], function (err, res) {
              if (err) deferred.reject(err);
              deferred.resolve(res.affectedRows);
          });
          return deferred.promise;
        }

        function getPemakai() {
          var deferred = $q.defer();
          var query = "SELECT * FROM t_master_pemakai";
          connection.query(query, function (err, rows) {
             if (err) deferred.reject(err);
             deferred.resolve(rows);
          });
          return deferred.promise;
        }

        function insertPemakai(newpemakai) {
          var deferred = $q.defer();
          var query = "INSERT INTO t_master_pemakai SET ?";
          connection.query(query, newpemakai, function (err, res) {
              if (err) deferred.reject(err);
              deferred.resolve(res.insertId);
          });
          return deferred.promise;
        }
     }
})();
