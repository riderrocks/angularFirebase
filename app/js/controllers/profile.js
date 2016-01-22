'use strict';
angular.module('myApp.profile', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/profile', {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
    });
}]).controller('ProfileCtrl', ['$scope', '$firebase', '$location', 'CommonProp', function($scope, $firebase, $location, CommonProp) {
    if (!CommonProp.getUser()) {
        $location.path('/home');
    }
    var login = {};
    $scope.login = login;
    var firebaseObj = new Firebase("https://radiant-torch-5333.firebaseio.com/Profile");
    var fb = $firebase(firebaseObj);
    var user = CommonProp.getUser();
    $scope.submit = function() {
        login.loading = true;
        fb.$push({
            fname: $scope.profile.fname,
            lname: $scope.profile.lname,
            phno: $scope.profile.phno
        }).then(function(ref) {
            swal("Done!", "Profile updated successfully", "success");
            login.loading = false;
            $location.path('/welcome');
        }, function(error) {
            login.loading = false;
            swal("Oops!", "There was a problem updating your profile", "error");
            console.log("Error:", error);
        });
    }
    $scope.changePasswd = function() {
        login.loading = true;
        firebaseObj.changePassword({
            email: user,
            oldPassword: $scope.profile.oldPwd,
            newPassword: $scope.profile.newPwd
        }, function(error) {
            if (error === null) {
                swal("Done!", "Profile updated successfully", "success");
                login.loading = false;
                $location.path('/welcome');
            } else {
                login.loading = false;
                swal("Oops!", "There was a problem updating your profile", "error");
                console.log("Error changing password:", error);
            }
        });
    }
    $scope.logout = function() {
        CommonProp.logoutUser();
    }
}]);
