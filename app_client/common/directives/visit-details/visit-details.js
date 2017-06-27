angular
    .module('vaApp')
    .directive("visitDetails", visitDetails);

function visitDetails() {
    return {
        controller: function($scope) {
            $scope.selectTab = function(event) {

                /*Triggered when an element with class section-tab-item is clicked.
                 The 'visible' class is applied to the div matching the data-tab and data-id attributes
                 of the selected tab, and removed from all other divs with a matching data-id. The selected-tab
                 class is added to the sections-tab-item element with a matching data-tab and data-id attributes of the
                 selected element, and removed from any other elements with the same data-id which may already have
                 that class.
                 */

                let selectedTab = $(event.target);
                let tabs = $('.sections-tab--item');
                let detailDivs = $('.visit-details-div');
                let selectedDiv = selectedTab.attr('data-tab');
                let childDivIdentifier = selectedTab.attr('data-id');

                $.each(detailDivs, function (i) {

                    if ($(detailDivs[i]).attr('data-id') === childDivIdentifier && $(detailDivs[i]).attr('data-block') !== selectedDiv) {
                        $(this).removeClass('visible');
                    } else if (($(detailDivs[i]).attr('data-id') === childDivIdentifier && $(detailDivs[i]).attr('data-block') === selectedDiv)) {
                        $(this).addClass('visible');
                    };
                });


                $.each(tabs, function (i) {

                    if ($(tabs[i]).attr('data-id') === childDivIdentifier && $(tabs[i]).attr('data-tab') !== selectedDiv) {
                        $(this).removeClass('selected-tab');
                    } else if ($(tabs[i]).attr('data-tab') == selectedDiv) {
                        $(this).addClass('selected-tab');
                    }
                });
            };
        },
        restrict: "EA",
        templateUrl: '/common/directives/visit-details/visit-details.template.html'
    }
}
