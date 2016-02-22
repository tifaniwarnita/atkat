 var atkatApp = angular.module('atkatApp', ['ngRoute', 'highcharts-ng']);
 atkatApp.config(['$routeProvider', function($routeProvider) {
       $routeProvider
           .when('/', {
             templateUrl : 'atk.html',
             controller  : 'atkController'
           })
           .when('/atk', {
             templateUrl : 'atk.html',
             controller  : 'atkController'
           })
           .when('/pemakai', {
               templateUrl : 'pemakai.html',
               controller  : 'pemakaiController'
           })
           .when('/penyuplai', {
               templateUrl : 'penyuplai.html',
               controller  : 'penyuplaiController'
           })
           .when('/pemakaian', {
               templateUrl : 'pemakaian.html',
               controller  : 'pemakaianController'
           })
           .when('/booking', {
               templateUrl : 'booking.html',
               controller  : 'bookingController'
           })
           .when('/pengadaan', {
               templateUrl : 'pengadaan.html',
               controller  : 'pengadaanController'
           })
           .when('/statperiode', {
               templateUrl : 'statistik-per-periode.html',
               controller  : 'statistikPerPeriodeController'
           })
           .when('/statpemakai', {
               templateUrl : 'statistik-per-pemakai.html',
               controller  : 'statistikPerPemakai'
           })
           .when('/stokminimum', {
                templateUrl : 'stok-minimum.html',
                controller  : 'stokMinimumController'
           });

   }]);

