angular
    .module('vaApp')
    .directive("visitForm", visitForm);

    function visitForm() {
        return {
            restrict: "EA",
            templateUrl: '/common/directives/visit-form/visit-form.template.html',

        }

    };