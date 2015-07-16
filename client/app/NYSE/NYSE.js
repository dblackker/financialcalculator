'use strict';

angular.module('financialcalculatorApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('NYSE', {
        url: '/nyse',
        templateUrl: 'app/NYSE/NYSE.html',
        controller: 'NYSECtrl'
      });
  });