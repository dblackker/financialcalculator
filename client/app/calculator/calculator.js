'use strict';

angular.module('financialcalculatorApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('calculator', {
        url: '/',
        templateUrl: 'app/calculator/calculator.html',
        controller: 'CalculatorCtrl'
      });
  });
