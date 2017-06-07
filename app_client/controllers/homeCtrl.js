angular
    .module('vaApp')
    .controller('homeCtrl', homeCtrl)

function homeCtrl (authentication, $location) {

    var vm = this;

    if (authentication.isLoggedIn()) {
        $location.path('/villages')
    } else {

        vm.loginError = "";

        vm.login = function () {
            let credentials = {};

            if (!vm.loginEmail || !vm.loginPassword) {
                vm.loginError = "All fields required";
            } else {
                credentials.email = vm.loginEmail;
                credentials.password = vm.loginPassword;

                authentication.login(credentials).then(function(response) {
                    $location.path('/villages')
                }, function(err) {
                    console.log(err);
                    vm.loginError = err.data.message;
                });

            };
        };

        vm.register = function() {

            let newUser = {};

            if (!vm.registerName || !vm.registerEmail || !vm.registerPassword) {
                vm.registrationError = "All fields are required to create an account."
            } else {
                newUser.name = vm.registerName;
                newUser.email = vm.registerEmail;
                newUser.password = vm.registerPassword;

                authentication.register(newUser).then(function() {
                    $location.path('/villages')
                }, function(err) {
                    console.log(err);
                    vm.registrationError = err.data.message;
                })
            }


        }

    };
}