atkatApp.controller('stokMinimumController', ['$scope', 'dbService', '$q', function($scope, dbService, $q) {
  $scope.selected = 'bulan';
  getStokMinimumBulan();

  function getStokMinimumBulan() {
    dbService.getStokMinimumBulan().then(function(response) {
      $scope.stokminatk = response;
      $scope.tabletitle = "Stok Minimum ATK Berdasarkan Pemakaian Bulan Lalu";
    });
  }

  function getStokMinimumTahun() {
    $scope.tabletitle = "Stok Minimum ATK Berdasarkan Pemakaian Tahun Lalu";
    $scope.stokminatk = null;
    dbService.getStokMinimumTahun().then(function(response) {
      $scope.stokminatk = response;
    });
  }

  $scope.selectPeriode = function() {
    if ($scope.selected == 'bulan') {
      getStokMinimumBulan();
    } else {
      getStokMinimumTahun();
    }
  }

  $('#sidebar-menu a').parent('li').removeClass('current-page').parent('ul').parent().removeClass('active');
  $('#sidebar-menu a[href="#stokminimum"]').parent('li').addClass('current-page').parent('ul').parent().addClass('active');
}]);

 atkatApp.controller('statistikPerPeriodeController', ['$scope', 'dbService', '$q', function($scope, dbService, $q) {
   var drawHighcharts = function(data, arrayJenis) {
     var Highcharts = require('highcharts/highstock');
     require('highcharts/modules/exporting')(Highcharts);

     // Create the chart
     Highcharts.StockChart('container', {
       chart: {
         events: {
           load: function() {
             type: 'line'
           }
         }
       },
       exporting: {
            buttons: {
                contextButton: {
                    symbol: 'circle'
                }
            }
        },
       legend: {
           enabled: true,
           align: 'right',
           backgroundColor: '#FCFFC5',
           borderColor: 'black',
           borderWidth: 2,
           layout: 'vertical',
           verticalAlign: 'top',
           y: 100,
           shadow: true
       },
       rangeSelector : {
         allButtonsEnabled: true,
         buttons: [{
             type: 'month',
             count: 3,
             text: 'Hari',
             dataGrouping: {
                 forced: true,
                 units: [['day', [1]]]
             }
         }, {
             type: 'year',
             count: 1,
             text: 'Minggu',
             dataGrouping: {
                 forced: true,
                 units: [['week', [1]]]
             }
         }, {
             type: 'all',
             text: 'Bulan',
             dataGrouping: {
                 forced: true,
                 units: [['month', [1]]]
             }
         }, {
             type: 'year',
             text: 'Tahun',
             dataGrouping: {
                 forced: true,
                 units: [['year', [1]]]
             }
         }, {
             type: 'all',
             text: 'Semua',
             dataGrouping: {
                 forced: true,
                 units: [['all', [1]]]
             }
         }],

         buttonTheme: {
             width: 60
         },
         selected: 0
       },
       title: {
           text: 'Statistik ATK per Periode'
       },
       subtitle: {
         text: 'Data statistik ATK dengan rincian per periode'
       },
       series: data,
       xAxis: {
         categories: arrayJenis
       },
       yAxis: {
         title: {
             categories: 'Fruit eaten'
           }
       },
     });
   }

   var drawStatistikATK = function() {
     if ($scope.selectedjenisbarang === "Semua") {
       dbService.getStatistikPerPeriode().then(function(dataStatistik) {
         var len = dataStatistik.length;
         var i, j = -1, lastJenis = "";
         var data = []; // array of series
         var arrayJenis = [];
         for (i = 0; i < len; i++) {
           if (lastJenis === dataStatistik[i]["jenis"]) {
             data[j]["data"].push([dataStatistik[i]["tanggal"], dataStatistik[i]["jumlah"]]);
           } else {
             lastJenis = dataStatistik[i]["jenis"];
             arrayJenis.push(dataStatistik[i]["jenis"]);
             var newData = {
               "type"         : 'column',
               "name"         : dataStatistik[i]["jenis"],
               "data"         : [[dataStatistik[i]["tanggal"], dataStatistik[i]["jumlah"]]],
               "dataGrouping" : {
                                    units: [[
                                        'week', // unit name
                                        [1] // allowed multiples
                                    ], [
                                        'month',
                                        [1, 2, 3, 4, 6]
                                    ], [
                                        'year',
                                        null
                                    ]]
                                }
             } //object
             data.push(newData);
             j++;
           }
         }
         drawHighcharts(data, arrayJenis);
       });
     } else {
       dbService.getStatistikPerPeriodeByJenisATK($scope.selectedjenisbarang).then(function(dataStatistik) {
         var len = dataStatistik.length;
         var i, j = -1, lastnama = "";
         var data = []; // array of series
         var arraynama = [];
         for (i = 0; i < len; i++) {
           if (lastnama === dataStatistik[i]["nama"]) {
             data[j]["data"].push([dataStatistik[i]["tanggal"], dataStatistik[i]["jumlah"]]);
           } else {
             lastnama = dataStatistik[i]["nama"];
             arraynama.push(dataStatistik[i]["nama"]);
             var newData = {
               "type"         : 'column',
               "name"         : dataStatistik[i]["nama"],
               "data"         : [[dataStatistik[i]["tanggal"], dataStatistik[i]["jumlah"]]],
               "dataGrouping" : {
                                    units: [[
                                        'week', // unit name
                                        [1] // allowed multiples
                                    ], [
                                        'month',
                                        [1, 2, 3, 4, 6]
                                    ], [
                                        'year',
                                        null
                                    ]]
                                }
             } //object
             data.push(newData);
             j++;
           }
         }
         if (len==0) {
            alert("Tidak ada data pemakaian untuk jenis barang " + $scope.selectedjenisbarang);
         }
         drawHighcharts(data, arraynama);
       });
     }
   }

   $scope.jenisChanged = function() {
     drawStatistikATK();
   }

    dbService.getAllJenisATK().then(function(response) {
      var arrinit = [{"nama" : "Semua", "jenis" : "Semua"}];
      var jenisarr = arrinit.concat(response);
      $scope.jenisbarang = jenisarr;
      $scope.selectedjenisbarang = jenisarr[0]["jenis"];
      drawStatistikATK();
    });


 }]);

 atkatApp.controller('statistikPerPemakai', ['$scope', 'dbService','$q', function($scope, dbService, $q) {
   var drawTable = function() {
     dbService.getStatistikPerPeriodePerPemakai($scope.selectedjenis, $scope.selectedpemakai).then(function(dataStatistik) {
       var len = dataStatistik.length;
       var i, j = -1, lastJenis = "";
       var data = []; // array of series
       var arrayJenis = [];
       for (i = 0; i < len; i++) {
         if (lastJenis === dataStatistik[i]["jenis"]) {
           data[j]["data"].push([dataStatistik[i]["tanggal"], dataStatistik[i]["jumlah"]]);
         } else {
           lastJenis = dataStatistik[i]["jenis"];
           arrayJenis.push(dataStatistik[i]["jenis"]);
           var newData = {
             "type"         : 'column',
             "name"         : dataStatistik[i]["jenis"],
             "data"         : [[dataStatistik[i]["tanggal"], dataStatistik[i]["jumlah"]]],
             "dataGrouping" : {
                                  units: [[
                                      'week', // unit name
                                      [1] // allowed multiples
                                  ], [
                                      'month',
                                      [1, 2, 3, 4, 6]
                                  ], [
                                      'year',
                                      null
                                  ]]
                              }
           } //object
           data.push(newData);
           j++;
         }
       }
       console.log(data);

       var judulstatistik;
       var subjudulstatistik;

       if ($scope.selectedjenis === "Semua") {
         judulstatistik = "Statistik Pemakaian untuk Semua Pemakai";
         //subjudulstatistik = "Data statistik seluruh pemakaian oleh semua pemakai";
       } else if ($scope.selectedpemakai === "Semua") {
         judulstatistik = "Statistik Pemakaian untuk Pemakai dengan Kategori " + $scope.selectedjenis;
         //subjudulstatistik = "Data statistik pemakaian "
       } else {
         judulstatistik = "Statistik Pemakaian untuk Pemakai bernama " + $scope.selectedpemakai;
       }

       if (len==0) { //No data
        alert("Tidak ada data pemakaian untuk " + $scope.selectedpemakai);
       } //Highcharts beraksi
          var Highcharts = require('highcharts/highstock');
          require('highcharts/modules/exporting')(Highcharts);

          // Create the chart
          Highcharts.StockChart('container', {
            chart: {
              events: {
                load: function() {
                  type: 'line'
                }
              }
            },
            legend: {
                enabled: true,
                align: 'right',
                backgroundColor: '#FCFFC5',
                borderColor: 'black',
                borderWidth: 2,
                layout: 'vertical',
                verticalAlign: 'top',
                y: 100,
                shadow: true
            },
            rangeSelector : {
              allButtonsEnabled: true,
              buttons: [{
                  type: 'month',
                  count: 3,
                  text: 'Hari',
                  dataGrouping: {
                      forced: true,
                      units: [['day', [1]]]
                  }
              }, {
                  type: 'year',
                  count: 1,
                  text: 'Minggu',
                  dataGrouping: {
                      forced: true,
                      units: [['week', [1]]]
                  }
              }, {
                  type: 'all',
                  text: 'Bulan',
                  dataGrouping: {
                      forced: true,
                      units: [['month', [1]]]
                  }
              }, {
                  type: 'year',
                  text: 'Tahun',
                  dataGrouping: {
                      forced: true,
                      units: [['year', [1]]]
                  }
              }, {
                  type: 'all',
                  text: 'Semua',
                  dataGrouping: {
                      forced: true,
                      units: [['all', [1]]]
                  }
              }],

              buttonTheme: {
                  width: 60
              },
              selected: 0
            },
            title: {
                text: judulstatistik
            },
            series: data,
          });
     });
   }

   dbService.getJenisPemakai().then(function(response) {
     var arrinit = [{"nama" : "Semua", "jenis" : "Semua"}];
     var jenisarr = arrinit.concat(response);
     $scope.jenispemakai = jenisarr;
     $scope.selectedjenis = jenisarr[0]["jenis"];

     dbService.getPemakaiByJenis($scope.selectedjenis).then(function(response) {
       var pemakaiarr = arrinit.concat(response);
       $scope.namapemakai = pemakaiarr;
       $scope.selectedpemakai = pemakaiarr[0]["nama"];
     });
     drawTable();
   });

     $scope.pemakaiChanged = function() {
       dbService.getJenisPemakai().then(function(response) {
         var arrinit = [{"nama" : "Semua", "jenis" : "Semua"}];
         var jenisarr = arrinit.concat(response);
         $scope.jenispemakai = jenisarr;

         dbService.getPemakaiByJenis($scope.selectedjenis).then(function(response) {
           var pemakaiarr = arrinit.concat(response);
           $scope.namapemakai = pemakaiarr;
         });
         drawTable();
       });
     }
 }]);

 atkatApp.controller('atkController', ['$scope', 'dbService','$q', function($scope, dbService, $q) {
    getAllATK();
    function getAllATK() {
     dbService.getATK().then(function (response) {
       $scope.atk = response;
     });
    }
    $scope.predicate = 'jenis';
    $scope.reverse = false;
    $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };

    $scope.initEditATK = function (id) {
      dbService.getATKByID(id).then(function (response) {
        $scope.editatk = response[0];
      });
    }

    function validasiATK(jenis, nama){
      var jenisATK, namaATK;
      dbService.getgetATKByParam(jenis, nama).then(function(response){
        jenisATK = response[0].jenis;
        namaATK - response[0].nama;

        if(jenisATK == jenis && namaATK == nama){
          return true;
        }
        else{
          return false;
        }
      });
    }

    $scope.createATK = function (newatk) {
      //if(!validasiATK(newatk.jenis, newatk.nama)){
        dbService.insertATK(newatk).then(function (response) {
          alert("Data ATK baru berhasil ditambahkan");
          getAllATK();
        });
      /*}
      else{
        alert("Jenis dan nama ATK sudah tersedia");
      }*/
    }

    $scope.editATK = function() {
      dbService.editATK($scope.editatk).then(function (response) {
        alert("Data ATK berhasil diubah");
        getAllATK();
      })
    }

    $scope.deleteATK = function (id) {
      var r = confirm("Apakah Anda yakin ingin menghapus data ini?");
      if (r) {
        dbService.deleteATK(id).then(function (response) {
          getAllATK();
        });
      }
    }

    // add active to menu
    $('#sidebar-menu a').parent('li').removeClass('current-page').parent('ul').parent().removeClass('active');
    $('#sidebar-menu a[href="#atk"]').parent('li').addClass('current-page').parent('ul').parent().addClass('active');

 }]);

 atkatApp.controller('pemakaiController', ['$scope', 'dbService','$q', function($scope, dbService, $q) {
    getAllPemakai();
    function getAllPemakai() {
     dbService.getPemakai().then(function (response) {
       $scope.pemakai = response;
     });
    }

    $scope.predicate = 'id';
    $scope.reverse = false;
    $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };

    $scope.getPemakaiByID = function (id) {
      dbService.getPemakaiByID(id).then(function (response) {
        $scope.editpemakai = response[0];
      });
    }

    $scope.createPemakai = function (newpemakai) {
      dbService.insertPemakai(newpemakai).then(function (response) {
        alert("Data pemakai baru berhasil ditambahkan");
        getAllPemakai();
      });
    }

    $scope.editPemakai = function() {
      dbService.editPemakai($scope.editpemakai).then(function (response) {
        alert("Data pemakai berhasil diubah");
        getAllPemakai();
      })
    }

    $scope.deletePemakai = function (id) {
      var r = confirm("Apakah Anda yakin ingin menghapus data ini?");
      if (r) {
        dbService.deletePemakai(id).then(function (response) {
          getAllPemakai();
        });
      }
    }

    // add active to menu
    $('#sidebar-menu a').parent('li').removeClass('current-page').parent('ul').parent().removeClass('active');
    $('#sidebar-menu a[href="#pemakai"]').parent('li').addClass('current-page').parent('ul').parent().addClass('active');
 }]);

  atkatApp.controller('penyuplaiController', ['$scope', 'dbService','$q', function($scope, dbService, $q) {
    getAllPenyuplai();
    function getAllPenyuplai() {
     dbService.getPenyuplai().then(function (response) {
       $scope.penyuplai = response;
     });
    }

    $scope.predicate = 'nama';
    $scope.reverse = false;
    $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };

    $scope.getPenyuplaiByID = function (id) {
      dbService.getPenyuplaiByID(id).then(function (response) {
        $scope.editpenyuplai = response[0];
      });
    }

    function validasiPenyuplai(nama, kontak, alamat){
      var namaPenyuplai, kontakPenyuplai, alamatPenyuplai;
      dbService.getPenyuplaiByParam(nama, kontak, alamat).then(function(response){
        namaPenyuplai = reponse[0].nama;
        kontakPenyuplai = response[0].kontak;
        alamatPenyuplai = response[0].alamat;

        if(namaPenyuplai == nama && kontakPenyuplai == kontak && alamatPenyuplai == alamat){
          return true;
        }
        else
          return false;
      });
    }

    $scope.createPenyuplai = function (newpenyuplai) {
      //if(!validasiPenyuplai(newpenyuplai.nama, newpenyuplai.kontak, newpenyuplai.alamat)){
        dbService.insertPenyuplai(newpenyuplai).then(function (response) {
          alert("Data penyuplai baru berhasil ditambahkan");
          getAllPenyuplai();
        });
      /*}
      else{
        alert("Penyuplai sudah tersimpan dalam database");
      }*/
    }

    $scope.editPenyuplai = function() {
      dbService.editPenyuplai($scope.editpenyuplai).then(function (response) {
        alert("Data penyuplai berhasil diubah");
        getAllPenyuplai();
      })
    }

    $scope.deletePenyuplai = function (id) {
      var r = confirm("Apakah Anda yakin ingin menghapus data ini?");
      if (r) {
        dbService.deletePenyuplai(id).then(function (response) {
          getAllPenyuplai();
        });
      }
    }

    // add active to menu
    $('#sidebar-menu a').parent('li').removeClass('current-page').parent('ul').parent().removeClass('active');
    $('#sidebar-menu a[href="#penyuplai"]').parent('li').addClass('current-page').parent('ul').parent().addClass('active');
 }]);

