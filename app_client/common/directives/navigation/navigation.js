/**
 * Created by Master on 30-Apr-17.
 */
angular
    .module('vaApp')
    .directive("navigation", navigation);

    function navigation(authentication) {

        return {
            controller: ['$scope', '$location', 'authentication', function navController($scope, $location, authentication) {
            $scope.logout = function() {
                authentication.logout();
                $location.path('/');
            }
            }],
            restrict: 'EA',
            templateUrl: '/common/directives/navigation/navigation.template.html'
        }


    };
