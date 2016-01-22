'use strict';
angular.module('myApp.addImage', ['ngRoute', 'base64', 'ngFileUpload']).config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/addImage', {
        templateUrl: 'templates/addImage.html',
        controller: 'AddImageCtrl'
    });
}]).controller('AddImageCtrl', ['$scope', '$firebase', '$location', 'CommonProp', '$base64', 'Upload', function($scope, $firebase, $location, CommonProp, $base64, Upload) {
    if (!CommonProp.getUser()) {
        $location.path('/home');
    }
    var login = {};
    $scope.login = login;
    $scope.AddImages = function(files) {
        login.loading = true;
        var fb = new Firebase("https://radiant-torch-5333.firebaseio.com/Images");
        var fbAuth = fb.getAuth();
        var newFb = fb.child(fbAuth.uid);
        Upload.base64DataUrl(files).then(function(base64Urls) {
            newFb.push({
                images: base64Urls
            }, function(error) {
                if (error) {
                    console.log("Error:", error);
                } else {
                    login.loading = false;
                    swal("Yay!", "Image uploaded successfully", "success");
                    $location.path('/welcome');
                    $scope.$apply();
                }
            });
        });
    }
    $scope.remove = function(array, index) {
    var ref = new Firebase("https://radiant-torch-5333.firebaseio.com/Images");

    ref.on("value", function(snapshot) {
        var sync = $firebase(ref.startAt($scope.username).endAt($scope.username));
        var images = sync.$asArray();
        console.log(images);
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
        array.splice(index, 1);
    }
    $scope.logout = function() {
            CommonProp.logoutUser();
        }
}]);