atkatApp.controller('pemakaianController', ['$scope', 'dbService','$q', function($scope, dbService, $q) {
    getAllPemakaian();
    getAllJenis();
    var jumlah_awal = 0;

    function getAllPemakaian() {
     dbService.getPemakaian().then(function (response) {
       $scope.pemakaian = response;
     });
    }

    function getAllJenis() {
    dbService.getAllJenisATK().then(function(response) {
        $scope.jenisbarang = response;
      });
    }

    $scope.predicate = 'tanggal';
    $scope.reverse = true;
    $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };

    $scope.initEditPemakaian = function (id) {
      dbService.getPemakaianByID(id).then(function (response) {
        $scope.editpemakaian = response[0];
        jumlah_awal = $scope.editpemakaian.jumlah;
        dbService.getNamaATKByJenis($scope.editpemakaian.jenis).then(function (response) {
          $scope.namabarang_edit = response;
        });
      });
    }

    function validasiStock(jenis, nama, jumlah){
      var stokATK, stockAlreadyBooked;
      dbService.getStockATK(jenis, nama).then(function(response){
        stokATK = response[0];
        dbService.getStockAlreadyBooked().then(function(response){
          stockAlreadyBooked = response[0];
          if(stokATK-stockAlreadyBooked >= jumlah)
            return true;
          else
            return false;
        });
      });
    }

    function validasiPemakai(id){
      var pemakai;
      dbService.getPemakaiByID(id).then(function(response){
        pemakai = response[0];

        if(id == pemakai.id)
          return true;
        else
          return false;
      });
    }

    $scope.createPemakaian = function (newpemakaian) {
      /*if(!validasiPemakai(newpemakaian.pemakai)){
        alert("Pemakai tidak ada di daftar pemakai");
      }
      else if(!validasiStock(newpemakaian.jenis, newpemakaian.nama, namapemakaian.jumlah)){
        alert("Stock untuk pemakaian tidak mencukupi");
      }
      else{*/
        dbService.insertPemakaian(newpemakaian).then(function (response) {
        });
        dbService.changeStokATK(-newpemakaian.jumlah, newpemakaian.jenis, newpemakaian.nama).then(function (response) {
          getAllPemakaian();
          alert("Data berhasil ditambahkan");
        });
      /*}
      else{
        alert("Stock untuk pemakaian tidak mencukupi");
      }*/
    }

    $scope.editPemakaian = function() {
      dbService.editPemakaian($scope.editpemakaian).then(function (response) {
      });
      dbService.changeStokATK(jumlah_awal-$scope.editpemakaian.jumlah, $scope.editpemakaian.jenis, $scope.editpemakaian.nama).then(function (response) {
        getAllPemakaian();
        alert("Data pemakaian berhasil diubah");
      });
    }

    $scope.deletePemakaian = function (id) {
      var r = confirm("Apakah Anda yakin ingin menghapus data ini?");
      if (r) {
        dbService.deletePemakaian(id).then(function (response) {
          getAllPemakaian();
        });
      }
    }

    $scope.jenisChanged = function() {
      dbService.getNamaATKByJenis($scope.newpemakaian.jenis).then(function (response) {
        $scope.namabarang = response;
      });
    }

    $scope.jenisChangedEdit = function() {
      dbService.getNamaATKByJenis($scope.editpemakaian.jenis).then(function (response) {
        $scope.namabarang_edit = response;
      });
    }

    // add active to menu
    $('#sidebar-menu a').parent('li').removeClass('current-page').parent('ul').parent().removeClass('active');
    $('#sidebar-menu a[href="#pemakaian"]').parent('li').addClass('current-page').parent('ul').parent().addClass('active');
 }]);

 atkatApp.controller('bookingController', ['$scope', 'dbService','$q', function($scope, dbService, $q) {
    getAllBooking();
    getAllJenis();
    $('#tanggal_pakai_picker').datetimepicker({
    });

    function getAllBooking() {
     dbService.getBooking().then(function (response) {
       $scope.booking = response;
     });
    }

    function getAllJenis() {
    dbService.getAllJenisATK().then(function(response) {
        $scope.jenisbarang = response;
      });
    }

    $scope.predicate = 'tanggal_pesan';
    $scope.reverse = true;
    $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };

    $scope.initEditBooking = function (id) {
      dbService.getBookingByID(id).then(function (response) {
        $scope.editbooking = response[0];
        $('#tanggal_pakai_edit').datetimepicker({
          defaultDate: $scope.editbooking.datepakai,
          defaultTime: $scope.editbooking.timepakai,
        });
        dbService.getNamaATKByJenis($scope.editbooking.jenis).then(function (response) {
          $scope.namabarang_edit = response;
        });
      });
    }

    function validasiBooking(bookdate){
      if(DATEDIFF(now() - bookdate) >= 1)
        return true;
      else
        return false;
    }

    $scope.createBooking = function (newbooking) {
      /*if(validasiBooking(newbooking.tanggal_pakai)){*/
        dbService.insertBooking(newbooking).then(function (response) {
          alert("Data booking baru berhasil ditambahkan");
          getAllBooking();
        });
      /*}
      else{
        alert("Booking paling cepat 1 hari dari sekarang");
      }*/
    }

    $scope.editBooking = function() {
      dbService.editBooking($scope.editbooking).then(function (response) {
        alert("Data booking berhasil diubah");
        getAllBooking();
      });
    }

    $scope.deleteBooking = function (id) {
      var r = confirm("Apakah Anda yakin ingin menghapus data ini?");
      if (r) {
        dbService.deleteBooking(id).then(function (response) {
          getAllBooking();
        });
      }
    }

    $scope.jenisChanged = function() {
      dbService.getNamaATKByJenis($scope.newbooking.jenis).then(function (response) {
        $scope.namabarang = response;
      });
    }

    $scope.jenisChangedEdit = function() {
      dbService.getNamaATKByJenis($scope.editbooking.jenis).then(function (response) {
        $scope.namabarang_edit = response;
      });
    }

    // add active to menu
    $('#sidebar-menu a').parent('li').removeClass('current-page').parent('ul').parent().removeClass('active');
    $('#sidebar-menu a[href="#booking"]').parent('li').addClass('current-page').parent('ul').parent().addClass('active');
 }]);

