 var atkatApp = angular.module('atkatApp', ['ngRoute']);
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
           });
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

    $scope.predicate = 'id';
    $scope.reverse = false;
    $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };

    $scope.createPenyuplai = function (newpenyuplai) {
      dbService.insertPenyuplai(newpenyuplai).then(function (response) {
        alert("Data penyuplai baru berhasil ditambahkan");
        getAllPenyuplai();
      });
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

    $scope.predicate = 'id';
    $scope.reverse = false;
    $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };

    $scope.createPenyuplai = function (newpenyuplai) {
      dbService.insertPenyuplai(newpenyuplai).then(function (response) {
        alert("Data penyuplai baru berhasil ditambahkan");
        getAllPenyuplai();
      });
    }

    // add active to menu
    $('#sidebar-menu a').parent('li').removeClass('current-page').parent('ul').parent().removeClass('active');
    $('#sidebar-menu a[href="#penyuplai"]').parent('li').addClass('current-page').parent('ul').parent().addClass('active');
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
