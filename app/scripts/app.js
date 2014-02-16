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
    FacebookProvider.init('250130355160679');
}])

app.controller('AuthenticationController', ['$scope', 'Facebook', function($scope, Facebook) {

    // Here, usually you should watch for when Facebook is ready and loaded
    $scope.$watch(function() {
        return Facebook.isReady(); // This is for convenience, to notify if Facebook is loaded and ready to go.
    }, function(newVal) {
        $scope.facebookReady = true; // You might want to use this to disable/show/hide buttons and else
    });

    // From now and on you can use the Facebook service just as Facebook api says
    // Take into account that you will need $scope.$apply when being inside Facebook functions scope and not angular
    $scope.login = function() {
        Facebook.login(function(response) {
            // Do something with response. Don't forget here you are on Facebook scope so use $scope.$apply
        });
    };

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

        $scope.me = function() {
            Facebook.api('/me', function(response) {
                $scope.$apply(function() {
                    // Here you could re-check for user status (just in case)
                    $scope.user = response;
                });
            });
        };
    }]);