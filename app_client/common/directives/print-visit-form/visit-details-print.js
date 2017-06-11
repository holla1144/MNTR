angular
    .module('vaApp')
    .directive("printVisitForm", printVisitForm);

function printVisitForm() {
    return {
        restrict: "EA",
        templateUrl: '/common/directives/print-visit-form/visit-details-print.template.html'
    }
};
