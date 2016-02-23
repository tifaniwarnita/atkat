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
            getAllJenisATK: getAllJenisATK,
            getNamaATKByJenis: getNamaATKByJenis,
            changeStokATK: changeStokATK,
            getPemakai: getPemakai,
            getPemakaiByID: getPemakaiByID,
            insertPemakai: insertPemakai,
            editPemakai: editPemakai,
            deletePemakai: deletePemakai,
            getPenyuplai: getPenyuplai,
            getPenyuplaiByID: getPenyuplaiByID,
            getAllNamaPenyuplai: getAllNamaPenyuplai,
            insertPenyuplai: insertPenyuplai,
            editPenyuplai: editPenyuplai,
            deletePenyuplai: deletePenyuplai,
            getPemakaian: getPemakaian,
            getPemakaianByID: getPemakaianByID,
            insertPemakaian: insertPemakaian,
            editPemakaian: editPemakaian,
            deletePemakaian: deletePemakaian,
            getBooking: getBooking,
            getBookingByID: getBookingByID,
            insertBooking: insertBooking,
            deleteBooking: deleteBooking,
            editBooking: editBooking,
            getPengadaan: getPengadaan,
            insertPengadaan: insertPengadaan,
            getStatistikPerPeriode: getStatistikPerPeriode,
            getStatistikPerPeriodePerPemakai: getStatistikPerPeriodePerPemakai,
            getPengadaanByID: getPengadaanByID,
            insertPengadaan: insertPengadaan,
            editPengadaan: editPengadaan,
            deletePengadaan: deletePengadaan,
            getStockATK: getStockATK,
            getStockAlreadyBooked: getStockAlreadyBooked,
            getPenyuplaiByParam: getPenyuplaiByParam,
            getATKByParam: getATKByParam,
            getJenisPemakai: getJenisPemakai,
            getPemakaiByJenis: getPemakaiByJenis,
            getStokMinimumBulan: getStokMinimumBulan,
            getStatistikPerPeriodeByJenisATK: getStatistikPerPeriodeByJenisATK
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

        function getAllJenisATK() {
          var deferred = $q.defer();
          var query = "SELECT DISTINCT jenis FROM t_master_atk";
          connection.query(query, function (err, rows) {
             if (err) deferred.reject(err);
             deferred.resolve(rows);
          });
          return deferred.promise;
        }


        function getNamaATKByJenis(jenis) {
          var deferred = $q.defer();
          var query = "SELECT nama FROM t_master_atk WHERE jenis=?";
          connection.query(query, [jenis], function (err, rows) {
             if (err) deferred.reject(err);
             deferred.resolve(rows);
          });
          return deferred.promise;
        }

        function changeStokATK(jumlah, jenis, nama) {
          var deferred = $q.defer();
          var query = "UPDATE t_master_atk SET stok = stok+? WHERE jenis=? AND nama=?";
          connection.query(query, [jumlah, jenis, nama], function (err, res) {
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

        function getPemakaiByID(id) {
          var deferred = $q.defer();
          var query = "SELECT * FROM t_master_pemakai WHERE id = ?";
          connection.query(query, [id], function (err, rows) {
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

        function deletePemakai(id) {
          var deferred = $q.defer();
          var query = "DELETE FROM t_master_pemakai WHERE id = ?";
          connection.query(query, [id], function (err, res) {
              if (err) deferred.reject(err);
              deferred.resolve(res.affectedRows);
          });
          return deferred.promise;
        }

        function editPemakai(editpemakai) {
          var deferred = $q.defer();
           var query = "UPDATE t_master_pemakai SET id=?, nama=?, jenis=? WHERE id = ?";
           connection.query(query, [editpemakai.id, editpemakai.nama, editpemakai.jenis, editpemakai.id], function (err, res) {
               if (err) deferred.reject(err);
               deferred.resolve(res);
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

        function getPenyuplaiByID(id) {
          var deferred = $q.defer();
          var query = "SELECT * FROM t_master_penyuplai WHERE id = ?";
          connection.query(query, [id], function (err, rows) {
              if (err) deferred.reject(err);
              deferred.resolve(rows);
          });
          return deferred.promise;
        }

        function getAllNamaPenyuplai() {
          var deferred = $q.defer();
          var query = "SELECT DISTINCT nama FROM t_master_penyuplai";
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

        function deletePenyuplai(id) {
          var deferred = $q.defer();
          var query = "DELETE FROM t_master_penyuplai WHERE id = ?";
          connection.query(query, [id], function (err, res) {
              if (err) deferred.reject(err);
              deferred.resolve(res.affectedRows);
          });
          return deferred.promise;
        }

        function editPenyuplai(editpenyuplai) {
          var deferred = $q.defer();
           var query = "UPDATE t_master_penyuplai SET id=?, nama=?, kontak=?, alamat=? WHERE id = ?";
           connection.query(query, [editpenyuplai.id, editpenyuplai.nama, editpenyuplai.kontak, editpenyuplai.alamat, editpenyuplai.id], function (err, res) {
               if (err) deferred.reject(err);
               deferred.resolve(res);
           });
           return deferred.promise;
        }

        function getPemakaian() {
          var deferred = $q.defer();
          var query = "SELECT t_trans_pemakaian.id AS id, DATE_FORMAT(tanggal,'%d %b %Y | %H:%i') AS tanggal, pemakai, jenis, nama, jumlah, satuan FROM t_trans_pemakaian INNER JOIN t_master_atk ON t_master_atk.id=t_trans_pemakaian.atk";
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

        function getBooking() {
          var deferred = $q.defer();
          var query = "SELECT t_trans_booking.id AS id, DATE_FORMAT(tanggal_pesan,'%d %b %Y | %H:%i') AS tanggal_pesan, DATE_FORMAT(tanggal_pakai,'%d %b %Y | %H:%i') AS tanggal_pakai, pemakai, jenis, nama, jumlah, satuan FROM t_trans_booking INNER JOIN t_master_atk ON t_master_atk.id=t_trans_booking.atk";
          connection.query(query, function (err, rows) {
             if (err) deferred.reject(err);
             deferred.resolve(rows);
          });
          return deferred.promise;
        }

        function getBookingByID(id) {
          var deferred = $q.defer();
          var query = "SELECT t_trans_booking.id as id, DATE_FORMAT(tanggal_pakai, '%Y/%m/%d %H:%i') AS tanggal_pakai, DATE_FORMAT(tanggal_pakai,'%Y/%m/%d') AS datepakai, DATE_FORMAT(tanggal_pakai,'%H:%i') AS timepakai, pemakai, jenis, nama, jumlah, satuan FROM t_trans_booking INNER JOIN t_master_atk ON t_master_atk.id=t_trans_booking.atk WHERE t_trans_booking.id=?";
          connection.query(query, [id], function (err, rows) {
              if (err) deferred.reject(err);
              deferred.resolve(rows);
          });
          return deferred.promise;
        }

        function insertBooking(newbooking) {
          var deferred = $q.defer();
          var query = "INSERT INTO t_trans_booking (tanggal_pesan, tanggal_pakai, pemakai, atk, jumlah) VALUES (now(), ?, ?, (select id from t_master_atk where jenis=? and nama=? limit 1), ?);";
          connection.query(query, [newbooking.tanggal_pakai, newbooking.pemakai, newbooking.jenis, newbooking.nama, newbooking.jumlah], function (err, res) {
              if (err) deferred.reject(err);
              deferred.resolve(res);
          });
          return deferred.promise;
        }

        function editBooking(editbooking) {
          var deferred = $q.defer();
           var query = "UPDATE t_trans_booking SET tanggal_pakai=?, pemakai=?, atk=(select id from t_master_atk where jenis=? and nama=? limit 1), jumlah=? WHERE id=?";
           connection.query(query, [editbooking.tanggal_pakai, editbooking.pemakai, editbooking.jenis, editbooking.nama, editbooking.jumlah, editbooking.id], function (err, res) {
               if (err) deferred.reject(err);
               deferred.resolve(res);
           });
           return deferred.promise;
        }

        function deleteBooking(id) {
          var deferred = $q.defer();
          var query = "DELETE FROM t_trans_booking WHERE id = ?";
          connection.query(query, [id], function (err, res) {
              if (err) deferred.reject(err);
              deferred.resolve(res.affectedRows);
          });
          return deferred.promise;
        }

        function getPengadaan() {
          var deferred = $q.defer();
          var query = "SELECT t_trans_pengadaan.id AS id, DATE_FORMAT(tanggal_pesan,'%d %b %Y | %H:%i') AS tanggal_pesan, DATE_FORMAT(tanggal_datang,'%d %b %Y | %H:%i') AS tanggal_datang, t_master_penyuplai.nama AS nama_penyuplai, t_master_atk.jenis AS jenis, t_master_atk.nama AS nama, jumlah, satuan FROM t_trans_pengadaan INNER JOIN t_master_atk ON t_master_atk.id=t_trans_pengadaan.atk INNER JOIN t_master_penyuplai ON t_master_penyuplai.id = t_trans_pengadaan.penyuplai";
          connection.query(query, function (err, rows) {
             if (err) deferred.reject(err);
             deferred.resolve(rows);
          });
          return deferred.promise;
        }

        function getPengadaanByID(id) {
          var deferred = $q.defer();
          var query = "SELECT t_trans_pengadaan.id AS id, DATE_FORMAT(tanggal_pesan, '%Y/%m/%d') as datepesan, DATE_FORMAT(tanggal_datang, '%Y/%m/%d %H:%i') AS tanggal_datang, DATE_FORMAT(tanggal_datang,'%Y/%m/%d') AS datedatang, DATE_FORMAT(tanggal_datang,'%H:%i') AS timedatang, t_master_penyuplai.nama AS nama_penyuplai, t_master_atk.jenis AS jenis, t_master_atk.nama AS nama, jumlah, satuan FROM t_trans_pengadaan INNER JOIN t_master_atk ON t_master_atk.id=t_trans_pengadaan.atk INNER JOIN t_master_penyuplai ON t_master_penyuplai.id = t_trans_pengadaan.penyuplai WHERE t_trans_pengadaan.id=?";
          connection.query(query, [id], function (err, rows) {
             if (err) deferred.reject(err);
             deferred.resolve(rows);
          });
          return deferred.promise;
        }

        function insertPengadaan(newpengadaan) {
          var deferred = $q.defer();
          var query = "INSERT INTO t_trans_pengadaan (tanggal_pesan, penyuplai, atk, jumlah) VALUES (now(), (select id from t_master_penyuplai where nama=? limit 1), (select id from t_master_atk where jenis=? and nama=? limit 1), ?);";
          connection.query(query, [newpengadaan.nama_penyuplai, newpengadaan.jenis, newpengadaan.nama, newpengadaan.jumlah], function (err, res) {
              if (err) deferred.reject(err);
              deferred.resolve(res);
          });
          return deferred.promise;
        }

        function editPengadaan(editpengadaan) {
          var deferred = $q.defer();
           var query = "UPDATE t_trans_pengadaan SET tanggal_datang=?, penyuplai=(select id from t_master_penyuplai where nama=? limit 1), atk=(select id from t_master_atk where jenis=? and nama=? limit 1), jumlah=? WHERE id=?";
           connection.query(query, [editpengadaan.tanggal_datang, editpengadaan.nama_penyuplai, editpengadaan.jenis, editpengadaan.nama, editpengadaan.jumlah, editpengadaan.id], function (err, res) {
               if (err) deferred.reject(err);
               deferred.resolve(res);
           });
           return deferred.promise;
        }

        function deletePengadaan(id) {
          var deferred = $q.defer();
          var query = "DELETE FROM t_trans_pengadaan WHERE id = ?";
          connection.query(query, [id], function (err, res) {
              if (err) deferred.reject(err);
              deferred.resolve(res.affectedRows);
          });
          return deferred.promise;
        }

        function getStockATK(jenis, nama){
          var deferred = $q.defer();
          var query = "SELECT stok FROM t_master_atk WHERE jenis = ? AND nama = ?";
          connection.query(query, [jenis, nama], function(err, rows){
            if(err) deferred.reject(err);
            deferred.resolve(rows);
          });
          return deferred.promise;
        }

        function getStockAlreadyBooked(){
          var deferred = $q.defer();
          var query = "SELECT SUM(jumlah) FROM t_trans_booking WHERE CURDATE() = DATE(tanggal_pakai) AND tanggal_pakai >= now()";
          connection.query(query, function(err, rows){
            if(err) deferred.reject(err);
            deferred.resolve(err);
            });
          return deferred.promise;
        }

        function getPenyuplaiByParam(nama, kontak, alamat){
          var deferred = $q.defer();
          var query = "SELECT * FROM t_master_penyuplai WHERE nama = ? AND kontak = ? AND alamat = ?";
          connection.query(query, [nama, kontak, alamat], function(err, rows){
            if(err) deferred.reject(err);
            deferred.resolve(err);
          });
          return deferred.promise;
        }

        function getATKByParam(jenis, nama){
          var deferred = $q.defer();
          var query = "SELECT * FROM t_master_atk WHERE jenis = ? AND nama = ?";
          connection.query(query, [jenis, nama_penyuplai], function(err, rows){
            if(err) deferred.reject(err)
              deferred.resolve(err);
          });
          return deferred.promise;
        }

        function getStatistikPerPeriode() {
          var deferred = $q.defer();
          var query = "SELECT jenis, (UNIX_TIMESTAMP(tanggal)*1000) as tanggal, jumlah, satuan FROM t_trans_pemakaian JOIN t_master_atk ON t_trans_pemakaian.atk = t_master_atk.id ORDER BY jenis, tanggal;"
          connection.query(query, function (err, rows) {
             if (err) deferred.reject(err);
             deferred.resolve(rows);
          });
          return deferred.promise;
        }

        function getStatistikPerPeriodePerPemakai(jenis, nama) {
          var deferred = $q.defer();
          if (jenis === "Semua") {
            var query = "SELECT t_master_atk.jenis, (UNIX_TIMESTAMP(tanggal)*1000) as tanggal, jumlah, satuan FROM t_trans_pemakaian JOIN t_master_atk ON t_trans_pemakaian.atk = t_master_atk.id JOIN t_master_pemakai ON t_trans_pemakaian.pemakai = t_master_pemakai.id ORDER BY t_master_atk.jenis, tanggal;"
            connection.query(query, function (err, rows) {
               if (err) deferred.reject(err);
               deferred.resolve(rows);
            });
          } else if (nama === "Semua") {
            var query = "SELECT t_master_atk.jenis, (UNIX_TIMESTAMP(tanggal)*1000) as tanggal, jumlah, satuan FROM t_trans_pemakaian JOIN t_master_atk ON t_trans_pemakaian.atk = t_master_atk.id JOIN t_master_pemakai ON t_trans_pemakaian.pemakai = t_master_pemakai.id WHERE t_master_pemakai.jenis = ? ORDER BY t_master_atk.jenis, tanggal;"
            connection.query(query, [jenis], function (err, rows) {
               if (err) deferred.reject(err);
               deferred.resolve(rows);
            });
          } else {
            var query = "SELECT t_master_atk.jenis, (UNIX_TIMESTAMP(tanggal)*1000) as tanggal, jumlah, satuan FROM t_trans_pemakaian JOIN t_master_atk ON t_trans_pemakaian.atk = t_master_atk.id JOIN t_master_pemakai ON t_trans_pemakaian.pemakai = t_master_pemakai.id WHERE t_master_pemakai.jenis = ? AND t_master_pemakai.nama = ? ORDER BY t_master_atk.jenis, tanggal;"
            connection.query(query, [jenis, nama], function (err, rows) {
               if (err) deferred.reject(err);
               deferred.resolve(rows);
            });
          }
          return deferred.promise;
        }

        function getJenisPemakai() {
          var deferred = $q.defer();
          var query = "SELECT DISTINCT jenis FROM t_master_pemakai"
          connection.query(query, function (err, rows) {
             if (err) deferred.reject(err);
             deferred.resolve(rows);
          });
          return deferred.promise;
        }

        function getPemakaiByJenis(jenis) {
          var deferred = $q.defer();
          var query = "SELECT nama FROM t_master_pemakai WHERE jenis = ? ORDER BY nama";
          connection.query(query, [jenis], function (err, rows) {
             if (err) deferred.reject(err);
             deferred.resolve(rows);
          });
          return deferred.promise;
        }

        function getStokMinimumBulan() {
          var deferred = $q.defer();
          var query = "SELECT jenis, nama, MAX(dailysum) AS stokmin, satuan FROM (SELECT jenis, nama, SUM(jumlah) AS dailysum, satuan FROM t_trans_pemakaian INNER JOIN t_master_atk ON t_trans_pemakaian.atk=t_master_atk.id WHERE MONTH(tanggal) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH) GROUP BY DATE(tanggal), jenis, nama) AS T GROUP BY jenis, nama;"
          connection.query(query, function (err, rows) {
             if (err) deferred.reject(err);
             deferred.resolve(rows);
          });
          return deferred.promise;
        }

        function getStokMinimumTahun() {
          alert("dbservicestokmin");
          var deferred = $q.defer();
          var query = "SELECT jenis, nama, MAX(dailysum) AS stokmin, satuan FROM (SELECT jenis, nama, SUM(jumlah) AS dailysum, satuan FROM t_trans_pemakaian INNER JOIN t_master_atk ON t_trans_pemakaian.atk=t_master_atk.id WHERE YEAR(tanggal) = YEAR(CURRENT_DATE - INTERVAL 1 YEAR) GROUP BY DATE(tanggal), jenis, nama) AS T GROUP BY jenis, nama;"
          connection.query(query, function (err, rows) {
             if (err) deferred.reject(err);
             deferred.resolve(rows);
          });
          return deferred.promise;
        }

        function getStatistikPerPeriodeByJenisATK(jenis) {
          var deferred = $q.defer();
          var query = "SELECT nama, (UNIX_TIMESTAMP(tanggal)*1000) as tanggal, jumlah, satuan FROM t_trans_pemakaian JOIN t_master_atk ON t_trans_pemakaian.atk = t_master_atk.id WHERE t_master_atk.jenis = ? ORDER BY jenis, tanggal;"
          connection.query(query, [jenis], function (err, rows) {
             if (err) deferred.reject(err);
             deferred.resolve(rows);
          });
          return deferred.promise;
        }
    }
})();
