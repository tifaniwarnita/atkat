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
           .when('/statperiode', {
               templateUrl : 'statistik-per-periode.html',
               controller  : 'statistikPerPeriodeController'
           })
           .when('/pengadaan', {
               templateUrl : 'pengadaan.html',
               controller  : 'pengadaanController'
           });
   }]);

 atkatApp.controller('statistikPerPeriodeController', ['$scope', 'dbService', '$q', function($scope, dbService, $q) {

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
            "name"  : dataStatistik[i]["jenis"],
            "data"  : [[dataStatistik[i]["tanggal"], dataStatistik[i]["jumlah"]]]
          } //object
          data.push(newData);
          j++;
        }
      }

      console.log(data);

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
              text: 'Day',
              dataGrouping: {
                  forced: true,
                  units: [['day', [1]]]
              }
          }, {
              type: 'year',
              count: 1,
              text: 'Week',
              dataGrouping: {
                  forced: true,
                  units: [['week', [1]]]
              }
          }, {
              type: 'all',
              text: 'Month',
              dataGrouping: {
                  forced: true,
                  units: [['month', [1]]]
              }
          }],
          buttonTheme: {
              width: 60
          },
          selected: 2
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

    });


    // Load module after Highcharts is loaded

    data = [];
    /* var data = [
      [1234828800000,13.50],
      [1234915200000,13.48],
      [1235001600000,12.95],
      [1235088000000,13.00],
      [1235347200000,12.42],
      [1235433600000,12.89],
      [1235520000000,13.02],
      [1235606400000,12.74],
      [1235692800000,12.76],
      [1235952000000,12.56],
      [1236038400000,12.62],
      [1236124800000,13.02],
      [1236211200000,12.69],
      [1236297600000,12.19],
      [1236556800000,11.87],
      [1236643200000,12.66],
      [1236729600000,13.24],
      [1236816000000,13.76],
      [1236902400000,13.70],
      [1237161600000,13.63],
      [1237248000000,14.24],
      [1237334400000,14.50],
      [1237420800000,14.52],
      [1237507200000,14.51],
      [1237766400000,15.38],
      [1237852800000,15.21],
      [1237939200000,15.21],
      [1238025600000,15.70],
      [1238112000000,15.26],
      [1238371200000,14.93],
      [1238457600000,15.02]
    ];*/

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

    $scope.createATK = function (newatk) {
      dbService.insertATK(newatk).then(function (response) {
        alert("Data ATK baru berhasil ditambahkan");
        getAllATK();
      });
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

    $scope.createPenyuplai = function (newpenyuplai) {
      dbService.insertPenyuplai(newpenyuplai).then(function (response) {
        alert("Data penyuplai baru berhasil ditambahkan");
        getAllPenyuplai();
      });
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

        dbService.getNamaATKByJenis($scope.editpemakaian.jenis).then(function (response) {
          $scope.namabarang_edit = response;
        });
      });
    }

    $scope.createPemakaian = function (newpemakaian) {
      dbService.insertPemakaian(newpemakaian).then(function (response) {
      });
      dbService.changeStokATK(-newpemakaian.jumlah, newpemakaian.jenis, newpemakaian.nama).then(function (response) {
        getAllPemakaian();
        alert("Data berhasil ditambahkan");
      });
    }

    $scope.editPemakaian = function() {
      dbService.editPemakaian($scope.editpemakaian).then(function (response) {
        alert("Data pemakaian berhasil diubah");
        getAllPemakaian();
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

        dbService.getNamaATKByJenis($scope.editbooking.jenis).then(function (response) {
          $scope.namabarang_edit = response;
        });
      });
    }

    $scope.createBooking = function (newbooking) {
      dbService.insertBooking(newbooking).then(function (response) {
        alert("Data booking baru berhasil ditambahkan");
        getAllBooking();
      });
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

    $scope.predicate = 'tanggal_pesan';
    $scope.reverse = true;
    $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };


    $scope.createPengadaan = function (newpengadaan) {
      dbService.insertPengadaan(newpengadaan).then(function (response) {
        alert("Data pengadaan berhasil ditambahkan");
        getAllPengadaan();
      });
    }

    $scope.jenisChanged = function() {
      dbService.getNamaATKByJenis($scope.newpengadaan.jenis).then(function (response) {
        $scope.namabarang = response;
      });
    }

    // add active to menu
    $('#sidebar-menu a').parent('li').removeClass('current-page').parent('ul').parent().removeClass('active');
    $('#sidebar-menu a[href="#pengadaan"]').parent('li').addClass('current-page').parent('ul').parent().addClass('active');
 }]);
