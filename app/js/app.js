'use strict';

angular.module('myApp', [
    'ngRoute',
    'myApp.home',
    'myApp.register',
    'myApp.header',
    'myApp.welcome',
    'myApp.addPost',
    'myApp.addImage',
    'myApp.profile'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);
