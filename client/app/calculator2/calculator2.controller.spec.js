'use strict';

describe('Controller: Calculator2Ctrl', function () {

  // load the controller's module
  beforeEach(module('financialcalculatorApp'));

  var Calculator2Ctrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Calculator2Ctrl = $controller('Calculator2Ctrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
