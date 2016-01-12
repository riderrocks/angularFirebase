'use strict';

angular.module('myApp.forgotPwd', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/forgotPwd', {
        templateUrl: 'templates/forgotPwd.html',
        controller: 'forgotPwdCtrl'
    });
}])

.controller('forgotPwdCtrl', ['$scope', '$location', '$firebaseAuth', function($scope, $location, $firebaseAuth) {
    var firebaseObj = new Firebase("https://radiant-torch-5333.firebaseio.com");
    var login = {};
    $scope.login = login;
    $scope.forgotPwd = function(event) {
    	login.loading = true;
    	event.preventDefault();
        firebaseObj.resetPassword({
            email: $scope.user.email
        }, function(error) {
            if (error === null) {
                swal("Password reset email sent successfully", "", "success");
                $location.path('/home');
            } else {
            	login.loading = false;
                swal("Please enter correct email id", "error");
                console.log("Error sending password reset email:", error);
            }
        });
    }
}]);
