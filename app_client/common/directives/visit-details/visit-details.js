angular
    .module('vaApp')
    .directive("visitDetails", visitDetails);

function visitDetails() {
    return {
        restrict: "EA",
        templateUrl: '/common/directives/visit-details/visit-details.template.html'
    }
}
