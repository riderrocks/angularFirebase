'use strict';
angular.module('myApp', ['ngRoute', 'myApp.register', 'myApp.forgotPwd', 'myApp.home', 'myApp.header', 'myApp.welcome', 'myApp.addPost', 'myApp.addImage', 'myApp.profile', 'myApp.video']).config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);
