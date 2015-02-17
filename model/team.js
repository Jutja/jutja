/*jslint node:true*/
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Team_schema = new Schema({
    name : { type: String, default: ''},
    owners : [],
    members : [],
});

mongoose.model('Team', Team_schema);
var Team = mongoose.model('Team');

exports.Team = Team;