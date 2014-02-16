'use strict';
var app = angular.module('seatsplitterApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'mgcrea.ngStrap.modal',
  'mgcrea.ngStrap.aside',
  'mgcrea.ngStrap.tooltip',
  'mgcrea.ngStrap.navbar',
  'mgcrea.ngStrap.select',
  'facebook',
  'google-maps'

    ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })

        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
        })
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
        })

        .when('/showcase', {
                templateUrl: 'views/showcase.html',
                controller: 'ShowCaseCtrl'
            })
       .when('/desc', {
            templateUrl: 'views/desc.html',
            controller: 'DescCtrl'
       })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ContactCtrl'
        })
        .when('/user/signin', {
            templateUrl: 'views/signin.html',
            controller: 'SigninCtrl'
        })

        .when('/findflight', {
            templateUrl: 'views/findflight.html',
            controller: 'FindFlightCtrl'
        })
      .otherwise({
        redirectTo: '/'
      });
  });

app.config(['FacebookProvider', function(FacebookProvider) {
    // Here you could set your appId throug the setAppId method and then initialize
    // or use the shortcut in the initialize method directly.
    //FacebookProvider.init('250130355160679');
    FacebookProvider.init('502395379872852');
    
    

}])

app.controller('AuthenticationController', ['$scope', 'Facebook', '$rootScope', function($scope, Facebook,$rootScope) {

    // Here, usually you should watch for when Facebook is ready and loaded
    $scope.$watch(function() {
        return Facebook.isReady(); // This is for convenience, to notify if Facebook is loaded and ready to go.
    }, function(newVal) {
        $scope.facebookReady = true; // You might want to use this to disable/show/hide buttons and else
        console.log('scope.facebookReady');
        
    });

    // From now and on you can use the Facebook service just as Facebook api says
    // Take into account that you will need $scope.$apply when being inside Facebook functions scope and not angular
    $scope.FBlogin = function() {
        console.log('scope.FBlogin');

        Facebook.login(function(response) {
        Facebook.getLoginStatus(function(response) {
          if (response.status == 'connected') {
            console.log('FB Connected');
            $scope.logged = true;
            $scope.me(); 
          }
          else
            $scope.login();
        });
        }, {scope: 'email,user_likes,read_friendlists,user_online_presence,friends_online_presence'});
    };
//https://developers.facebook.com/docs/reference/login/extended-permissions

      /**
       * IntentLogin
       */
      $scope.IntentLogin = function() {
        Facebook.getLoginStatus(function(response) {
          if (response.status == 'connected') {

            $scope.logged = true;
            $scope.me(); 
            $scope.getFriends();
          }
          else
            $scope.login();
        }, {scope: 'email,user_likes'});
      };
      
 /**
       * Login
       */
       $scope.login = function() {
         Facebook.login(function(response) {
          if (response.status == 'connected') {
            $scope.logged = true;
            $scope.me();
          }
        
        });
       };
       
         /**
       * Logout
       */
      $scope.logout = function() {
        Facebook.logout(function() {
          $scope.$apply(function() {
            $scope.user   = {};
            $scope.logged = false;  
          });
        });
      }
      
       

    $scope.getLoginStatus = function() {
        Facebook.getLoginStatus(function(response) {
            if(response.status == 'connected') {
                $scope.$apply(function() {
                    $scope.loggedIn = true;
                });
            }
            else {
                $scope.$apply(function() {
                    $scope.loggedIn = false;
                });
            }
        });
        };


      /**
       * Taking approach of Events :D
       */
      $scope.$on('Facebook:statusChange', function(ev, data) {
        console.log('Status: ', data);
        if (data.status == 'connected') {
          $scope.$apply(function() {
            $scope.salutation = true;
            $scope.byebye     = false;  
            $scope.me();
            $scope.getFriends();

          });
        } else {
          $scope.$apply(function() {
            $scope.salutation = false;
            $scope.byebye     = true;
            
            // Dismiss byebye message after two seconds
            $timeout(function() {
              $scope.byebye = false;
            }, 2000)
          });
        };  });

        $scope.me = function() {
            Facebook.api('/me', function(response) {
                $scope.$apply(function() {
                    // Here you could re-check for user status (just in case)
                    $scope.user = response;
                    console.log("Response" + response);
                    $scope.email = response.email;
                    console.log('Your email id is : '+ response.email);
                    $rootScope.email = response.email;
                    //alert(fbUser.name  + " "  + fbUser.email);
                });
            });
        };

        $scope.getFriends = function(){
        Facebook.api('/me/friends', function(response) {
             $scope.$apply(function() {
                 if(response.data) {
                    $scope.friends = response.data;
                      
                    $.each(response.data,function(index,friend) {

                      console.log(friend.name + ' has id:' + friend.id);
                    });
                  } else {
                      console.log("Error!");
                }


                });

       


    });
  };




    }]);

/**
   * Just for debugging purposes.
   * Shows objects in a pretty way
   */
  app.directive('fbdebug', function() {
    return {
      restrict: 'E',
      scope: {
        expression: '=val'
      },
      template: '<pre>{{debug(expression)}}</pre>',
      link: function(scope) {
        // pretty-prints
        scope.debug = function(exp) {
          return angular.toJson(exp, true);
        };
      }
    }
  });

