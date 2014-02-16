'use strict';
//, ["AzureCtrl"]
angular.module('seatsplitterApp')
  .controller('SigninCtrl',['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.awesomeThings = [
      'Description',
      'AngularJS',
      'Karma'
    ];
    $rootScope.azureURL = 'https://developerweek.azure-mobile.net/';
    $rootScope.azureAppKey ='nQpITnITZsGULqGjymhntSfiesvxjU59';
    
  }]);
