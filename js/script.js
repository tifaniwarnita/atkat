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

    $scope.getATKByID = function (id) {
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

    $scope.createPemakai = function (newpemakai) {
      dbService.insertPemakai(newpemakai).then(function (response) {
        alert("Data pemakai baru berhasil ditambahkan");
        getAllPemakai();
      });
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
    function getAllPemakaian() {
     dbService.getPemakaian().then(function (response) {
       $scope.pemakaian = response;
     });
    }

    $scope.predicate = 'id';
    $scope.reverse = false;
    $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };

    $scope.createPemakaian = function (newpemakaian) {
      dbService.insertPemakaian(newpemakaian).then(function (response) {
        alert("Data pemakaian baru berhasil ditambahkan");
        getAllPemakaian();
      });
    }

    // add active to menu
    $('#sidebar-menu a').parent('li').removeClass('current-page').parent('ul').parent().removeClass('active');
    $('#sidebar-menu a[href="#pemakaian"]').parent('li').addClass('current-page').parent('ul').parent().addClass('active');
 }]);
