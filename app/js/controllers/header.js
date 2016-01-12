'use strict';
angular.module('myApp.header', ['ngRoute']).controller('NavbarCtrl', ['$scope', '$location', 'CommonProp', function($scope, $location, CommonProp) {
    $scope.isRouteActive = function(route) {
        var curRoute = $location.path();
        return curRoute.match(route);
    }
    $scope.logout = function() {
        CommonProp.logoutUser();
    }
    $(document).ready(function() {
    	$('.messageBox').hide();
    	$('.messageBox').on('click', function() {
    		$('.messageBox').show();
    	});
    }); 
}]);