atkatApp.controller('pengadaanController', ['$scope', 'dbService','$q', function($scope, dbService, $q) {
    getAllPengadaan();
    getAllJenis();
    getAllNamaPenyuplai();
    var jumlah_awal = 0;

    function getAllPengadaan() {
     dbService.getPengadaan().then(function (response) {
       $scope.pengadaan = response;
     });
    }

    function getAllJenis() {
    dbService.getAllJenisATK().then(function(response) {
        $scope.jenisbarang = response;
      });
    }

    function getAllNamaPenyuplai() {
    dbService.getAllNamaPenyuplai().then(function(response) {
        $scope.namapenyuplai = response;
      });
    }

    $scope.predicate = 'tanggal_pesan';
    $scope.reverse = true;
    $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };

    $scope.initEditPengadaan = function (id) {
      dbService.getPengadaanByID(id).then(function (response) {
        $scope.editpengadaan = response[0];
        jumlah_awal = $scope.editpengadaan.jumlah;
        if ($scope.editpengadaan.tanggal_datang !== null) {
        $('#tanggal_datang_edit').datetimepicker({
            defaultDate: $scope.editpengadaan.datedatang,
            defaultTime: $scope.editpengadaan.timedatang,
        });
      } else {
        $('#tanggal_datang_edit').datetimepicker({
        });
      }
        dbService.getNamaATKByJenis($scope.editpengadaan.jenis).then(function (response) {
          $scope.namabarang_edit = response;
        });
      });
    }

    function validasiPengadaan(tanggal_datang, tanggal_pesan){
      if(tanggal_datang > tanggal_pesan)
        return true;
      else
        return false;
    }

    $scope.createPengadaan = function (newpengadaan) {
      //if(validasiPengadaan(newpengadaan.tanggal_datang, newpengadaan.tanggal_pesan)){
        dbService.insertPengadaan(newpengadaan).then(function (response) {
        });
        dbService.changeStokATK(newpengadaan.jumlah, newpengadaan.jenis, newpengadaan.nama).then(function (response) {
          getAllPengadaan();
          alert("Data berhasil ditambahkan");
        });
      /*}
      else{
        alert("Pengadaan gagal");
      }*/
    }

    $scope.editPengadaan = function() {
      dbService.editPengadaan($scope.editpengadaan).then(function (response) {
      });
      dbService.changeStokATK($scope.editpengadaan.jumlah - jumlah_awal, $scope.editpengadaan.jenis, $scope.editpengadaan.nama).then(function (response) {
        getAllPengadaan();
        alert("Data pengadaan berhasil diubah");
      });
    }

    $scope.deletePengadaan = function (id) {
      var r = confirm("Apakah Anda yakin ingin menghapus data ini?");
      if (r) {
        dbService.deletePengadaan(id).then(function (response) {
          getAllPengadaan();
        });
      }
    }

    $scope.jenisChanged = function() {
      dbService.getNamaATKByJenis($scope.newpengadaan.jenis).then(function (response) {
        $scope.namabarang = response;
      });
    }

    $scope.jenisChangedEdit = function() {
      dbService.getNamaATKByJenis($scope.editpengadaan.jenis).then(function (response) {
        $scope.namabarang_edit = response;
      });
    }

    // add active to menu
    $('#sidebar-menu a').parent('li').removeClass('current-page').parent('ul').parent().removeClass('active');
    $('#sidebar-menu a[href="#pengadaan"]').parent('li').addClass('current-page').parent('ul').parent().addClass('active');
 }]);
