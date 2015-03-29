var module = angular.module('app', ['sxChameleon']);

module.controller('DemoController',['$scope', function(scope){
	scope.chameleonValues = [{top:500, color:'#666666'}, {top:1000, color:'#7F0B0B'}];

}]);