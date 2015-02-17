/*jslint node:true*/
var fs = require('fs');
var http = require('http');
//var https = require('https');
var session = require('koa-generic-session');
var RedisStore = require('koa-redis');
var Primus = require('primus');
var validator = require('validator');
var redisstore = new RedisStore({'port': 6379});
var co = require('co');
var Rooms = require('primus-rooms');
var compress = require('koa-compressor');
var etag = require('koa-etag');
//var spdy = require('spdy');
//var primusSession = require('./session');
//This file has all the configurations of the app such as each and every aspect of the framework

var config = require('./config/app');

function parseCookies(cookie) {
    var list = {},
        rc = cookie;

    rc && rc.split(';').forEach(function(cookie) {
        var parts = cookie.split('=');
    });

    return list;
}
//load coviews module forloading templates
//var views = require('./views/index');

//load route module for loading routes
var route = require('./route.js');

//load logger module for loading logger
var logger = require('koa-logger');

//mount different koa app
var mount = require('koa-mount'),
    jsonp = require("koa-jsonp"),
    mongoose = require('mongoose');

//load koa
var koa = require('koa');
var app = module.exports = koa();
app.use(compress());

//set the session options
app.keys = ['random-secret', 'hahaha'];
app.use(session({
    store: redisstore
}));

// development only
if ('development' == app.env) {
        config.database.port = 27017;
        config.database.url = '127.0.0.1';
        config.database.username = '';
    }
if (config.database.username) {
    mongoose.connect('mongodb://' + config.database.username + ':' + config.database.password + '@' + config.database.url + ':' + config.database.port + '/test');
    var db = mongoose.connection;
    db.once('open', function callback() {
        console.log("MongoDB Connection is opened");
    });
} else {
    mongoose.connect('mongodb://' + config.database.url + ':' + config.database.port + '/test');
    var db = mongoose.connection;
    db.once('open', function callback() {
        console.log("MongoDB Connection is opened");
    });
}
// MongoDB Error Handling
db.on('error', console.error.bind(console, 'connection error:'));


//use the passport


//load the views
//app.use(mount(views));


// Initiate logger


app.use(mount(route));
app.use(etag());

app.use(logger());


app.use(jsonp());


var server = http.createServer(app.callback());

var newutil = require('./newutil.js');

var map_find = newutil.findmap;
var create_project = newutil.createproject;
var create_map = newutil.createmap;
var find_project = newutil.findproject;
var add_node = newutil.addnode;
var delete_project = newutil.deleteproject;
var edit_map = newutil.editmap;
var edit_node = newutil.editnode;
var delete_map = newutil.deletemap;
var user_info = newutil.userinfo;
var user_tasks = newutil.usertasks;
var user_projects = newutil.userprojects;
var del_node = newutil.delnode;
var add_chat = newutil.addchat;
var get_chat = newutil.getchat;
var add_vote = newutil.addvote;
var get_vote = newutil.getvote;
var add_users = newutil.adduserz;
var remove_users = newutil.removeuserz;
var reset_map = newutil.resetmap;
var user_not = newutil.usernot;
var not_read = newutil.notread;
var coupun = newutil.coupun;

var primus = new Primus(server, {
    redis: {
        host: 'localhost',
        port: 6379,
        channel: 'primus' // Optional, defaults to `'primus`'
    },
    transformer: 'sockjs',
    parser: 'JSON',
    pathname: '/realtime',
});
primus.use('redis', Rooms);
primus.library();
primus.save(__dirname + '/public/js/primus.js');

