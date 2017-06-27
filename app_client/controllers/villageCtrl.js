angular
    .module('vaApp')
        .controller('villageCtrl', villageCtrl)


function villageCtrl($location, locationData, authentication, $window, $scope) {
    var token = authentication.decodeToken();;
    let vm = this;

    if (!authentication.isLoggedIn()) {
        $location.path('/');
    } else {

        //vm.loc is a path that is used to generate the 'contact line' in Google static maps. It is composed of lng, lat pairs. 

        vm.loc = "48.5878889,39.6723016|48.5865845,39.6931424|48.5875512,39.6844304|48.5828914,39.6338449|48.5875527,39.619128|48.5750916,39.609064|48.5781734,39.5975752|48.5931966,39.6035286|48.5936245,39.591907|48.592704,39.569621|48.6002494,39.5600241|48.5871801,39.5470753|48.585863,39.5329372|48.5947255,39.5372006|48.5982716,39.5332648|48.6078383,39.5308738|48.6138994,39.5291578|48.6298267,39.5204161|48.6359723,39.5157901|48.6308475,39.4765508|48.6298298,39.4683517|48.6407555,39.4662526|48.6422262,39.4541653|48.658262,39.4488251|48.660239,39.4205651|48.6728696,39.4128207|48.6760214,39.4009326|48.6874263,39.3829074|48.7013531,39.356792|48.714196,39.3645823|48.7158112,39.3764073|48.7264064,39.3578398|48.7348017,39.3630979|48.7599096,39.3483747|48.7628389,39.3552169|48.7703383,39.3470912|48.7679173,39.3363306|48.7779273,39.3246237|48.7743899,39.3067239|48.7519506,39.2863987|48.7511299,39.2805649|48.7446718,39.2688198|48.7438382,39.261871|48.7331803,39.2558943|48.719536,39.250417|48.7134189,39.233245|48.7079347,39.221906|48.7041204,39.2012901|48.7084941,39.1987004|48.6946215,39.1827166|48.6849068,39.1760821|48.6758261,39.1446981|48.6653878,39.1388352|48.6620976,39.1230214|48.652843,39.106736|48.653212,39.079785|48.6493577,39.0560179|48.6541277,39.0343388|48.6583368,39.0211201|48.6619654,39.0176367|48.6613169,39.0292971|48.679469,39.021929|48.6946678,39.0190353|48.712939,39.000692|48.712373,38.992882|48.7166976,39.002114|48.7282917,38.9991946|48.745646,38.9712851|48.748271,38.9593046|48.7359536,38.9547054|48.7372183,38.9361465|48.7483222,38.9403041|48.7474767,38.9326603|48.7485977,38.914294|48.7524407,38.9014911|48.7515005,38.8581627|48.745082,38.832374|48.7043467,38.8239413|48.712928,38.77667|48.7164413,38.6973372|48.7129238,38.6633226|48.671693,38.52047|48.6412427,38.4398194|48.583648,38.40374|48.488061,38.406581|48.4013622,38.2783019|48.423049,38.208046|48.4192558,38.0441032|48.3964051,38.005056|48.3566112,37.924384|48.2947205,37.8933169|48.204003,37.837751|48.151852,37.8069618|48.10848,37.7856201|48.0907551,37.7543578|48.0577166,37.6807105|47.9879328,37.5301137|47.906529,37.538985|47.8430564,37.5753311|47.7264663,37.6114488|47.661341,37.77797|47.5314715,37.7925108|47.5104152,37.8166384|47.4678668,37.8870299|47.4361025,37.8671402|47.379079,37.8376537|47.3645264,37.8511788|47.3523648,37.8597941|47.343442,37.8545226|47.3126327,37.8345235|47.311035,37.825026|47.272576,37.8084204|47.2569789,37.8311093|47.1872594,37.7945368|47.162914,37.79283|47.096539,37.829404",

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
        vm.visitHeader = "Recently recorded visits:";
        vm.selectedOblast = "";
        vm.selectedOblastName = "";
        vm.recentVisits = "";
        vm.rayons = "";

        vm.selectedRayonName = "";
        vm.villages = "";
        vm.selectedVillage = "";
        vm.villageDetails = "";
        vm.visitArray = [];

        vm.setRecentVisits = function() {

            locationData.getRecentVisits().then(function(response) {
                vm.recentVisits = response.data.data;
            }, function(err) {
                console.log("There was an error " + err);
            });
        };

        vm.recentVisitHandler = function(e) {

            let data = JSON.parse($(e.target).attr('data-loc'));

            vm.selectedOblast = data.location_admin1_code;
            vm.getRayons();
            vm.selectedRayon = data.location_admin2_code;
            vm.getVillages();
            vm.selectedVillage = data.location;
            vm.selectVillage();

        };

        vm.getRayons = function () {

        /* Populates the options for the Rayon selector. Resets selected rayon every time a new oblast is selected.
            Resets 'selected rayon' every time a new oblast is selected. Resets villages in 'village' dropdown every time a
            rayon is selected. Resets selected village every time a new oblast is selected. Clears details of selected villages every time
            a new oblast is selected. Clears array of village objects every time a new oblast is selected. Resets header for visits section.*/

            vm.visitHeader = "Recently recorded visits:";
            vm.rayons = "";
            vm.selectedRayon = "";
            vm.villages = "";
            vm.selectedVillage = "";
            vm.villageDetails = "";
            vm.visitArray = [];

            for (let i of vm.oblasts) {
                if (i['pcode'] == vm.selectedOblast) {
                    vm.selectedOblastName = i['name'];
                    vm.visitHeader = "Recently recorded visits in " + vm.selectedOblastName + " oblast";
                };
            };

            locationData.getRayons(vm.selectedOblast).then(function (data) {
                vm.rayons = data.data;
            }, function(err) {
                console.log("there was an error " + err);
            });
        };

        vm.getVillages = function() {

            /* Populates the options for the villages selector. Resets the selected village every time a new rayon is selected.
               Resets village details every time a new rayon is selected. Resets visit array every time a new rayon is selected.
               Resets header for the 'visits' section */

            for (let i of vm.rayons) {
                if (i.Admin2 == vm.selectedRayon) {
                    vm.selectedRayonName = i.Name;
                } else {
                    vm.selectedRyonName = 'this';
                };
            };

            vm.visitHeader = "Recently recorded visits in " + vm.selectedOblastName + " oblast.";
            vm.selectedVillage = "";
            vm.villageDetails = "";
            vm.visitArray = [];

            vm.visitHeader = "Recently recorded visits in " + vm.selectedRayonName + " rayon";

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
            vm.visitArray = vm.visitArray = [];
            vm.visitHeader = "Recently recorded visits in " + vm.selectedRayonName + " rayon";


            locationData.getOne(vm.selectedVillage).then(function(data) {

                vm.villageDetails = data.data;

                vm.setVisitsArray();

                vm.updateMap('map-wrap--map');

            }, function(err, status) {
                console.log("There was an error " + status + err);
            });
        };

        vm.setVisitsArray = function() {

            /* Sets the text of the visit header. If the village 'visit' array has stored elements,
            this retrieves the documents for each visit from db  */

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

            vm.visit.locationName = vm.villageDetails.Name;

            vm.visit.locationRayon = vm.villageDetails.NameRada;

            vm.visit.codeRayon = vm.villageDetails.Admin2;

            vm.visit.locationOblast = vm.villageDetails.NameObl;

            vm.visit.codeOblast = vm.villageDetails.Admin1;

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
            let today = new Date();
            let visitDateTest =  new Date(vm.visit.date);

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
                    } else if (dateFormatArray[2] < 2017) {
                        vm.triggerFormSubmitError("Sorry, looks like you entered an invalid date. " +
                            "Please make sure your visit date follows the format mm/dd/yyyy" +
                            "and is between January 1st 2017 and today.");
                    } else if (visitDateTest > today) {
                        vm.triggerFormSubmitError("Your visit should have a date that is earlier " +
                            "than today.");
                    } else {

                        let email = vm.visit.collectorEmail

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
            modal.addClass('visible');
            modal.scrollTop(0);

            if (modal.attr('id') == 'villages-modal') {
                vm.resetVisitForm();
            } else {
               return;
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

        };

        vm.printBlankForm = function() {
            let bodyContent = $('visit-form').html();

            w = window.open();

            w.document.write('<link rel="stylesheet" type="text/css" ' +
                'href="/styles/css/main.css"><html id="print-html">' +
                '<body id="print-body">' + bodyContent +
                '<script type="text/javascript">setTimeout(function() {window.print()}, 1000)</script ></body></html>');
        }

        vm.printVisitEvent = function() {

            /* Opens a new window. Copies the html from the long-form visit report to the new window.
             prints the contents of the page after 1 second.  */

            let bodyContent = $('#form-content').html();

            w = window.open();

            w.document.write('<link rel="stylesheet" type="text/css" ' +
                'href="/styles/css/main.css"><html id="print-html">' +
                '<body id="print-body">' + bodyContent +
                '<script type="text/javascript">setTimeout(function() {window.print()}, 1000)</script ></body></html>');
        };

        window.initMap = function(coords, title, zoom, elementId) {

            //Creates a new Google maps object.

            let center = coords;
            let map = new google.maps.Map(document.getElementById(elementId), {
                zoom: zoom,
                center: center,
                disableDefaultUI: true,
            });

            let myParser = new geoXML3.parser({map: map, zoom:false});
            myParser.parse('/data/contact-line.kml');

            let marker = new google.maps.Marker({
                position: center,
                title: title,
                map: map,

            });
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
            vm.setRecentVisits();
        };

        vm.init();

    };
};