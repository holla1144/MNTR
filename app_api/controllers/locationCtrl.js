 let mongoose = require('mongoose'),
    Village = require('../models/village'),
    Visit = require('../models/visit'),
    Rayon = require('../models/rayons'),
    URI = 'mongodb://localhost/va-app';



 let sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.getRayons = function(req, res) {
    let oblastID = req.params.oblastId;
    let query = Rayon.find({'Admin1': oblastID}).sort({'Name': 1});


    query.exec(function(err, rayons) {
        if (err) {
            console.log(err);
            sendJSONresponse(res. status, {
                "message": "Something went wrong"
            })
        } else if (!rayons){
            console.log("Could not retrieve rayons");
            sendJSONresponse(res, 404, {
                "message": "Rayons not found"
            })
        } else {
            sendJSONresponse(res, 200, rayons)
        }
    })

};

module.exports.getVillages = function(req, res) {

    let rayonId = req.params.rayonId;

    let query = Village.find({'Admin2': rayonId}).sort({'Name': 1});

    console.log("getVillages controller connected to va-app DB");


    query.exec(function (err, villages) {
        if (err) {
            sendJSONresponse(res, 404, {
                "message": "Sorry, something went wrong"
            })
        } else if (!villages) {
            sendJSONresponse(res, 404, {
                "message": "Couldn't find villages"
            })
        } else {
            sendJSONresponse(res, 200, villages);

        }
     })


};

module.exports.getOne = function(req, res) {

    let villageId = req.params.villageId;

    let query = Village.findOne({'Admin4': villageId});

    query.exec(function(err, village) {
        if (err) {
            sendJSONresponse(res, 404, {
                "message": "Something went wrong"
            })
        } else if (!village){
            sendJSONresponse(res, 404, {
                "message": "We couldn't find the village you are looking for"
            })
        } else {
            sendJSONresponse(res, 200, village);
        }
    })

};

module.exports.addVisit = function(req, res){


    let visit = new Visit ({
        location: req.body.location,
        collector_name: req.body.collector,
        date: req.body.date,
        date_added: req.body.dateAdded,
        collector_phone: req.body.collectorPhone,
        collector_email: req.body.collectorEmail,
        org: req.body.org,
        source_name: req.body.source,
        source_phone: req.body.sourcePhone,
        source_role: req.body.sourceRole,
        village_status: req.body.status,
        population_current: req.body.currentpop,
        population_pre: req.body.prePop,
        authorities: req.body.authorities,
        ind_houses: req.body.indHouses,
        multi_houses: req.body.multiHouses,
        ind_houses_light: req.body.indLight,
        ind_houses_medium: req.body.indMed,
        ind_houses_heavy: req.body.indHeavy,
        ind_houses_recon: req.body.recon,
        multi_light_med: req.body.multLightMed,
        gas: req.body.indGas,
        central: req.body.indCentral,
        coal_wood: req.body.coalWood,
        fuel: req.body.fuelAvailable,
        elect_disrupt: req.body.electDisrupt,
        elect_disrupt_freq: req.body.electDisruptFreq,
        water_disrupt: req.body.waterDisrupt,
        water_disrupt_freq: req.body.waterDisruptFreq,
        gas_disrupt: req.body.gasDisrupt,
        gas_disrupt_freq: req.body.gasDisruptFreq,
        transport: req.body.transportationIssue,
        transport_detail: req.body.transportDetail,
        infrastructure_detail: req.body.infrastructureDetail,
        tension: req.body.comTension,
        expropriation: req.body.expropriation,
        discrimination: req.body.discrimination,
        trafficking: req.body.trafficking,
        corruption: req.body.corruption,
        armed_forces: req.body.armedForces,
        forced_recruit: req.body.forcedRecruit,
        freedom_of_movement: req.body.freedomOfMovement,
        erw: req.body.erws,
        protection_detail: req.body.protectionDetail,
        idp_host_relationship: req.body.idpReturneeRelationship,
        returnee_change: req.body.returneeChange,
        idps_change: req.body.idpChange,
        assistance_type: req.body.assistance,
        assistance_orgs: req.body.assistanceOrgs,
        nfi_need: req.body.nfiNeed,
        deficits: req.body.deficits,
        commentary: req.body.commentary

    });


    visit.save(function(err, visit) {
        if (err) {
            console.log(err);
        } else {
            let query = {Admin4: visit.location};
            Village.update(query, {$push: {visits: visit.id}}, function(err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    sendJSONresponse(res, 200, doc);
                }
            });
        }

    });



};

module.exports.getVisits = function(req, res) {

    let visitIds = JSON.parse(req.params.visitIds);

    let query = Visit.find({"_id" : {$in: visitIds}});

    query.exec(function(err, docs) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
        } else {
            sendJSONresponse(res, 200, docs);
        }
    })


};