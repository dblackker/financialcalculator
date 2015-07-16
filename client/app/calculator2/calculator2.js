'use strict';

angular.module('financialcalculatorApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('calculator2', {
        url: '/annuity',
        templateUrl: 'app/calculator2/calculator2.html',
        controller: 'Calculator2Ctrl'
      });
  });