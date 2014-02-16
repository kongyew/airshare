'use strict';

angular.module('seatsplitterApp')
  .controller('FindFlightCtrl', function ($scope) {

// http://mgcrea.github.io/angular-strap/##selects
    $scope.segments = [
            {
               "row":[
                  "6814",
                  4,
                  "silver",
                  "2014/03/16",
                  "United Airlines",
                  "05:10:10",
                  "San Francisco",
                  "Calgary",
                  "United Airlines",
                  "SFO",
                  "YYC"
               ],
               "graph":{
                  "nodes":[

                  ],
                  "relationships":[

                  ]
               }
            },
            {
               "row":[
                  "6814",
                  4.3,
                  "silver",
                  "2014/03/16",
                  "United Airlines",
                  "05:10:10",
                  "San Francisco",
                  "Calgary",
                  "Air Canada",
                  "SFO",
                  "YYC"
               ],
               "graph":{
                  "nodes":[

                  ],
                  "relationships":[

                  ]
               }
            },
            {
               "row":[
                  "952",
                  4,
                  "gold",
                  "2014/03/14",
                  "United Airlines",
                  "20:10:10",
                  "San Francisco",
                  "Nashville",
                  "United Airlines",
                  "SFO",
                  "BNA"
               ],
               "graph":{
                  "nodes":[

                  ],
                  "relationships":[

                  ]
               }
            },
            {
               "row":[
                  "952",
                  5,
                  "gold",
                  "2014/03/14",
                  "United Airlines",
                  "20:10:10",
                  "San Francisco",
                  "Nashville",
                  "Air Canada",
                  "SFO",
                  "BNA"
               ],
               "graph":{
                  "nodes":[

                  ],
                  "relationships":[

                  ]
               }
            }
         ];
    $scope.selectedIcon = "";
   // $scope.selectedIcons = "["Globe","Heart"]";


   $scope.reputation = function(val) {
      var result;

      if (val >= 4.5) {
        result = "best";
      }

      if (val >= 3.0 && val < 4.5) {
        result = "good";
      }

      if (val < 3.0) {
        result = "bad";
      }
      
      return result;
   };

    $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 8
        };
 //   $scope.icons = "[{"value":"Gear","label":"<i class=\"fa fa-gear\"></i> Gear"},{"value":"Globe","label":"<i class=\"fa fa-globe\"></i> Globe"},{"value":"Heart","label":"<i class=\"fa fa-heart\"></i> Heart"},{"value":"Camera","label":"<i class=\"fa fa-camera\"></i> Camera"}]";
  });
