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
    // Set defualt view of our app to home
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);
