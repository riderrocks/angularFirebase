'use strict';

angular.module('myApp.addPost', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/addPost', {
        templateUrl: 'addPost/views/addPost.html',
        controller: 'AddPostCtrl'
    });
}])

.controller('AddPostCtrl', ['$scope', '$firebase', '$location', 'CommonProp', function($scope, $firebase, $location, CommonProp) {
    
    if (!CommonProp.getUser()) {
        $location.path('/home');
    }

    var login = {};
    $scope.login = login;

    $scope.AddPost = function() {
        login.loading = true;
        var title = $scope.article.title;
        var post = $scope.article.post;

        var firebaseObj = new Firebase("https://radiant-torch-5333.firebaseio.com/Articles");
        var fb = $firebase(firebaseObj);

        var user = CommonProp.getUser();

        fb.$push({
            title: title,
            post: post,
            emailId: user,
            '.priority': user
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
