/*jslint node:true*/
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Project_schema = new Schema({
    name : { type: String, default: ''},
    description : { type: String, default: ''},
    madeon : { type : Date, default: Date.now },
    milestones : {},
    users : {},
    kind : { type: String, default: ''},
    maps: { type: Schema.Types.Mixed, default: {}},
    createdby: { type: String, default: ''}
});

mongoose.model('Project', Project_schema);
var Project = mongoose.model('Project');

//pre save hooks

Project_schema.pre('save', function (next) {
  //some pre hooks
    next();
});


exports.Project = Project;