/*jslint node:true*/
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    oAuthTypes = ['github', 'twitter', 'facebook', 'google', 'linkedin'];


var User_schema = new Schema({
    fname: {
        type: String,
        default: ''
    },
    lname: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    hash: {
        type: String,
        default: ''
    },
    salt: {
        type: String,
        default: ''
    },
    gravatar: {
        type: String,
        default: ''
    },
    authToken: {
        type: String,
        default: ''
    },
    madeon: {
        type: Date
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    twitter: {},
    github: {},
    google: {},
    linkedin: {},
    not: {
        type: Schema.Types.Mixed,
        default: {}
    },
    coupun: {
        type: Schema.Types.Mixed,
        default: {}
    },
    ref: {
        type: Schema.Types.Mixed,
        default: {}
    },
    team: {
        type: Schema.Types.Mixed,
        default: {}
    },
    projects: {
        type: Schema.Types.Mixed,
        default: {}
    },
    oproj: {
        type: Schema.Types.Mixed,
        default: {}
    },
    pic: {
        type: Schema.Types.Mixed,
        default: {}
    },
    tasks: {
        type: Schema.Types.Mixed,
        default: {}
    },
    payment: {
        type: Schema.Types.Mixed,
        default: {}
    }
});


mongoose.model('User', User_schema);
var User = mongoose.model('User');

//pre save hooks

User_schema.pre('save', function(next) {
    var now = new Date();
    // this.updated_at = now;
    if (!this.madeon) {
        this.madeon = now;
    }
    next();
});


exports.User = User;