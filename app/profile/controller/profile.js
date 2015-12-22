'use strict';

angular.module('myApp.profile',['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/profile', {
		templateUrl: 'profile/views/profile.html',
		controller: 'Profile'
	});
}])

.controller('Profile', ['$scope','$firebase','$location','CommonProp', function($scope, $firebase, $location, CommonProp) {
	if(!CommonProp.getUser()) {
		$location.path('/home');
	}

	var login = {};
	$scope.login = login;

	$scope.submit = function() {
		login.loading = true;

		var user = CommonProp.getUser();
		var firebaseObj = new Firebase("https://radiant-torch-5333.firebaseio.com/Profile");
		var fb = $firebase(firebaseObj);

		fb.$push({
            fname: $scope.profile.fname,
            lname: $scope.profile.lname,
            phno: $scope.profile.phno
        }).then(function(ref) {
            console.log(ref);
            login.loading = false;
            $location.path('/welcome');
        }, function(error) {
            login.loading = false;
            console.log("Error:", error);
        });
	}

	$scope.logout = function() {
		CommonProp.logoutUser();
	}
}]);