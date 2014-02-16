'use strict';

angular.module('seatsplitterApp')
  .controller('FindFlightCtrl', function ($scope) {

// http://mgcrea.github.io/angular-strap/##selects
    $scope.selectedIcon = "";
   // $scope.selectedIcons = "["Globe","Heart"]";


    $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 8
        };
 //   $scope.icons = "[{"value":"Gear","label":"<i class=\"fa fa-gear\"></i> Gear"},{"value":"Globe","label":"<i class=\"fa fa-globe\"></i> Globe"},{"value":"Heart","label":"<i class=\"fa fa-heart\"></i> Heart"},{"value":"Camera","label":"<i class=\"fa fa-camera\"></i> Camera"}]";
  });