primus.on('connection', function(spark) {
    var sss = parseCookies(spark.headers.cookie);
    var sis = sss['koa.sid'];
    var prefix = 'koa:sess:';
    var ses;
    co(function * () {
        try {
            ses = yield redisstore.get(prefix + sis);

            if (ses) {
                //console.log(ses); 
                spark.user = ses.passport.user;
            } else {
                spark.end();
            }
        } catch (err) {
            if (err.code === 'ENOENT') {
                console.log('get session error, code = ENOENT')
            } else {
                spark.end();
                return {
                    status: 500,
                    message: 'get session from store error'
                };
            }
        }
    })();

    // send Connect message to one connect client
    spark.write("CONNECT");
    // receive data
    spark.on("data", function data(packet) {
        console.log(packet);
        switch (packet.action) {
            case "user_not":
                {
                    co(function * () {
                        var user = spark.user;
                        var uzer = yield user_not(user);
                        if (uzer.notice) {
                            spark.write({
                                action: "notice",
                                data: uzer.notice
                            });
                        } else {
                            spark.write({
                                action: "user_not",
                                data: uzer
                            })
                        }
                    })();
                }
                break;
            case "open_map":
                {
                    co(function * () {
                        var user = {};
                        user.id = spark.user;
                        user.p = packet.data;
                        var map = yield map_find(user);
                        if (map.notice) {
                            spark.write({
                                action: "notice",
                                data: map.notice
                            });
                        } else {
                            if (~spark.rooms().indexOf(packet.scope.pid)) {
                                spark.room(packet.scope.pid).write({
                                    action: "open_map",
                                    data: map,
                                    info: {
                                        pid: user.p.pid,
                                        m_n: user.p.m_n
                                    },
                                    scope: {
                                        pid: packet.scope.pid
                                    }
                                });
                            } else {
                                spark.join(packet.scope.pid, function() {
                                    spark.room(packet.scope.pid).write({
                                        action: "open_map",
                                        data: map,
                                        info: {
                                            pid: user.p.pid,
                                            m_n: user.p.m_n
                                        },
                                        scope: {
                                            pid: packet.scope.pid
                                        }
                                    });
                                });
                            }
                        }
                    })();
                }
                break;
            case "join_room":
                {
                    https: //github.com/bhanuc/jutja/issues/90
                    if (~spark.rooms().indexOf(packet.scope.pid)) {
                        spark.room(packet.scope.pid).write({
                            action: "join_room",
                            value: "already-joined",
                            scope: {
                                pid: packet.scope.pid
                            }
                        });
                    } else {
                        spark.join(packet.scope.pid, function() {
                            spark.room(packet.scope.pid).write({
                                action: "join_room",
                                value: "joined",
                                scope: {
                                    pid: packet.scope.pid
                                }
                            });
                        });
                    }
                }
                break;
            case "get_id":
                {
                    if (spark.user) {
                        spark.write({
                            action: "get_id",
                            id: spark.user
                        });
                    } else {
                        spark.write({
                            action: "get_id",
                            id: null
                        });
                    }
                }
                break;
            case "add_users":
                {
                    co(function * () {
                        var proj = {};
                        proj.user = spark.user;
                        proj.data = packet.data;
                        var stat = yield add_users(proj);
                        if (stat.notice) {
                            spark.write({
                                action: "notice",
                                data: stat.notice,
                                stat: stat.stat
                            });
                        } else {
                            spark.write({
                                action: "add_users",
                                data: stat,
                                info: {
                                    pid: proj.data.pid,
                                    m_n: proj.data.m_n,
                                    id: spark.user
                                }
                            })
                        }
                    })();
                }
                break;
            case "remove_users":
                {
                    co(function * () {
                        var proj = {};
                        proj.user = spark.user;
                        proj.data = packet.data;
                        var stat = yield remove_users(proj);
                        if (stat.notice) {
                            spark.write({
                                action: "notice",
                                data: stat.notice
                            });
                        } else {
                            spark.write({
                                action: "remove_users",
                                data: stat,
                                info: {
                                    pid: proj.data.pid,
                                    m_n: proj.data.m_n,
                                    id: spark.user
                                }
                            })
                        }
                    })();
                }
                break;
            case "user_info":
                {
                    co(function * () {
                        var user = spark.user;
                        var uzer = yield user_info(user);
                        if (uzer.notice) {
                            spark.write({
                                action: "notice",
                                data: uzer.notice
                            });
                        } else {
                            spark.write({
                                action: "user_info",
                                data: uzer
                            })
                        }
                    })();
                }
                break;
            case "not_read":
                {
                    co(function * () {
                        var user = {}
                        user.id = spark.user;
                        user.data = packet.data;
                        var uzer = yield not_read(user);
                        if (uzer.notice) {
                            spark.write({
                                action: "notice",
                                data: uzer.notice
                            });
                        } else {
                            spark.write({
                                action: "not_read",
                                data: uzer
                            })
                        }
                    })();
                }
                break;
            case "user_tasks":
                {
                    co(function * () {
                        var user = {};
                        user = spark.user;
                        var user = yield user_tasks(user);
                        if (user.notice) {
                            spark.write({
                                action: "notice",
                                data: user.notice
                            });
                        } else {
                            spark.write({
                                action: "user_task",
                                data: user
                            })
                        }
                    })();
                }
                break;
            case "user_projects":
                {
                    co(function * () {
                        var user = {};
                        user = spark.user;
                        var user = yield user_projects(user);
                        if (user.notice) {
                            spark.write({
                                action: "notice",
                                data: user.notice
                            });
                        } else {
                            spark.write({
                                action: "user_projects",
                                data: user
                            })
                        }
                    })();
                }
                break;
            case "collaborator":
                {
                    co(function * () {
                        var proj = {};
                        proj.creator = spark.user;
                        proj.data = packet.data;
                        var project = yield find_project(proj);
                        if (project.notice) {
                            spark.write({
                                action: "notice",
                                data: project.notice
                            });
                        } else {
                            spark.write({
                                action: "collaborator",
                                data: project
                            });
                        }
                    })();
                }
                break;
            case "new_project":
                {
                    co(function * () {
                        var user = {};
                        user.id = spark.user;
                        user.data = packet.data;
                        var proj = yield create_project(user);
                        if (proj.notice) {
                            spark.write({
                                action: "notice",
                                data: proj.notice
                            });
                        } else {
                            spark.write({
                                action: "new_project",
                                data: proj
                            })
                        }
                    })();
                }
                break;
            case "new_map":
                {
                    co(function * () {
                        var map = {};
                        map.creator = spark.user;
                        map.data = packet.data;
                        var mapa = yield create_map(map);
                        if (mapa.hasOwnProperty('notice')) {
                            spark.write({
                                action: "notice",
                                data: mapa.notice
                            });
                        } else {
                            if (~spark.rooms().indexOf(packet.scope.pid)) {
                                spark.room(packet.scope.pid).write({
                                    action: "new_map",
                                    map: mapa,
                                    scope: {
                                        pid: packet.scope.pid
                                    }
                                });
                            } else {
                                spark.join(packet.scope.pid, function() {
                                    spark.room(packet.scope.pid).write({
                                        action: "new_map",
                                        map: mapa,
                                        scope: {
                                            pid: packet.scope.pid
                                        }
                                    });
                                });
                            }
                        }
                    })();
                }
                break;
            case "del_node":
                {
                    co(function * () {
                        var node = {};
                        node.editor = spark.user;
                        node.data = packet.data;
                        var mapa = yield del_node(node);
                        if (mapa.hasOwnProperty('notice')) {
                            spark.write({
                                action: "notice",
                                data: mapa.notice
                            });
                        } else {
                            if (~spark.rooms().indexOf(packet.scope.pid)) {
                                spark.room(packet.scope.pid).write({
                                    action: "del_node",
                                    msg: mapa,
                                    data: node.data,
                                    scope: {
                                        pid: packet.scope.pid,
                                        m_n: packet.scope.m_n
                                    }
                                });
                            } else {
                                spark.join(packet.scope.pid, function() {
                                    spark.room(packet.scope.pid).write({
                                        action: "del_node",
                                        msg: mapa,
                                        data: node.data,
                                        scope: {
                                            pid: packet.scope.pid,
                                            m_n: packet.scope.m_n
                                        }
                                    });
                                });
                            }
                        }
                    })();
                }
                break;
            case "reset_map":
                {
                    co(function * () {
                        var map = {};
                        map.editor = spark.user;
                        map.data = packet.data;
                        var mapa = yield reset_map(map);
                        if (mapa.hasOwnProperty('notice')) {
                            spark.write({
                                action: "notice",
                                data: mapa.notice
                            });
                        } else {
                            if (~spark.rooms().indexOf(packet.scope.pid)) {
                                spark.room(packet.scope.pid).write({
                                    action: "reset_map",
                                    data: mapa,
                                    scope: {
                                        pid: packet.scope.pid,
                                        m_n: packet.scope.m_n
                                    }
                                });
                            } else {
                                spark.join(packet.scope.pid, function() {
                                    spark.room(packet.scope.pid).write({
                                        action: "reset_map",
                                        data: mapa,
                                        scope: {
                                            pid: packet.scope.pid,
                                            m_n: packet.scope.m_n
                                        }
                                    });
                                });
                            }
                        }
                    })();
                }
                break;
            case "view_project":
                {
                    co(function * () {
                        var proj = {};
                        proj.creator = spark.user;
                        proj.data = packet.data;
                        var project = yield find_project(proj);
                        if (project.notice) {
                            spark.write({
                                action: "notice",
                                data: project.notice
                            });
                        } else {
                            spark.write({
                                action: "view_project",
                                data: project
                            });
                        }
                    })();
                }
                break;
            case "add_node":
                {
                    co(function * () {
                        var node = {};
                        node.creator = spark.user;
                        node.data = packet.data;
                        var new_node = yield add_node(node);
                        if (new_node.notice) {
                            spark.write({
                                action: "notice",
                                data: new_node.notice
                            });
                        } else {
                            if (~spark.rooms().indexOf(packet.scope.pid)) {
                                spark.room(packet.scope.pid).write({
                                    action: "add_node",
                                    data: new_node,
                                    scope: {
                                        pid: packet.scope.pid,
                                        m_n: packet.scope.m_n
                                    }
                                });
                            } else {
                                spark.join(packet.scope.pid, function() {
                                    spark.room(packet.scope.pid).write({
                                        action: "add_node",
                                        data: new_node,
                                        scope: {
                                            pid: packet.scope.pid,
                                            m_n: packet.scope.m_n
                                        }
                                    });
                                });
                            }
                        }
                    })();
                }
                break;
            case "chat":
                {
                    co(function * () {
                        var chat = {};
                        chat.creator = spark.user;
                        chat.data = packet.data;
                        chat.data.mention = packet.mention;
                        var chata = yield add_chat(chat);
                        if (chata.notice) {
                            spark.write({
                                action: "notice",
                                data: chata.notice
                            });
                        } else {
                            if (~spark.rooms().indexOf(packet.scope.pid)) {
                                spark.room(packet.scope.pid).write({
                                    action: "chat",
                                    data: chata,
                                    scope: {
                                        pid: packet.scope.pid,
                                        m_n: packet.scope.m_n
                                    },
                                    i_no: chat.data.i_no
                                });
                            } else {
                                spark.join(packet.scope.pid, function() {
                                    spark.room(packet.scope.pid).write({
                                        action: "chat",
                                        data: chata,
                                        scope: {
                                            pid: packet.scope.pid,
                                            m_n: packet.scope.m_n
                                        }
                                    });
                                });
                            }
                        }
                    })();
                }
                break;
            case "vote":
                {
                    co(function * () {
                        var vote = {};
                        vote.creator = spark.user;
                        vote.data = packet.data;
                        var chata = yield add_vote(vote);
                        if (chata.notice) {
                            spark.write({
                                action: "notice",
                                data: chata.notice
                            });
                        } else {
                            if (~spark.rooms().indexOf(packet.scope.pid)) {
                                spark.room(packet.scope.pid).write({
                                    action: "vote",
                                    data: chata,
                                    scope: {
                                        pid: packet.scope.pid,
                                        m_n: packet.scope.m_n
                                    }
                                });
                            } else {
                                spark.join(packet.scope.pid, function() {
                                    spark.room(packet.scope.pid).write({
                                        action: "vote",
                                        data: chata,
                                        scope: {
                                            pid: packet.scope.pid,
                                            m_n: packet.scope.m_n
                                        }
                                    });
                                });
                            }
                        }
                    })();
                }
                break;
            case "get_vote":
                {
                    co(function * () {
                        var vote = {};
                        vote.creator = spark.user;
                        vote.data = packet.data;
                        var chata = yield get_vote(vote);
                        if (chata.notice) {
                            spark.write({
                                action: "notice",
                                data: chata.notice
                            });
                        } else {
                            if (~spark.rooms().indexOf(packet.scope.pid)) {
                                spark.room(packet.scope.pid).write({
                                    action: "get_vote",
                                    data: chata,
                                    scope: {
                                        pid: packet.scope.pid,
                                        m_n: packet.scope.m_n
                                    }
                                });
                            } else {
                                spark.join(packet.scope.pid, function() {
                                    spark.room(packet.scope.pid).write({
                                        action: "get_vote",
                                        data: chata,
                                        scope: {
                                            pid: packet.scope.pid,
                                            m_n: packet.scope.m_n
                                        }
                                    });
                                });
                            }
                        }
                    })();
                }
                break;
            case "get_chat":
                {
                    co(function * () {
                        var chat = {};
                        chat.creator = spark.user;
                        chat.data = packet.data;
                        var chata = yield get_chat(chat);
                        if (chata.notice) {
                            spark.write({
                                action: "notice",
                                data: chata.notice
                            });
                        } else {
                            if (~spark.rooms().indexOf(packet.scope.pid)) {
                                spark.room(packet.scope.pid).write({
                                    action: "get_chat",
                                    data: chata,
                                    scope: {
                                        pid: packet.scope.pid,
                                        m_n: packet.scope.m_n
                                    }
                                });
                            } else {
                                spark.join(packet.scope.pid, function() {
                                    spark.room(packet.scope.pid).write({
                                        action: "get_chat",
                                        data: chata,
                                        scope: {
                                            pid: packet.scope.pid,
                                            m_n: packet.scope.m_n
                                        }
                                    });
                                });
                            }
                        }
                    })();
                }
                break;
            case "edit_node":
                { //tobedone
                    co(function * () {
                        var node = {};
                        node.editor = spark.user;
                        node.data = packet.data;
                        var new_node = yield edit_node(node);
                        if (new_node.notice) {
                            spark.write({
                                action: "notice",
                                data: new_node.notice
                            });
                        } else {
                            if (~spark.rooms().indexOf(packet.scope.pid)) {
                                spark.room(packet.scope.pid).write({
                                    action: "edit_node",
                                    data: new_node,
                                    scope: {
                                        pid: packet.scope.pid,
                                        m_n: packet.scope.m_n
                                    }
                                });
                            } else {
                                spark.join(packet.scope.pid, function() {
                                    spark.room(packet.scope.pid).write({
                                        action: "edit_node",
                                        data: new_node,
                                        scope: {
                                            pid: packet.scope.pid,
                                            m_n: packet.scope.m_n
                                        }
                                    });
                                });
                            }
                        }
                    })();
                }
                break;
            case "delete_map":
                {
                    co(function * () {
                        var node = {};
                        node.editor = spark.user;
                        node.data = packet.data;
                        var new_node = yield delete_map(node);
                        if (new_node.notice) {
                            spark.write({
                                action: "notice",
                                data: new_node.notice
                            });
                        } else {
                            spark.write({
                                action: "delete_map",
                                data: new_node
                            })
                        }
                    })();
                }
                break;

            case "delete_project":
                {
                    co(function * () {
                        var proj = {};
                        proj.owner = spark.user;
                        proj.data = packet.data;
                        var del_proj = yield delete_project(proj);
                        if (del_proj.notice) {
                            spark.write({
                                action: "notice",
                                data: del_proj.notice
                            });
                        } else {
                            spark.write({
                                action: "delete_project",
                                data: del_proj
                            })
                        }
                    })();
                }
                break;
            case "edit_map":
                {
                    co(function * () {
                        var map = {};
                        map.creator = spark.user;
                        map.data = packet.data;
                        var map1 = yield edit_map(map);
                        if (map1.notice) {
                            spark.write({
                                action: "notice",
                                data: map1.notice
                            });
                        } else {
                            if (~spark.rooms().indexOf(packet.scope.pid)) {
                                spark.room(packet.scope.pid).write({
                                    action: "edit_map",
                                    map1: map1,
                                    scope: {
                                        pid: packet.scope.pid,
                                        m_n: packet.scope.m_n
                                    }
                                });
                            } else {
                                spark.join(packet.scope.pid, function() {
                                    spark.room(packet.scope.pid).write({
                                        action: "edit_map",
                                        map1: map1,
                                        scope: {
                                            pid: packet.scope.pid,
                                            m_n: packet.scope.m_n
                                        }
                                    });
                                });
                            }
                        }
                    })();
                }
                break;
            case "coupun":
                {
                    co(function * () {
                        var coupun = packet.data;
                        coupun.user = spark.user;
                        var uzer = yield coupun(coupun);
                        if (uzer.notice) {
                            spark.write({
                                action: "notice",
                                data: uzer.notice
                            });
                        } else {
                            spark.write({
                                action: "user_coupun",
                                data: uzer
                            })
                        }
                    })();
                }
                break;
        }

        // broadcast all client
        if (packet === 'end') spark.end();

        /**
    if(packet.join) {
        console.log('join',packet);
        spark.join(packet.join);
        spark.room = packet.join;
    } else if (packet.room) {
       console.log('room',packet);
        primus.room(packet.room).write(packet.chat);
    } else if (packet.echo) {
        spark.write(packet.echo);
    } else {
    primus.write(validator.escape(JSON.stringify(packet)));
} **/
    });
});


// disconnect hook
primus.on('disconnection', function(spark) {
    console.log("disconnection");
});

server.listen(2500);
/**
if (!module.parent) {
    app.listen(80);
    console.log("Jutja is up and running");
}
app.port = 80;
app.name = "jutja";
**/



