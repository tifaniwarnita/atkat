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
            getATKByID: getATKByID,
            insertATK: insertATK,
            deleteATK: deleteATK,
            editATK: editATK,
            getPemakai: getPemakai,
            insertPemakai: insertPemakai,
            getPenyuplai: getPenyuplai,
            insertPenyuplai: insertPenyuplai,
            getPemakaian: getPemakaian,
            getPemakaianByID: getPemakaianByID,
            insertPemakaian: insertPemakaian,
            editPemakaian: editPemakaian,
            deletePemakaian: deletePemakaian
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

        function getATKByID(id) {
          var deferred = $q.defer();
          var query = "SELECT * FROM t_master_atk WHERE id = ?";
          connection.query(query, [id], function (err, rows) {
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

        function editATK(editatk) {
          var deferred = $q.defer();
           var query = "UPDATE t_master_atk SET jenis = ?, nama=?, stok=?, satuan=? WHERE id = ?";
           connection.query(query, [editatk.jenis, editatk.nama, editatk.stok, editatk.satuan, editatk.id], function (err, res) {
               if (err) deferred.reject(err);
               deferred.resolve(res);
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

        function getPenyuplai() {
          var deferred = $q.defer();
          var query = "SELECT * FROM t_master_penyuplai";
          connection.query(query, function (err, rows) {
             if (err) deferred.reject(err);
             deferred.resolve(rows);
          });
          return deferred.promise;
        }

        function insertPenyuplai(newpenyuplai) {
          var deferred = $q.defer();
          var query = "INSERT INTO t_master_penyuplai SET ?";
          connection.query(query, newpenyuplai, function (err, res) {
              if (err) deferred.reject(err);
              deferred.resolve(res.insertId);
          });
          return deferred.promise;
        }

        function getPemakaian() {
          var deferred = $q.defer();
          var query = "SELECT t_trans_pemakaian.id AS id, tanggal, pemakai, jenis, nama, jumlah, satuan FROM t_trans_pemakaian INNER JOIN t_master_atk ON t_master_atk.id=t_trans_pemakaian.atk";
          connection.query(query, function (err, rows) {
             if (err) deferred.reject(err);
             deferred.resolve(rows);
          });
          return deferred.promise;
        }

        function getPemakaianByID(id) {
          var deferred = $q.defer();
          var query = "SELECT t_trans_pemakaian.id as id, tanggal, pemakai, jenis, nama, jumlah, satuan FROM t_trans_pemakaian INNER JOIN t_master_atk ON t_master_atk.id=t_trans_pemakaian.atk WHERE t_trans_pemakaian.id=?";
          connection.query(query, [id], function (err, rows) {
              if (err) deferred.reject(err);
              deferred.resolve(rows);
          });
          return deferred.promise;
        }

        function insertPemakaian(newpemakaian) {
          var deferred = $q.defer();
          var query = "INSERT INTO t_trans_pemakaian (tanggal, pemakai, atk, jumlah) VALUES (now(), ?, (select id from t_master_atk where jenis=? and nama=? limit 1), ?);";
          connection.query(query, [newpemakaian.pemakai, newpemakaian.jenis, newpemakaian.nama, newpemakaian.jumlah], function (err, res) {
              if (err) deferred.reject(err);
              deferred.resolve(res);
          });
          return deferred.promise;
        }

        function editPemakaian(editpemakaian) {
          var deferred = $q.defer();
           var query = "UPDATE t_trans_pemakaian SET pemakai=?, atk=(select id from t_master_atk where jenis=? and nama=? limit 1), jumlah=? WHERE id=?";
           connection.query(query, [editpemakaian.pemakai, editpemakaian.jenis, editpemakaian.nama, editpemakaian.jumlah, editpemakaian.id], function (err, res) {
               if (err) deferred.reject(err);
               deferred.resolve(res);
           });
           return deferred.promise;
        }

        function deletePemakaian(id) {
          var deferred = $q.defer();
          var query = "DELETE FROM t_trans_pemakaian WHERE id = ?";
          connection.query(query, [id], function (err, res) {
              if (err) deferred.reject(err);
              deferred.resolve(res.affectedRows);
          });
          return deferred.promise;
        }

    }
})();
