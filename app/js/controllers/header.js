'use strict';
angular.module('myApp.header', ['ngRoute']).controller('NavbarCtrl', ['$scope', '$location', 'CommonProp', function($scope, $location, CommonProp) {
    $scope.isRouteActive = function(route) {
        var curRoute = $location.path();
        return curRoute.match(route);
    }
    $scope.logout = function() {
        CommonProp.logoutUser();
    }
    $scope.notify = function() {
        
        $.notify.addStyle('mystyle', {
            html: "<div><img src='theme/images/notifimage.png'><br><h3 data-notify-text/></div>",
            classes: {
                base: {
                    "white-space": "nowrap",
                    "background-color": "#fff",
                    "padding": "10px"
                },
                superblue: {
                    "color": "white",
                    "background-color": "white"
                }
            }
        });
        $(".pos-demo").notify(
            "Nothing that rings a bell", {
                style:"mystyle",
                position: "bottom"
            }
        );
    }
    $(document).ready(function() {
        $('.messageBox').hide();
        $('.messageBox').on('click', function() {
            $('.messageBox').show();
        });
    });
}]);
