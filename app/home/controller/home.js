'use strict';
 
angular.module('myApp.home', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/views/home.html',
        controller: 'HomeCtrl'
    });
}])

.controller('HomeCtrl', ['$scope','$location','CommonProp', '$firebaseAuth',function($scope,$location,CommonProp,$firebaseAuth) {
	var firebaseObj = new Firebase("https://radiant-torch-5333.firebaseio.com");
    var loginObj = $firebaseAuth(firebaseObj);

    loginObj.$onAuth(function(authData) {
        if(authData) {
            CommonProp.setUser(authData.password.email);
            $location.path('/welcome');
        }
    });
    
    $scope.user = {};
    var login = {};
    $scope.login = login;

    $scope.SignIn = function(event) {
    login.loading = true;
    event.preventDefault();  // To prevent form refresh
    var username = $scope.user.email;
    var password = $scope.user.password;
        loginObj.$authWithPassword({
            email: username,
            password: password
        })
        .then(function(user) {
            // Success callback
            console.log('Authentication successful');
            CommonProp.setUser(user.password.email);
            $location.path('/welcome');
            swal("Yay!","Authentication successful","success");
        }, function(error) {
            // Failure callback
            login.loading = false;
            console.log('Authentication failure');
            alert('Authentication failure');
        });
}
}])
.service('CommonProp',['$location','$firebaseAuth', function($location, $firebaseAuth) {
    var user = '';
    var firebaseObj = new Firebase("https://radiant-torch-5333.firebaseio.com");
    var loginObj = $firebaseAuth(firebaseObj);

    return {
        getUser: function() {
            if(user == '') {
                user = localStorage.getItem('userEmail');
            }
            return user;
        },
        setUser: function(value) {
            localStorage.setItem("userEmail", value);
            user = value;
        },
        logoutUser: function() {
            loginObj.$unauth();
            console.log('done logout');
            user='';
            localStorage.removeItem('userEmail');
            $location.path('/');
        }
    };
}])
.directive('laddaLoading', [
    function() {
        return {
            link: function(scope, element, attrs) {
                var Ladda = window.Ladda;
                var ladda = Ladda.create(element[0]);
                // watching login.loading for change
                scope.$watch(attrs.laddaLoading, function(newVal, oldVal) {
                    // Based on the value start and stop the indicator
                    if (newVal) {
                        ladda.start();
                    } else {
                        ladda.stop();
                    }
                });
            }
        };
    }
]);



