angular
    .module('vaApp')
    .directive("printVisitForm", printVisitForm);

function printVisitForm() {
    return {
        restrict: "EA",
        templateUrl: '/common/directives/print-visit-form/print-visit-form.template.html'
    }
};
