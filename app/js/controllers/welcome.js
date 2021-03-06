'use strict';
angular.module('myApp.welcome', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/welcome', {
        templateUrl: 'templates/welcome.html',
        controller: 'WelcomeCtrl'
    });
}]).controller('WelcomeCtrl', ['$scope', '$firebase', '$location', 'CommonProp', function($scope, $firebase, $location, CommonProp) {
    var slider = new IdealImageSlider.Slider({
        selector: '#slider',
        height: 300,
        width:300,
        interval: 4000
    });
    slider.start();
    $scope.username = CommonProp.getUser();
    if (!$scope.username) {
        $location.path('/home');
    }
    var firebaseObj = new Firebase("https://radiant-torch-5333.firebaseio.com/Articles");
    var sync = $firebase(firebaseObj.startAt($scope.username).endAt($scope.username));
    $scope.articles = sync.$asArray();
    $scope.editPost = function(id) {
        var firebaseObj = new Firebase("https://radiant-torch-5333.firebaseio.com/Articles/" + id);
        var syn = $firebase(firebaseObj);
        $scope.postToUpdate = syn.$asObject();
        $('#editModal').modal('show');
    }
    $scope.update = function() {
        if(!$scope.postToUpdate.title) {
            swal("pls",'enter post title',"error");
            return false;
        }
        var fb = new Firebase("https://radiant-torch-5333.firebaseio.com/Articles/" + $scope.postToUpdate.$id);
        var article = $firebase(fb);
        article.$update({
            title: $scope.postToUpdate.title,
            post: $scope.postToUpdate.post,
            emailId: $scope.postToUpdate.emailId,
            uname: $scope.username
        }).then(function(ref) {
            $('#editModal').modal('hide');
        }, function(error) {
            console.log("Error:", error);
        });
    }
    $scope.confirmDelete = function(id) {
        var fb = new Firebase("https://radiant-torch-5333.firebaseio.com/Articles/" + id);
        var article = $firebase(fb);
        $scope.postToDelete = article.$asObject();
        $('#deleteModal').modal();
    }
    $scope.deletePost = function() {
        var fb = new Firebase("https://radiant-torch-5333.firebaseio.com/Articles/" + $scope.postToDelete.$id);
        var article = $firebase(fb);
        article.$remove().then(function(ref) {
            $('#deleteModal').modal('hide');
        }, function(error) {
            console.log("Error:", error);
        });
    }
    $scope.logout = function() {
        CommonProp.logoutUser();
    }
}]);
