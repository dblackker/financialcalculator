'use strict';

angular.module('financialcalculatorApp')
  .controller('CalculatorCtrl', function ($scope) {
  	$scope.calculatorInput = {};
  	$scope.calculatorOutput = {};

  $scope.calculateApi = function(form) {
    $http.post('/api/calculators', $scope.calculatorInput).success(function(awesomeThings) {
      $scope.calculatorOutput.futureValue = awesomeThings.futureValue;
      $scope.calculatorOutput.inflationAdjustedIncome = awesomeThings.inflationAdjustedIncome;
    });
  };
  
    $scope.calculate = function (form) {
    	try
    	{
    		$scope.calculatorOutput.futureValue = $scope.calculatorInput.presentValue * Math.pow((1 + $scope.calculatorInput.interestRate), $scope.calculatorInput.numberOfYears);
    	}
    	catch (e)
    	{
    		$scope.calculatorOutput.futureValue = '9999999';
    	}
    };
  });
