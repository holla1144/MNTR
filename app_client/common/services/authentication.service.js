(function() {
    angular
        .module('vaApp')
        .service('authentication', authentication);

    authentication.$inject = ['$window', '$http'];

    function authentication ($window, $http) {
       var saveToken = function(token) {
           console.log(token);
           $window.localStorage['vaApp-token'] = token;
       };

       var getToken = function() {
           return $window.localStorage['vaApp-token'];
       };

       var register = function(user) {

           return $http.post('/api/register', user).then(function(data) {
               saveToken(data.data.token);
           }, function() {
               console.log("registration error");
           })
       };

       var login = function(user) {

           return $http.post('/api/login', user).then(function(data) {
               saveToken(data.data.token);
           }, function(data){
              console.log(data);

               }
           )
       };

       var logout = function() {
           $window.localStorage.removeItem('vaApp-token');
       };

       var isLoggedIn = function() {
           var token = getToken();

           console.log(token);

           if (token) {
               var payload = JSON.parse($window.atob(token.split('.')[1]));

               return payload.exp > Date.now() / 1000;
           } else {
               return false;
           }
       };

       return {
           "saveToken" : saveToken,
           "getToken" : getToken,
           "register": register,
           "login": login,
           "logout": logout,
           "isLoggedIn": isLoggedIn
       }
    }
})();