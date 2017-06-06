angular
    .module('vaApp')
        .controller('villageCtrl', villageCtrl)


function villageCtrl($location, locationData, authentication) {

    let vm = this;

    if (!authentication.isLoggedIn()) {
        $location.path('/');
    } else {

        vm.oblasts = [

            {
                "pcode": 1400000000,
                "name": "Donetska"
            },
            {
                "pcode": 6300000000,
                "name": "Kharkivska"
            },
            {
                "pcode": 4400000000,
                "name": "Luhanska"
            }
        ];


        vm.villageDetails = "";
        vm.selectedCoords = {lat: 49.205562, lng: 31.407845}; //initial value for map coordinates
        vm.selectedTitle = "Ukraine"; //initial value for map label
        vm.zoom = 5; //initial value for map zoom

        vm.selectTab = function(event) {

            /*Triggered when an element with class section-tab-item is clicked.
              The 'visible' class is applied to the div matching the data-tab and data-id attributes
              of the selected tab, and removed from all other divs with a matching data-id. The selected-tab
              class is added to the sections-tab-item element with a matching data-tab and data-id attributes of the
              selected element, and removed from any other elements with the same data-id which may already have
              that class.
             */

            let selectedTab = $(event.target);
            let tabs = $('.sections-tab-item');
            let detailDivs = $('.visit-details-div');
            let selectedDiv = selectedTab.attr('data-tab');
            let childDivIdentifier = selectedTab.attr('data-id');

           $.each(detailDivs, function(i) {

               if ($(detailDivs[i]).attr('data-id') === childDivIdentifier && $(detailDivs[i]).attr('data-block') !== selectedDiv) {
                   $(this).removeClass('visible');
               } else if (($(detailDivs[i]).attr('data-id') ===childDivIdentifier && $(detailDivs[i]).attr('data-block') === selectedDiv)) {
                   $(this).addClass('visible');
               };
           });


            $.each(tabs, function(i) {

                if ($(tabs[i]).attr('data-id') === childDivIdentifier && $(tabs[i]).attr('data-tab') !== selectedDiv) {
                    $(this).removeClass('selected-tab');
                } else if ($(tabs[i]).attr('data-tab') == selectedDiv){
                    $(this).addClass('selected-tab');
                }
            });

        };

        vm.getRayons = function () {

        /* Populates the options for the Rayon selector. Resets selected rayon every time a new oblast is selected.
            Resets 'selected rayon' every time a new oblast is selected. Resets villages in 'village' dropdown every time a
            rayon is selected. Resets selected village every time a new oblast is selected. Clears details of selected villages every time
            a new oblast is selected. Clears array of village objects every time a new oblast is selected. Resets header for visits section.*/

            vm.rayons = "";
            vm.selectedRayon = "";
            vm.villages = "";
            vm.selectedVillage = "";
            vm.villageDetails = "";
            vm.visitArray = [];
            vm.visitHeader = "";

            locationData.getRayons(vm.selectedOblast).then(function (data) {
                vm.rayons = data.data;
            }, function(err, status) {
                console.log("there was an error " + err);
            });
        }


        vm.getVillages = function() {

            /* Populates the options for the villages selector. Resets the selected village every time a new rayon is selected.
               Resets village details every time a new rayon is selected. Resets visit array every time a new rayon is selected.
               Resets header for the 'visits' section */

            vm.selectedVillage = "";
            vm.villageDetails = "";
            vm.visitArray = [];
            vm.visitHeader = "";

            locationData.getVillages(vm.selectedRayon).then(function(data){
                vm.villages = data.data;
            }, function(err, status){
                console.log("There was an error " + err)
            })
        };

        vm.selectVillage = function() {

            /* Resets village details. Resets 'visits' array. Calls 'setVisitsArray' function. Updates map with
               coordinates from the selected village. */

            vm.villageDetails = "";

            locationData.getOne(vm.selectedVillage).then(function(data) {

                vm.visitArray = [];
                vm.villageDetails = data.data;

                vm.setVisitsArray();

                vm.updateMap('map-wrap--map');

            }, function(err, status) {
                console.log("There was an error " + status + err);
            });
        };

        vm.setVisitsArray = function() {

            /* Sets the text of the visit header. If the village 'visit' array has stored elements, this retrieves the documents for each visit from db  */

            if (vm.villageDetails.visits.length === 0) {
                vm.visitHeader = "Be the first to add a visit";
            } else {

                vm.visitHeader = "Visits:";

                let visits = JSON.stringify(vm.villageDetails.visits);

                locationData.getVisits(visits).then((res) => {
                    vm.visitArray = res.data;
                }, (err)=>{
                        alert("Something went wrong" + err);
                    });
            }
        };

        vm.updateMap = function(mapId) {

            //Instantiates a new Google map with location data from the selected village.
            vm.selectedTitle = vm.villageDetails.Name;

            vm.selectedCoords = {

                lat: vm.villageDetails.loc.coordinates[1],
                lng: vm.villageDetails.loc.coordinates[0]
            };
            vm.zoom = 8;

            window.initMap(vm.selectedCoords, vm.selectedTitle, vm.zoom, mapId);
        };


        vm.triggerFormSubmitError = function(message) {

            /* Opens a modal window with an error message if the visit submit form contains an error. */

            $("#villages-modal").scrollTop(0);
            vm.formErrorMsg = "";
            vm.formErrorMsg = message;

            vm.modalOpen('#form-error-modal');
        };

        vm.resetVisitForm = function() {
            //sets the default value of each field in the visit form. Set on page load and when forms are submitted.

            vm.visit = {};

            vm.visit.location = vm.villageDetails.Admin4;

            vm.visit.collector = null;

            vm.visit.collectorPhone = null;

            vm.visit.date = "mm/dd/yyyy";

            vm.visit.dateAdded = new Date();

            vm.visit.collectorEmail = null;

            vm.visit.org = null;

            vm.visit.source = null;

            vm.visit.sourcePhone = null;

            vm.visit.sourceRole = null;

            vm.visit.status = null;

            vm.visit.currentPop = null;

            vm.visit.prePop = null;

            vm.visit.authorities = {};

            vm.visit.indHouses = null;

            vm.visit.multiHouses = null;

            vm.visit.indLight = null;

            vm.visit.indMed = null;

            vm.visit.indHeavy = null;

            vm.visit.recon = null;

            vm.visit.multLightMed = null;

            vm.visit.indGas = null;

            vm.visit.indCentral = null;

            vm.visit.coalWood = null;

            vm.visit.electDisrupt = null;

            vm.visit.electDisruptFreq = null;

            vm.visit.waterDisrupt = null;

            vm.visit.waterDisruptFreq = null;

            vm.visit.gasDisrupt = null;

            vm.visit.gasDisruptFreq = null;

            vm.visit.transportationIssue = null;

            vm.visit.comTension = null;

            vm.visit.discrimination = null;

            vm.visit.trafficking = null;

            vm.visit.corruption = null;

            vm.visit.armedForces = null;

            vm.visit.forcedRecruit = null;

            vm.visit.freedomOfMovement = null;

            vm.visit.erws = null;

            vm.visit.idpReturneeRelationship = null;

            vm.visit.returneeChange = null;

            vm.visit.idpChange = null;

            vm.visit.assistance = {};

            vm.visit.assistanceOrgs = null;

            vm.visit.nfiNeed = null;

            vm.visit.deficits = null;

            vm.visit.commentary = null;

            //vm.visitArray = null;
        };

        vm.submitForm = function(event) {

            //logic for making sure required fields in the 'visit form' are filled in


            if (vm.visit.collector == null) {

                vm.triggerFormSubmitError('Please enter the name of the collector');

            } else if (vm.visit.collectorPhone == null) {

                vm.triggerFormSubmitError('Please enter a collector phone number');

            } else if (vm.visit.date == "mm/dd/yyyy" || vm.visit.date == "") {

                vm.triggerFormSubmitError('Please enter a visit date');

            }  else {
                    //logic for validating the visit date
                    let dateFormatArray = vm.visit.date.split("/");

                    if (dateFormatArray[0] > 12 || dateFormatArray <= 0) {
                        vm.triggerFormSubmitError("Sorry, looks like you entered an invalid date. " +
                            "Please make sure your visit date follows the format mm/dd/yyyy.");
                    } else if (dateFormatArray[1] > 31 || dateFormatArray <= 0) {
                        vm.triggerFormSubmitError("Sorry, looks like you entered an invalid date. " +
                            "Please make sure your visit date follows the format mm/dd/yyyy");
                    } else if (dateFormatArray[2] < 2017 || dateFormatArray[2] > 2100) {
                        vm.triggerFormSubmitError("Sorry, looks like you entered an invalid date. " +
                            "Please make sure your visit date follows the format mm/dd/yyyy");
                    } else {

                        let email = vm.visit.collectorEmail;

                        let test = /@/.test(email);

                        if (test == false) {
                            vm.triggerFormSubmitError('Please enter a valid email address for the collector');
                        } else {
                            //Creates a new date object for date on which this record was submitted
                            vm.visit.date = new Date(vm.visit.date);

                            locationData.addVisit(vm.visit).then(function (res) {

                                /*reloads information from the selected village, allowing the new visit to be rendered in the view,
                                then closes modal window */

                                vm.selectVillage();
                                vm.modalClose(event);
                            }, function (err) {
                                vm.triggerFormSubmitError("There was an error" + err);
                           });
                       }
                    }
                }
        };

        vm.modalOpen = function(id) {
            /*Opens modals. If the modal contains the village form,
            it resets the form or alerts the user with an error*/

            let modal = $(id);

            if (modal.attr('id') == 'villages-modal') {
                vm.resetVisitForm();
                modal.scrollTop(0);
                modal.addClass('visible');
            } else {
                modal.addClass('visible');
            }

        };

        vm.modalClose = function(event) {

            //closes modals

            let modal = $(event.target).closest('.modal');
            $(modal).removeClass('visible');
        };

        vm.openPrintModal = function(i) {
            /* Sets printVisit object based on User's choice. Opens a modal window
               presenting information from a given visit. Instantiates a new Google map
               object in the print modal. */

            vm.printVisit = i;
            vm.printVisit.name = vm.selectedTitle;

            vm.modalOpen('#form-print-modal');

            window.initMap(vm.selectedCoords, vm.selectedTitle, 10, 'map2');
        };

        window.initMap = function(coords, title, zoom, elementId) {

            //Creates a new Google maps object.

            let center = coords;
            let map = new google.maps.Map(document.getElementById(elementId), {
                zoom: zoom,
                center: center
            });

            let myParser = new geoXML3.parser({map: map, zoom:false});
            myParser.parse('/data/contact-line.kml');

            let marker = new google.maps.Marker({
                position: center,
                title: title,
                map: map

            });
        };

        vm.printVisitEvent = function() {

            /* Opens a new window. Copies the html from the long-form visit report to the new window.
               prints the contents of the page after 1 second.  */

                let bodyContent = $('#form-print-modal-inner').html();

                w = window.open();

                w.document.write('<link rel="stylesheet" type="text/css" ' +
                    'href="/styles/css/main.css"><html id="print-html">' +
                    '<body id="print-body">' + bodyContent +
                    '<script type="text/javascript">setTimeout(function() {window.print()}, 1000)</script></body></html>');
            };

        vm.init = function() {
            let outer = document.querySelector('body');
            let APIkey = "AIzaSyB-BMdJfbacQPY_m3yy3-o7VALgeI9vbEY";
            let script = document.createElement('script');
            script.onload = function() {
                window.initMap(vm.selectedCoords, vm.selectedTitle, vm.zoom, 'map-wrap--map');
            };
            script.src = "https://maps.googleapis.com/maps/api/js?key=" + APIkey;
            script.async = true;
            script.defer = true;
            outer.appendChild(script);
        };

        vm.init();
    };
};