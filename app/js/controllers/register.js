'use strict';
angular.module('myApp.register', ['ngRoute', 'firebase']).config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/register', {
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl'
    });
}]).controller('RegisterCtrl', ['$scope', '$location', '$firebaseAuth','$http', function($scope, $location, $firebaseAuth,$http) {
    var firebaseObj = new Firebase("https://radiant-torch-5333.firebaseio.com");
    var auth = $firebaseAuth(firebaseObj);
    var login = {};
    $scope.login = login;
    $scope.signUp = function() {
        if (!$scope.regForm.$invalid) {
            var email = $scope.user.email;
            var password = $scope.user.password;
            if (email && password) {
                login.loading = true;
                auth.$createUser(email, password).then(function() {
                    swal("Yay!", "User creation successful", "success");
                    $location.path('/home');
                }, function(error) {
                    console.log(error);
                    $scope.regError = true;
                    $scope.regErrorMessage = error.message;
                    login.loading = false;
                    swal("Oops!", "Check your credentials", "error");
                });
            }
            $http.post('/api/registeruser/', $scope.user.email
             ).success(function(data, status, headers, config) {
              alert("Success!")
             }).error(function(data, status, headers, config) {
               alert("Error");
            });
        }
    };
}]);
