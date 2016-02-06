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
           });
   }]);
 atkatApp.controller('atkController', function($scope) {
   $scope.atk = [
     {'id': 1,
       'jenis': 'Kertas',
     'nama': 'Sinar Dunia A4',
     'stok': 5,
     'satuan': 'rim'
   },
      {'id': 2,
        'jenis': 'Bolpoin',
       'nama': 'Boxy',
       'stok': 10,
       'satuan': 'pcs'
      },
    ];
    $scope.predicate = 'id';
    $scope.reverse = false;
    $scope.order = function(predicate) {
    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    $scope.predicate = predicate;
};

    // add active to menu
    $('#sidebar-menu a').parent('li').removeClass('current-page').parent('ul').parent().removeClass('active');
    $('#sidebar-menu a[href="#atk"]').parent('li').addClass('current-page').parent('ul').parent().addClass('active');

 });
 atkatApp.controller('pemakaiController', function($scope) {
    $('#sidebar-menu a').parent('li').removeClass('current-page').parent('ul').parent().removeClass('active');
    $('#sidebar-menu a[href="#pemakai"]').parent('li').addClass('current-page').parent('ul').parent().addClass('active');
 });
