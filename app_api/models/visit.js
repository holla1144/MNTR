/**
 * Created by Master on 29-Apr-17.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var visitschema = new Schema({

    location: {
        required: true,
        type: Number
    },

    location_admin4_en: {
        required: true,
        type: String
    },

    location_admin2_en: {
        required: true,
        type: String
    },

    location_admin2_code: {
        required: true,
        type: Number
    },

    location_admin1_en: {
        required: true,
        type: String
    },

    location_admin1_code: {
        required: true,
        type: Number
    },

    collector_name: {
        required: true,
        type: String
    },
    date: {
        required: true,
        type: Date
    },
    date_added: {
        required: true,
        type: Date
    },
    collector_phone: {
        required: true,
        type: String
    },
    collector_email: {
        required: true,
        type: String
    },
    org: String,

    source_name: String,

    source_phone: Number,

    source_role: String,

    village_status: String,

    population_current: Number,

    population_pre: Number,

    authorities: Object,

    ind_houses: Number,

    multi_houses: Number,

    ind_houses_light: Number,

    ind_houses_medium: Number,

    ind_houses_heavy: Number,

    ind_houses_recon: Number,

    multi_light_med: Number,

    gas: Number,

    central: Number,

    coal_wood: Number,

    fuel: Boolean,

    elect_disrupt: Boolean,

    elect_disrupt_freq: String,

    water_disrupt: Boolean,

    water_disrupt_freq: String,

    gas_disrupt: Boolean,

    gas_disrupt_freq: String,

    transport: Boolean,

    transport_detail: String,

    infrastructure_detail: String,

    tension: Boolean,

    expropriation: Boolean,

    discrimination: Boolean,

    trafficking: Boolean,

    corruption: Boolean,

    armed_forces: Boolean,

    forced_recruit: Boolean,

    freedom_of_movement: Boolean,

    erw: Boolean,

    protection_detail: String,

    idp_host_relationship: String,

    returnees_change: String,

    idps_change: String,

    assistance_type: Object,

    assistance_orgs: String,

    nfi_need: String,

    deficits: Object,

    commentary: String



})

module.exports = mongoose.model('visit', visitschema, 'visits');