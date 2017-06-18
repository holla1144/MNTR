angular
    .module('vaApp')
    .controller('verifyCtrl', verifyCtrl)

function verifyCtrl($routeParams, $location, authentication) {

    let vm = this;

    authentication.verify($routeParams.dataObj).then(function(response) {
        console.log(response);
        $location.path('/villages');
    }, function(err) {
        alert(err.data.message);
        $location.path('/');
    });
}