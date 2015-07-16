'use strict';

angular.module('financialcalculatorApp')
  .controller('CalculatorCtrl', function ($scope) {
  	$scope.calculatorInput = {};
  	$scope.calculatorOutput = {};

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
