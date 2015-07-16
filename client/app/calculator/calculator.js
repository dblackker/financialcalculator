'use strict';

angular.module('financialcalculatorApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('calculator', {
        url: '/calculator',
        templateUrl: 'app/calculator/calculator.html',
        controller: 'CalculatorCtrl'
      });
  });