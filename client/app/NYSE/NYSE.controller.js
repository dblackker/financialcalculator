'use strict';

angular.module('financialcalculatorApp')
  .controller('NYSECtrl', function ($scope, $http, $q) {
    $scope.Symbols = [];
    //$scope.Symbols = new Set();

    $scope.addSymbol = function(symbol) {
    	//if ($scope.Symbols.indexOf(symbol) != -1)
    	//{
    		$scope.Symbols.push(symbol);    		
    	//}

    	//$scope.Symbols.add(symbol);
    	$scope.Symbol = '';
    };

    $scope.removeSymbol = function(symbol) {
    	var index = $scope.Symbols.indexOf(symbol);
    	$scope.Symbols.splice(index, 1);

    	//$scope.Symbols.delete(symbol);
    };

    $scope.getSymbolResults = function()
    {
    	$scope.ResultData = null;
    	
    	var symbols = '';
    	var isFirst = true;
    	angular.forEach($scope.Symbols, function(key,value) {
    		if (!isFirst)
    		{
    			symbols += ",";
    		}
    		symbols += "\"" + key + "\"";
    		isFirst = false;
    	});
    	symbols = encodeURIComponent(symbols);

    	var nyseUrl = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(" + symbols + ")%0A%09%09&format=json&diagnostics=true&env=http%3A%2F%2Fdatatables.org%2Falltables.env&callback=";

    	$http.get(nyseUrl).
    		success(function(data, status, headers, config) {
    			$scope.ResultData = data;
    		}).
    		error(function(data, status, headers, config) {
    		});
    };
  });
