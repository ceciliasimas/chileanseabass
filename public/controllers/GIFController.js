/**
 * Created by csimas on 6/10/16.
 */
var myApp = angular.module("myApp", []);
myApp.controller("GIFController",  ['$scope', '$http', function($scope, $http) {

    var updateView = function() {
        $http.get('/gif').success(function(response) {
            $scope.gifs = response;
            $scope.gif="";
        });
    };

    updateView();

    $scope.addGIF = function() {
        $http.post('/gif', $scope.gif).success(function(response) {
            updateView();
        });
    };

    $scope.updateGIF = function() {
        console.log($scope.gif._id);
        $http.put('/gif/' + $scope.gif._id, $scope.gif).success(function(response) {
            updateView();
        });
    };

}]);