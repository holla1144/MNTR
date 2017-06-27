/**
 * Created by Master on 09-May-17.
 */
(function() {
    angular
        .module('vaApp')
        .service('locationData', locationData)


    function locationData($http, authentication) {

        let getRayons = function(oblastId) {
            return $http.get('/api/getRayons/' + oblastId);
        };

        let getVillages = function(rayonId) {
            return $http.get('/api/getVillages/' + rayonId);
        };

        let getOne = function(villageId) {
            return $http.get('/api/getOne/' + villageId);
        };

        let addVisit = function(data) {
            return $http.post('/api/addVisit', data, {headers: {Authorization: 'Bearer ' + authentication.getToken()}});
        };

        let getVisits = function(visitsArray) {
            return $http.get('/api/getVisits/' + visitsArray, {headers: {Authorization: 'Bearer ' + authentication.getToken()}});

        };

        let getRecentVisits = function() {
            return $http.get('/api/getRecent', {headers: {Authorization: 'Bearer ' + authentication.getToken()}});
            ;
        };

        return {
            "getRayons": getRayons,
            "getVillages": getVillages,
            "getOne": getOne,
            "addVisit": addVisit,
            "getVisits": getVisits,
            "getRecentVisits": getRecentVisits

        };

    }


})();