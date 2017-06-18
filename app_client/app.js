/**
 * Created by Humbert Humbert on 4/17/2017.
 */


angular.module("vaApp", ['ngRoute', 'ngAnimate', 'ngTouch', 'ui.bootstrap']);

function config($routeProvider, $locationProvider) {

    $routeProvider
        .when("/", {
            templateUrl:"views/home.html",
            controller:"homeCtrl",
            controllerAs: "vm"
        })

        .when("/about", {
            templateUrl: "views/about.html",
            controller:"aboutCtrl",
            controllerAs:"vm"
        })

        .when("/villages", {
            templateUrl: "views/villages.html",
            controller:"villageCtrl",
            controllerAs:"vm"
        })

        .when("/verify", {
            templateUrl: "views/verify.html",
            controller: "verifyCtrl",
            controllerAs: "vm"
    });

}

angular
    .module("vaApp")
    .config(['$routeProvider', config]);
