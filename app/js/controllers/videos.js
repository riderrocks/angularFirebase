'use strict';

angular.module('myApp.video', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/videos', {
		templateUrl: 'templates/videos.html',
		controller: 'videoctrl'
	});
}]).controller('videoctrl', ['$scope','CommonProp', function($scope, CommonProp) {
	$scope.logout = function() {
		CommonProp.logoutUser();
	}
}]);