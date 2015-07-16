'use strict';

describe('Controller: NYSECtrl', function () {

  // load the controller's module
  beforeEach(module('financialcalculatorApp'));

  var NYSECtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NYSECtrl = $controller('NYSECtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
