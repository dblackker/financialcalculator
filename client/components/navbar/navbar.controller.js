'use strict';

angular.module('financialcalculatorApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
    {
      'title': 'Future Value',
      'link': '/'
    },
    {
      'title': 'Annuity',
      'link': '/annuity'
    },
    {
      'title': 'NYSE Quotes',
      'link': '/nyse'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
