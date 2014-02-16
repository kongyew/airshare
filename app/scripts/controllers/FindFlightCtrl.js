'use strict';

angular.module('seatsplitterApp')
  .controller('FindFlightCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

  
// http://mgcrea.github.io/angular-strap/##selects
    // $scope.segments = [
    //         {
    //            "row":[
    //               "6814",
    //               4,
    //               "silver",
    //               "2014/03/16",
    //               "United Airlines",
    //               "05:10:10",
    //               "San Francisco",
    //               "Calgary",
    //               "United Airlines",
    //               "SFO",
    //               "YYC"
    //            ],
    //            "graph":{
    //               "nodes":[

    //               ],
    //               "relationships":[

    //               ]
    //            }
    //         },
    //         {
    //            "row":[
    //               "6814",
    //               4.3,
    //               "silver",
    //               "2014/03/16",
    //               "United Airlines",
    //               "05:10:10",
    //               "San Francisco",
    //               "Calgary",
    //               "Air Canada",
    //               "SFO",
    //               "YYC"
    //            ],
    //            "graph":{
    //               "nodes":[

    //               ],
    //               "relationships":[

    //               ]
    //            }
    //         },
    //         {
    //            "row":[
    //               "952",
    //               4,
    //               "gold",
    //               "2014/03/14",
    //               "United Airlines",
    //               "20:10:10",
    //               "San Francisco",
    //               "Nashville",
    //               "United Airlines",
    //               "SFO",
    //               "BNA"
    //            ],
    //            "graph":{
    //               "nodes":[

    //               ],
    //               "relationships":[

    //               ]
    //            }
    //         },
    //         {
    //            "row":[
    //               "952",
    //               5,
    //               "gold",
    //               "2014/03/14",
    //               "United Airlines",
    //               "20:10:10",
    //               "San Francisco",
    //               "Nashville",
    //               "Air Canada",
    //               "SFO",
    //               "BNA"
    //            ],
    //            "graph":{
    //               "nodes":[

    //               ],
    //               "relationships":[

    //               ]
    //            }
    //         }
    //      ];

   console.log("email testing : "  + $scope.email);
    $scope.segments = [];
    $scope.selectedIcon = "";
   // $scope.selectedIcons = "["Globe","Heart"]";


   $scope.reputation = function(val) {
      var result;

      if (val >= 4.0) {
        result = "best";
      }

      if (val >= 3.1 && val < 4.0) {
        result = "good";
      }

      if (val < 3.1) {
        result = "bad";
      }
      
      return result;
   };

    $scope.map = {
            center: {
                latitude: 37.5,
                longitude: -122
            },
            zoom: 8
        };

    $http({
      method: 'POST',
      url: 'http://localhost:7474/db/data/transaction',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
          "statements": [
              {
                  "statement" : "MATCH (b:Person)-[:BOOKED_ON]->(c:Flight)<-[:BOOKED_ON]-(a:Person) WHERE b.address = \"kinghuang@mac.com\" RETURN c.marketing_flight_number, a.reputation, a.status, c.date, c.marketing_airline, c.time, c.start_city_name, c.end_airport_city, a.lounge, c.start_airport_code, c.end_airport_code ORDER BY c.marketing_flight_number, -a.reputation",
                  "resultDataContents": ["row", "graph"],
                  "parameters" : {
                      "props" : {
                          "name" : "My Node"
                      }
                  }
              }
          ]
      },
      transformRequest: function(data) {
        return JSON.stringify(data);
      },
      transformResponse: function(data) {
        return JSON.parse(data);
      }
    }).success(function(data, status, headers, config) {
      console.log($scope.user);
      console.log($scope.email);
      $scope.segments = data['results'][0]['data'];
    });
 //   $scope.icons = "[{"value":"Gear","label":"<i class=\"fa fa-gear\"></i> Gear"},{"value":"Globe","label":"<i class=\"fa fa-globe\"></i> Globe"},{"value":"Heart","label":"<i class=\"fa fa-heart\"></i> Heart"},{"value":"Camera","label":"<i class=\"fa fa-camera\"></i> Camera"}]";
  }]);
