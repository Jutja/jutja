var Project = require('./model/project').Project;
var User = require('./model/user').User;
var recharges = require('./coup.js').coupuns;

var co = require('co');
//add separate proect delete method for creator
var removeusers = function(pid, pname, userids, creator) {
        return function(done) {
            var status = {
                uid: {},
                stat: {}
            };
            var useridz = Object.keys(userids);
            var length = useridz.length;
            useridz.forEach(function(key, index) {
                User.findOne({
                    '_id': key
                }, function(err, fuser) {
                    if (err) {
                        status.stat[fuser.email] = "Could not be deleted";
                        if (index === length - 1) {
                            done(null, status);
                        }
                    } else {
                        if (fuser) {
                            if (fuser._id == creator) {
                                delete fuser.projects[pid];
                                fuser.markModified('projects');
                                fuser.save(function save() {
                                    if (err) {
                                        status.stat[fuser.email] = "Project could not be deleted from this Owner's info. You can simply delete the project from their dashboard.Note:this happens very rarely";
                                        if (index === length - 1) {
                                            done(null, status);
                                        }
                                    } else {
                                        status.stat[fuser.email] = "deleted";
                                        status.uid[fuser._id] = fuser.email;
                                        if (index === length - 1) {
                                            done(null, status);
                                        }
                                    }
                                });
                            } else if (fuser.oproj.hasOwnProperty(pid)) {
                                delete fuser.oproj[pid];
                                fuser.markModified('oproj');
                                fuser.save(function save() {
                                    if (err) {
                                        status.stat[fuser.email] = "Project could not be deleted from this user's info. User can simply delete the project from their dashboard.Note:this happens very rarely";
                                        if (index === length - 1) {
                                            done(null, status);
                                        }
                                    } else {
                                        status.stat[fuser.email] = "deleted";
                                        status.uid[fuser._id] = fuser.email;
                                        if (index === length - 1) {
                                            done(null, status);
                                        }
                                    }
                                });
                            } else {
                                status.stat[fuser.email] = "already deleted";
                                if (index === length - 1) {
                                    done(null, status);
                                }
                            }
                        } else {
                            status.stat[fuser.email] = "User account has been deleted or has been tampered with . Please contact support If the account is still valid";
                            if (index === length - 1) {
                                done(null, status);
                            }
                        }
                    }
                });
            });
        }
    }
    // emails 
var removeusers2 = function(pid, pname, emails, creator, not) {
        return function(done) {
            var status = {
                uid: {},
                stat: {}
            };
            var emailz = Object.keys(emails);
            var length = emailz.length;
            emailz.forEach(function(key, index) {
                User.findOne({
                    'email': key
                }, function(err, fuser) {
                    if (err) {
                        status.stat[fuser.email] = "Could not be deleted";
                        if (index === length - 1) {
                            done(null, status);
                        }
                    } else {
                        if (fuser) {
                            if (fuser._id == creator) {
                                if (not && (not.editbyid != creator)) {
                                    var Nlength = fuser.not.length;
                                    if (!Nlength) {
                                        fuser.not = [];
                                        Nlength = 0;
                                    }
                                    fuser.not[Nlength] = {
                                        event: not.event,
                                        owner: {
                                            id: fuser._id,
                                            email: fuser.email
                                        },
                                        link: not.link,
                                        read: false,
                                        time: not.date,
                                        i_no: Nlength
                                    };
                                    fuser.markModified('not');
                                }
                                delete fuser.projects[pid];
                                fuser.markModified('projects');
                                fuser.save(function save() {
                                    if (err) {
                                        status.stat[fuser.email] = "Project could not be deleted from this Owner's info. You can simply delete the project from their dashboard.Note:this happens very rarely";
                                        if (index === length - 1) {
                                            done(null, status);
                                        }
                                    } else {
                                        status.stat[fuser.email] = "deleted";
                                        status.uid[fuser._id] = fuser.email;
                                        if (index === length - 1) {
                                            done(null, status);
                                        }
                                    }
                                });
                            } else if (fuser.oproj.hasOwnProperty(pid)) {
                                if (not) {
                                    var Nlength = fuser.not.length;
                                    if (!Nlength) {
                                        fuser.not = [];
                                        Nlength = 0;
                                    }
                                    fuser.not[Nlength] = {
                                        event: not.event,
                                        owner: {
                                            id: fuser._id,
                                            email: fuser.email
                                        },
                                        link: not.link,
                                        read: false,
                                        time: not.date,
                                        i_no: Nlength,
                                        type: 'del'
                                    };
                                    fuser.markModified('not');
                                }
                                delete fuser.oproj[pid];
                                fuser.markModified('oproj');
                                fuser.save(function save() {
                                    if (err) {
                                        status.stat[fuser.email] = "Project could not be deleted from this user's info. User can simply delete the project from their dashboard.Note:this happens very rarely";
                                        if (index === length - 1) {
                                            done(null, status);
                                        }
                                    } else {
                                        status.stat[fuser.email] = "deleted";
                                        status.uid[fuser._id] = fuser.email;
                                        if (index === length - 1) {
                                            done(null, status);
                                        }
                                    }
                                });
                            } else {
                                status.stat[fuser.email] = "already deleted";
                                if (index === length - 1) {
                                    done(null, status);
                                }
                            }
                        } else {
                            status.stat[fuser.email] = "User account has been deleted or has been tampered with . Please contact support If the account is still valid";
                            if (index === length - 1) {
                                done(null, status);
                            }
                        }
                    }
                });
            });
        }
    }
    // temp_project._id,temp_project.name,uzer.data.members, temp_project.createdby

var addusers = function(pid, pname, emails, creator, not) {
    return function(done) {
        var status = {};
        status.uid = {};
        status.stat = {};
        var emailz = Object.keys(emails);
        var length = emailz.length;
        if (length == 0) {
            done(null, status);
        };
        var i = 0;
        emailz.forEach(function(key) {
            User.findOne({
                'email': key
            }, function(err, fuser) {
                if (err) {
                    status.stat[key] = "Could not be added";
                    i++;
                    if (i === length) {
                        done(null, status);
                    }
                } else {
                    if (fuser) {
                        if (fuser._id == creator) {
                            status.stat[key] = "is the creator";
                            if (not && (not.editbyid != creator)) {
                                var Nlength = fuser.not.length;
                                if (!Nlength) {
                                    fuser.not = [];
                                    Nlength = 0;
                                }
                                fuser.not[Nlength] = {
                                    event: not.event,
                                    owner: {
                                        id: fuser._id,
                                        email: fuser.email
                                    },
                                    link: not.link,
                                    read: false,
                                    time: not.date,
                                    i_no: Nlength,
                                    type: 'add'
                                };
                                fuser.markModified('not');
                            }
                            if (!fuser.projects.hasOwnProperty(pid)) {
                                fuser.projects[pid] = pname;
                                fuser.markModified('projects');
                                fuser.save(function save() {
                                    if (err) {
                                        status.stat[key] = "Project could not be saved in this user's info. Please try again later or contact support";
                                        i++;
                                        if (i === length) {
                                            done(null, status);
                                        }
                                    } else {
                                        status.stat[key] = "Added";
                                        status.uid[fuser._id] = {
                                            'status': emails[key],
                                            'email': fuser.email
                                        };
                                        i++;
                                        if (i === length) {
                                            done(null, status);
                                        }
                                    }
                                })
                            } else {
                                i++;
                                if (i === length) {
                                    done(null, status);
                                }
                            }
                        } else if (fuser.oproj && fuser.oproj.hasOwnProperty(pid)) {
                            status.stat[key] = "User has already been added to this project";
                            i++;
                            if (i === length) {
                                done(null, status);
                            }
                        } else {
                            if (not) {
                                var Nlength = fuser.not.length;
                                if (!Nlength) {
                                    fuser.not = [];
                                    Nlength = 0;
                                }
                                fuser.not[Nlength] = {
                                    event: not.event,
                                    owner: {
                                        id: fuser._id,
                                        email: fuser.email
                                    },
                                    link: not.link,
                                    read: false,
                                    time: not.date,
                                    i_no: Nlength,
                                    type: 'add'
                                };
                                fuser.markModified('not');
                            }
                            fuser.oproj[pid] = pname;
                            fuser.markModified('oproj');
                            fuser.save(function save() {
                                if (err) {
                                    status.stat[key] = "Project could not be saved in this user's info. Please try again later or contact support";
                                    i++;
                                    if (i === length) {
                                        done(null, status);
                                    }
                                } else {
                                    status.stat[key] = "Added";
                                    status.uid[fuser._id] = {
                                        'status': emails[key],
                                        'email': fuser.email
                                    };
                                    i++;
                                    if (i === length) {
                                        done(null, status);
                                    }
                                }
                            })
                        }
                    } else {
                        status.stat[key] = "User not registered";
                        i++;
                        if (i === length) {
                            done(null, status);
                        }
                    }
                }
            });
        });
    }
}

var addnot = function(event, link, emails, creator, date, type, nid) {
    return function(done) {
        var status = {};
        status.uid = {};
        status.stat = {};
        if (emails.length) {
            var emailz = emails;
        } else {
            var emailz = Object.keys(emails);
        }
        var length = emailz.length;
        if (length == 0) {
            done(null, status);
        };
        //        Working Stress Design
        var i = 0;
        emailz.forEach(function(key) {
            User.findOne({
                'email': key
            }, function(err, fuser) {
                if (err) {
                    status.stat[key] = "Could not be added";
                    i++;
                    if (i === length) {
                        done(null, status);
                    }
                } else {
                    if (fuser) {
                        var Nlength = fuser.not.length;
                        status.stat = {};
                        if (!Nlength) {
                            fuser.not = [];
                            Nlength = 0;
                        }
                        if (fuser._id == creator) {
                            i++;
                            if (i === length) {
                                done(null, status);
                            }
                        } else {
                            fuser.not[Nlength] = {
                                event: event,
                                owner: {
                                    id: fuser._id,
                                    email: fuser.email
                                },
                                link: link,
                                read: false,
                                time: date,
                                i_no: Nlength,
                                type: type,
                                nid: nid
                            };
                            fuser.markModified('not');
                            fuser.save(function save() {
                                if (err) {
                                    status.stat[key] = "Notification could not be saved in this user's info. He will not be receiving notification of this action";
                                    i++;
                                    if (i === length) {
                                        done(null, status);
                                    }
                                } else {
                                    status.stat[key] = "Added";
                                    status.uid[fuser._id] = {
                                        'status': emails[key],
                                        'email': fuser.email
                                    };
                                    i++;
                                    if (i === length) {
                                        done(null, status);
                                    }
                                }
                            })
                        }
                    } else {
                        status.stat[key] = "User not registered";
                        i++;
                        if (i === length) {
                            done(null, status);
                        }
                    }
                }
            });
        });
    }
}

var addtasku = function(email, task, index, key) { // key = pid+mapname+indexno. all concatenated
    return function(done) {
        var status = {};
        status.stat = {};
        status.uid = {};
        if (!email || !task || !index) {
            done(null, status);
        };
        User.findOne({
            'email': email
        }, function(err, fuser) {
            if (err) {
                status.stat[email] = "Could not be added in user project.Please try again.";
            } else {
                if (fuser) {
                    if (fuser.hasOwnProperty('tasks')) {
                        fuser.tasks = {};
                    }
                    fuser.tasks[key] = {
                        'task': task,
                        'index': index
                    };
                    fuser.markModified('tasks');
                    fuser.save(function save() {
                        if (err) {
                            status.stat[email] = "Task could not be saved in this user's info. Please try again later or contact support";
                        } else {
                            status.stat[email] = "Added";
                            status.uid[fuser._id] = {
                                'email': email
                            };
                            done(null, status);
                        }
                    })
                } else {
                    status.stat[email] = "User not registered or account deleted";
                }
            }
        });
    }
}

var removetasku = function(email, key) { // key = pid+mapname+indexno. all concatenated
    return function(done) {
        var status = {};
        status.uid = {};
        status.stat = {};
        if (!email || !key) {
            done(null, status);
        };
        User.findOne({
            'email': email
        }, function(err, fuser) {
            if (err) {
                status.stat[email] = "Could not be removed";
            } else {
                if (fuser) {
                    delete fuser.tasks[key];
                    fuser.markModified('tasks');
                    fuser.save(function save() {
                        if (err) {
                            status.stat[email] = "Task could not be removed from this user's info. Please try again later or contact support";
                        } else {
                            status.stat[email] = "Removed";
                            status.uid[fuser._id] = {
                                'email': email
                            };
                            done(null, status);
                        }
                    })
                } else {
                    status.stat[email] = "User not registered or account deleted";
                }
            }
        });
    }
}


module.exports.findmap = function(user) {
    return function(done) {
        Project.findOne({
            '_id': user.p.pid
        }, function findmap(err, proj) {
            if (err) {
                done(null, {
                    notice: "please login again"
                });
            } else {
                if (proj) {
                    if (proj.users.hasOwnProperty(user.id) && (proj.users[user.id] === 'editor' || proj.users[user.id] === 'owner' || 'viewer')) {
                        if (proj.maps.hasOwnProperty(user.p.m_n)) {
                            done(null, proj.maps[user.p.m_n]);
                        } else done(null, {
                            notice: "Map not found"
                        });
                    } else {
                        done(null, {
                            notice: "You Do not have access to this project."
                        })
                    };
                } else {
                    done(null, {
                        notice: "Project not found"
                    })
                };
            }
        });
    }
}

module.exports.createproject = function(uzer) {
    return function(done) {
        User.findOne({
                '_id': uzer.id
            },
            function userfindONE(err, user) {
                if (err) {
                    done(null, {
                        notice: "please login again , your session seems to have expired"
                    });
                }
                var member_check = (function() {
                    var z = 0;
                    for (var key in user.projects) {
                        if (user.projects[key] == uzer.data.name) {
                            z = 1
                        }
                    }
                    return z;
                })();
                if (!(member_check)) { //This means the project is not yet create
                    var temp_project = new Project();
                    temp_project.name = uzer.data.name;
                    temp_project.description = uzer.data.desc;
                    temp_project.maps = {};
                    temp_project.users = {};
                    temp_project.assign = 'None';
                    temp_project.createdby = uzer.id;
                    //temp_project['id'] = user._id ;
                    var status = {};
                    var not_status = {};
                    co(function * () {
                        status = yield addusers(temp_project._id, temp_project.name, uzer.data.members, temp_project.createdby);
                        not_status = yield addnot("You were added to Project " + uzer.data.name + " by " + user.email, "project/" + temp_project._id, uzer.data.members, temp_project.createdby, Date.now(), 'add');
                        Object.keys(status.uid).forEach(function(key) {
                            temp_project.users[key] = status.uid[key];
                        });
                        temp_project.users[uzer.id] = {
                            'status': "owner",
                            email: user.email
                        };
                        temp_project.save(function save() {
                            if (err) {
                                done(null, {
                                    notice: "Project coudn't be saved, Please try again sometime later"
                                });
                            } else {
                                user.projects[temp_project._id] = temp_project.name;
                                user.markModified('projects');
                                user.save(function save() {
                                    if (err) {
                                        done(null, {
                                            notice: "This error is highly unlikely, yet if you see this .Please report this issue. "
                                        });
                                    }
                                });
                                done(null, {
                                    proj: temp_project,
                                    status: status
                                });
                            }
                        });
                    })();
                    // addusers(temp_project._id,temp_project.name,uzer.data.members);
                } else { //THis means the project exists
                    done(null, {
                        notice: "You have already created a project with same name, please use a different name"
                    });
                }
            }

        );
    };
}

module.exports.userinfo = function(uzer) {
    return function(done) {
        User.findOne({
                '_id': uzer
            },
            function userfindONE(err, user) {

                if (err) {
                    done(null, {
                        notice: "please login again , your session seems to have expired"
                    });
                } else if (user) {
                    done(null, {
                        fname: user.fname,
                        lname: user.lname,
                        email: user.email,
                        gravatar: user.gravatar,
                        payment: user.payment,
                        fid: user.facebook.id,
                        r_id: user._id,
                        ref: user.ref
                    });
                } else {
                    done(null, {
                        notice: "user not found."
                    })
                }
            }

        );
    };
}
module.exports.usernot = function(uzer) {
    return function(done) {
        User.findOne({
                '_id': uzer
            },
            function userfindONE(err, user) {
                00

                if (err) {
                    done(null, {
                        notice: "please login again , your session seems to have expired"
                    });
                } else if (user) {
                    done(null, {
                        not: user.not
                    });
                } else {
                    done(null, {
                        notice: "user not found."
                    })
                }
            }

        );
    };
}
module.exports.notread = function(uzer) {
    return function(done) {
        User.findOne({
                '_id': uzer.id
            },
            function userfindONE(err, user) {

                if (err) {
                    done(null, {
                        notice: "please login again , your session seems to have expired"
                    });
                } else if (user) {
                    for (var i = 0; i < user.not.length; i++) {
                        if (user.not[i].i_no == uzer.data.i_no) {
                            user.not[i].read = true;
                        }
                    };
                    user.markModified('not');
                    user.save(function(err) {
                        if (err) {
                            done(null, {
                                notice: "Notification could not be marked read."
                            });
                        }
                    })
                    done(null, {
                        not: user.not
                    });
                } else {
                    done(null, {
                        notice: "user not found."
                    })
                }
            }

        );
    };
}
module.exports.coupun = function(coup) {
    return function(done) {
        User.findOne({
                '_id': coup.user.id
            },
            function userfindONE(err, user) {

                if (err) {
                    done(null, {
                        notice: "please login again , your session seems to have expired"
                    });
                } else if (coup.coupun) {
                    if (recharges.hasOwnProperty('coup.coupun')) {
                        var day = Date(user.validity);
                        day.setDate(day.getDate() + recharges[coup.coupun]);
                        user.payment.type = 'coupun';
                        user.payment.validity = day;
                        user.markModified('payment');
                        user.save(function(err) {
                            if (err) {
                                done(null, {
                                    notice: "Coupun cannot be activated. Please Try again or contact support."
                                });
                            }
                        })
                    } else {
                        done(null, {
                            notice: "Coupun Code is invalid."
                        });
                    }
                } else {
                    done(null, {
                        notice: "user not found."
                    })
                }
            }

        );
    };
}


module.exports.usertasks = function(uzer) {
    return function(done) {
        User.findOne({
                '_id': uzer
            },
            function userfindONE(err, user) {
                if (err) {
                    done(null, {
                        notice: "please login again , your session seems to have expired"
                    });
                } else if (user) {
                    done(null, user.tasks);
                } else {
                    done(null, {
                        notice: "user not found."
                    })
                }
            }

        );
    };
}

module.exports.userprojects = function(uzer) {
    return function(done) {
        User.findOne({
                '_id': uzer
            },
            function userfindONE(err, user) {

                if (err) {
                    done(null, {
                        notice: "please login again , your session seems to have expired"
                    });
                } else if (user) {
                    done(null, {
                        projects: user.projects,
                        oproj: user.oproj
                    });
                } else {
                    done(null, {
                        notice: "user not found."
                    })
                }
            }

        );
    };
}

module.exports.adduserz = function(proj) {
    return function(done) {
        Project.findOne({
                '_id': proj.data.pid
            },
            function proj_findone(err, project) {
                if (err) {
                    done(null, {
                        notice: "please login again , your session seems to have expired"
                    });
                } else if (project) {
                    if (proj.data.users && project.users.hasOwnProperty(proj.user) && project.users[proj.user].status == 'owner') {
                        co(function * () {
                            var status = yield addusers(project._id, project.name, proj.data.users, project.createdby, {
                                'event': "You were added to Project " + project.name + " by " + proj.data.addedby,
                                'link': "project/" + project._id,
                                'date': Date.now,
                                'editbyid': proj.user
                            }); // need to adjust the adduserz method
                            var userids = Object.keys(status.uid);
                            if (userids.length == 0) {
                                done(null, {
                                    notice: "No users to add. The User is either not registered or has already been added.",
                                    'stat': status
                                })
                            };
                            for (var i = userids.length - 1; i >= 0; i--) {
                                project.users[userids[i]] = status.uid[userids[i]];
                            };
                            project.markModified('users');
                            project.save(function save() {
                                if (err) {
                                    done(null, "User could not be added. Please try again later");
                                } else {
                                    done(null, {
                                        'users': project.users,
                                        'status': status
                                    });
                                }
                            });
                        })();
                    } else {
                        done(null, {
                            notice: "No user to add or you don't have the permission"
                        });

                    }
                } else {
                    done(null, {
                        notice: "Project not found."
                    });
                }
            }

        );
    };
}

module.exports.removeuserz = function(proj) {
    return function(done) {
        Project.findOne({
                '_id': proj.data.pid
            },
            function proj_findone(err, project) {
                if (err) {
                    done(null, {
                        notice: "please login again , your session seems to have expired"
                    });
                } else if (project) {
                    if (proj.data.users && project.users.hasOwnProperty(proj.user) && project.users[proj.user].status == 'owner') {
                        co(function * () {
                            var status = yield removeusers2(project._id, project.name, proj.data.users, project.createdby, {
                                'event': "You were deleted from Project " + project.name + " by " + proj.data.delby,
                                'link': "project/" + project._id,
                                'date': Date.now,
                                'editbyid': proj.user
                            });
                            var userids = Object.keys(status.uid);
                            if (userids && userids.length) {
                                for (var i = userids.length - 1; i >= 0; i--) {
                                    delete project.users[userids[i]];
                                };
                                project.markModified('users');
                                project.save(function save() {
                                    if (err) {
                                        done(null, "User could not be removed. Please try again later");
                                    } else {
                                        done(null, project.users);
                                    }
                                });
                            } else done(null, status);
                        })();
                    } else {
                        done(null, {
                            notice: "No user to add or You Don't have the permission."
                        });
                    }
                } else {
                    done(null, {
                        notice: "Project not found."
                    })
                }
            }

        );
    };
}

module.exports.createmap = function(map) {
    return function(done) {
        Project.findOne({
            '_id': map.data.pid
        }, function findmap(err, proj) {
            if (err) {
                done(null, {
                    notice: "please login again"
                });
            } else {
                if (proj) {
                    if (proj.users.hasOwnProperty(map.creator) && (proj.users[map.creator].status == 'editor' || proj.users[map.creator].status == 'owner')) {
                        if (!proj.maps.hasOwnProperty(map.data.m_n)) {
                            proj.maps[map.data.m_n] = {};
                            var tom = new Date;
                            tom.setDate(tom.getDate() + 1);
                            proj.maps[map.data.m_n][10000] = {
                                name: map.data.m_n,
                                info: "Double Click here to start the fun.",
                                childi_no: [],
                                parenti_no: 0,
                                status: 'Incomplete',
                                due_date: tom.toDateString(),
                                i_no: 10000
                            };
                            proj.maps[map.data.m_n]['length'] = 1;
                            proj.markModified('maps');
                            proj.save(function save() {
                                if (err) {
                                    done(null, "map cannot be created");
                                }
                                done(null, map.data.m_n);
                            });
                        } else done(null, {
                            notice: "You already have map of same name in this project"
                        });
                    } else {
                        done(null, {
                            notice: "You Do not have access to this project.Viewer cannot create a new map."
                        })
                    };
                } else {
                    done(null, {
                        notice: "Project not found"
                    })
                };
            }
        });
    }
}


module.exports.addnode = function(map) {
    return function(done) {
        Project.findOne({
            '_id': map.data.pid
        }, function findmap(err, proj) {
            if (err) {
                done(null, {
                    notice: "please login again"
                });
            } else {
                if (proj) {
                    if (proj.users.hasOwnProperty(map.creator) && (proj.users[map.creator].status === 'editor' || proj.users[map.creator].status == 'owner' || proj.users[map.creator].status == 'viewer')) {
                        if (proj.maps.hasOwnProperty(map.data.m_n)) {
                            co(function * () {
                                var length = proj.maps[map.data.m_n]['length'] + 1 || Math.floor(Math.random() * 1000); ///99 is just a random large number
                                proj.maps[map.data.m_n]['length'] = length;
                                var task = {
                                    name: map.data.name,
                                    info: map.data.info,
                                    childi_no: [],
                                    parenti_no: map.data.parenti_no,
                                    due_date: map.data.due_date,
                                    status: map.data.status,
                                    i_no: length + 10000,
                                    assign: map.data.assign
                                };
                                proj.maps[map.data.m_n][length + 10000] = task;
                                if (!(map.data.assign == 'None')) {
                                    var addtaskU = yield addtasku(map.data.assign, task, length + 10000, proj._id + '_' + map.data.m_n + '_' + (length + 10000)); // key = pid+mapname+indexno. all concatenated                                                
                                }
                                proj.maps[map.data.m_n][map.data.parenti_no].childi_no.push(length + 10000);
                                proj.markModified('maps');
                                proj.save(function save() {
                                    if (err) {
                                        done(null, "node cannot be created");
                                    }
                                    done(null, {
                                        node: proj.maps[map.data.m_n][length + 10000],
                                        'userinfo': addtaskU
                                    });
                                });
                            })();
                        } else done(null, {
                            notice: "map not found"
                        });
                    } else {
                        done(null, {
                            notice: "You Do not have access to this project."
                        })
                    };
                } else {
                    done(null, {
                        notice: "Project not found"
                    })
                };
            }
        });
    }
}
module.exports.addchat = function(chat) {
    return function(done) {
        Project.findOne({
            '_id': chat.data.pid
        }, function findmap(err, proj) {
            if (err) {
                done(null, {
                    notice: "please login again"
                });
            } else {
                if (proj) {
                    if (proj.users.hasOwnProperty(chat.creator)) {
                        if (proj.maps.hasOwnProperty(chat.data.m_n)) {
                            co(function * () {
                                if (proj.maps[chat.data.m_n][chat.data.i_no].chat) {
                                    var chats = proj.maps[chat.data.m_n][chat.data.i_no].chat;
                                    if (chat.data.mention) {
                                        chats.push({
                                            gravatar: chat.data.chat.gravatar,
                                            time: chat.data.chat.time,
                                            name: chat.data.chat.username,
                                            msg: chat.data.chat.msg,
                                            mention: chat.data.mention
                                        });
                                        var mention = chat.data.mention;
                                        mention.targets = mention.targets.split(',').filter(function(element) {
                                            return element.length > 0;
                                        });
                                        if (mention.targets.length > 0) {
                                            not_status = yield addnot("You were mentioned on project " + proj.name + " by " + mention.email, "map/" + proj._id + '_' + chat.data.m_n, mention.targets, proj.createdby, Date.now(), 'men', mention.nid);
                                            console.log(not_status);
                                        }
                                    } else {
                                        chats.push({
                                            gravatar: chat.data.chat.gravatar,
                                            time: chat.data.chat.time,
                                            name: chat.data.chat.username,
                                            msg: chat.data.chat.msg
                                        });
                                    }
                                    proj.markModified('maps');
                                    proj.save(function save() {
                                        if (err) {
                                            done(null, {
                                                notice: "map cannot be created"
                                            });
                                        }
                                        done(null, chats[chats.length - 1]);
                                    });
                                } else {
                                    proj.maps[chat.data.m_n][chat.data.i_no].chat = [];
                                    var chats = proj.maps[chat.data.m_n][chat.data.i_no].chat;
                                    chats.push({
                                        gravatar: chat.data.chat.gravatar,
                                        time: chat.data.chat.time,
                                        name: chat.data.chat.username,
                                        msg: chat.data.chat.msg
                                    });
                                    proj.markModified('maps');
                                    proj.save(function save() {
                                        if (err) {
                                            done(null, {
                                                notice: "chat cannot be created"
                                            });
                                        }
                                        done(null, chats[chats.length - 1]);
                                    });
                                }
                            })();
                        } else done(null, {
                            notice: "map not found"
                        });
                    } else {
                        done(null, {
                            notice: "You Do not have access to this project."
                        })
                    };
                } else {
                    done(null, {
                        notice: "Project not found"
                    })
                };
            }
        });
    }
}

module.exports.addvote = function(vote) {
    return function(done) {
        Project.findOne({
            '_id': vote.data.pid
        }, function findmap(err, proj) {
            if (err) {
                done(null, {
                    notice: "please login again"
                });
            } else {
                if (proj) {
                    if (proj.users.hasOwnProperty(vote.creator)) {
                        if (proj.maps.hasOwnProperty(vote.data.m_n)) {
                            if (proj.maps[vote.data.m_n][vote.data.i_no].vote) {
                                var votes = proj.maps[vote.data.m_n][vote.data.i_no].vote;
                                votes[vote.data.name + '#' + vote.creator] = vote.data.vote;
                                proj.markModified('maps');
                                proj.save(function save() {
                                    if (err) {
                                        done(null, {
                                            notice: "vote could not be saved"
                                        });
                                    }
                                    done(null, {
                                        votes: votes,
                                        voter: vote.creator,
                                        data: vote.data
                                    });
                                });
                            } else {
                                proj.maps[vote.data.m_n][vote.data.i_no].vote = {};
                                var votes = proj.maps[vote.data.m_n][vote.data.i_no].vote;
                                votes[vote.data.name + '#' + vote.creator] = vote.data.vote;
                                proj.markModified('maps');
                                proj.save(function save() {
                                    if (err) {
                                        done(null, {
                                            notice: "vote could not be saved"
                                        });
                                    }
                                    done(null, {
                                        votes: votes,
                                        voter: vote.creator,
                                        data: vote.data
                                    });
                                });
                            }
                        } else done(null, {
                            notice: "map not found"
                        });
                    } else {
                        done(null, {
                            notice: "You Do not have access to this project."
                        })
                    };
                } else {
                    done(null, {
                        notice: "Project not found"
                    })
                };
            }
        });
    }
}
module.exports.getvote = function(vote) {
    return function(done) {
        Project.findOne({
            '_id': vote.data.pid
        }, function findmap(err, proj) {
            if (err) {
                done(null, {
                    notice: "please login again"
                });
            } else {
                if (proj) {
                    if (proj.users.hasOwnProperty(vote.creator)) {
                        if (proj.maps.hasOwnProperty(vote.data.m_n)) {
                            if (proj.maps[vote.data.m_n][vote.data.i_no].vote) {
                                var votes = proj.maps[vote.data.m_n][vote.data.i_no].vote;
                                done(null, {
                                    votes: votes,
                                    asker: vote.creator,
                                    data: vote.data
                                });
                            } else {
                                proj.maps[vote.data.m_n][vote.data.i_no].vote = {};
                                var votes = proj.maps[vote.data.m_n][vote.data.i_no].vote;
                                done(null, {
                                    votes: votes,
                                    asker: vote.creator,
                                    data: vote.data
                                });
                            }
                        } else done(null, {
                            notice: "map not found"
                        });
                    } else {
                        done(null, {
                            notice: "You Do not have access to this project."
                        })
                    };
                } else {
                    done(null, {
                        notice: "Project not found"
                    })
                };
            }
        });
    }
}

module.exports.getchat = function(chat) {
    return function(done) {
        Project.findOne({
            '_id': chat.data.pid
        }, function findmap(err, proj) {
            if (err) {
                done(null, "please login again");
            } else {
                if (proj) {
                    if (proj.users.hasOwnProperty(chat.creator)) {
                        if (proj.maps.hasOwnProperty(chat.data.m_n)) {
                            if (proj.maps[chat.data.m_n][chat.data.i_no].chat) {
                                done(null, proj.maps[chat.data.m_n][chat.data.i_no].chat);
                            }
                        } else done(null, {
                            notice: "map not found"
                        });
                    } else {
                        done(null, {
                            notice: "You Do not have access to this project."
                        })
                    };
                } else {
                    done(null, {
                        notice: "Project not found"
                    })
                };
            }
        });
    }
}


module.exports.delnode = function(map) {
    return function(done) {
        Project.findOne({
            '_id': map.data.pid
        }, function findmap(err, proj) {
            if (err) {
                done(null, {
                    notice: "please login again"
                });
            } else {
                if (proj) {
                    if (proj.users.hasOwnProperty(map.editor) && proj.users[map.editor].status === 'owner') {
                        if (proj.maps.hasOwnProperty(map.data.m_n)) {
                            if (map.data.deleted.length) {
                                co(function * () {
                                    for (var i = map.data.deleted.length - 1; i >= 0; i--) {
                                        var userinfo = {};
                                        if (proj.maps[map.data.m_n][map.data.deleted[i]].assign != 'None') {
                                            userinfo[map.data.deleted[i]] = yield removetasku(proj.maps[map.data.m_n][map.data.deleted[i]].assign, proj._id + '_' + map.data.m_n + '_' + map.data.deleted[i]);
                                        }
                                        delete proj.maps[map.data.m_n][map.data.deleted[i]];
                                    };
                                    if (map.data.parenti_no) {
                                        var parent = proj.maps[map.data.m_n][map.data.parenti_no];
                                        if (parent) {
                                            var index = parent.childi_no.indexOf(map.data.i_no);
                                            if (index > -1) {
                                                parent.childi_no.splice(index, 1);
                                            }
                                        }
                                    }
                                    proj.markModified('maps');
                                    proj.save(function save() {
                                        if (err) {
                                            done(null, {
                                                notice: "Map cannot be created"
                                            });
                                        }
                                        done(null, {
                                            sucess: "deleted sucessfully",
                                            'userinfo': userinfo
                                        });
                                    });
                                })();
                            }
                        } else done(null, {
                            notice: "Map not found"
                        });
                    } else {
                        done(null, {
                            notice: "You Do not have access to this project."
                        })
                    };
                } else {
                    done(null, {
                        notice: "Project not found"
                    })
                };
            }
        });
    }
}

module.exports.editnode = function(map) {
    return function(done) {
        Project.findOne({
            '_id': map.data.pid
        }, function findmap(err, proj) {
            if (err) {
                done(null, {
                    notice: "please login again"
                });
            } else {
                if (proj) {
                    if (proj.users.hasOwnProperty(map.editor) && (proj.users[map.editor].status === 'editor' || proj.users[map.editor].status === 'owner')) {
                        if (proj.maps.hasOwnProperty(map.data.m_n)) {
                            var old_assign = proj.maps[map.data.m_n][map.data.i_no].assign;
                            proj.maps[map.data.m_n][map.data.i_no].name = map.data.name;
                            proj.maps[map.data.m_n][map.data.i_no].info = map.data.info;
                            proj.maps[map.data.m_n][map.data.i_no].due_date = map.data.due_date;
                            proj.maps[map.data.m_n][map.data.i_no].status = map.data.status;
                            proj.maps[map.data.m_n][map.data.i_no].assign = map.data.assign;
                            co(function * () {
                                if (old_assign != map.data.assign) {
                                    var userinfo = {}
                                    if (!(map.data.assign == 'None')) {
                                        userinfo.add = yield addtasku(map.data.assign, proj.maps[map.data.m_n][map.data.i_no], map.data.i_no, proj._id + '_' + map.data.m_n + '_' + map.data.i_no); // key = pid+mapname+indexno. all concatenated                                                    
                                    }
                                    if (old_assign != 'None') {
                                        userinfo.rem = yield removetasku(old_assign, proj._id + '_' + map.data.m_n + '_' + map.data.i_no);
                                    }
                                }
                                proj.markModified('maps');
                                proj.save(function save() {
                                    if (err) {
                                        done(null, {
                                            notice: "map cannot be created"
                                        });
                                    }
                                    done(null, {
                                        node: proj.maps[map.data.m_n][map.data.i_no],
                                        'userinfo': userinfo
                                    });
                                });
                            })();
                        } else done(null, {
                            notice: "map not found"
                        });
                    } else {
                        done(null, {
                            notice: "You Do not have access to this project."
                        })
                    };
                } else {
                    done(null, {
                        notice: "Project not found"
                    })
                };
            }
        });
    }
}

module.exports.findproject = function(project) {
    return function(done) {
        Project.findOne({
                '_id': project.data.pid
            },
            function proj_findone(err, proj) {
                if (err) {
                    done(null, {
                        notice: "please login again"
                    });
                }
                if (proj) {
                    if (proj.users.hasOwnProperty(project.creator)) {
                        done(null, JSON.stringify(proj));
                    } else {
                        done(null, {
                            notice: "You Do not have access to the requested Project"
                        });
                    }
                } else {
                    done(null, {
                        notice: "project not found or was deleted"
                    })
                }
            });
    }
};
module.exports.editmap = function(project) {
    return function(done) {
        Project.findOne({
                '_id': project.data.pid
            },
            function proj_findone(err, proj) {
                if (err) {
                    done(null, {
                        notice: "please login again"
                    });
                }
                if (proj) {
                    if (proj.users.hasOwnProperty(project.creator) && (proj.users[project.creator].status == 'owner' || proj.users[project.creator].status === 'editor')) {
                        proj.maps[project.data.new_m_n] = proj.maps[project.data.old_m_n];
                        delete proj.maps[project.data.old_m_n];
                        proj.markModified('maps');
                        proj.save(function save() {
                            if (err) {
                                done(null, "map cannot be created");
                            }
                            done(null, proj.maps[project.data.new_m_n]);
                        });
                    } else {
                        done(null, {
                            notice: "You Do not have access to the requested Project"
                        });
                    }
                } else {
                    done(null, {
                        notice: "project not found or was deleted"
                    })
                }
            });
    }
};

module.exports.resetmap = function(project) {
    return function(done) {
        Project.findOne({
                '_id': project.data.pid
            },
            function proj_findone(err, proj) {
                if (err) {
                    done(null, {
                        notice: "please login again"
                    });
                }
                if (proj) {
                    if (proj.users.hasOwnProperty(project.editor) && (proj.users[project.editor].status == 'owner' || proj.users[project.editor].status === 'editor')) {
                        proj.maps[project.data.m_n] = project.data.map.data;
                        proj.markModified('maps');
                        proj.save(function save() {
                            if (err) {
                                done(null, "map cannot be created");
                            }
                            done(null, proj.maps[project.data.m_n]);
                        });
                    } else {
                        done(null, {
                            notice: "You Do not have access to the requested Project"
                        });
                    }
                } else {
                    done(null, {
                        notice: "Project not found or was deleted"
                    })
                }
            });
    }
};

module.exports.deletemap = function(project) {
    return function(done) {
        Project.findOne({
                '_id': project.data.pid
            },
            function proj_findone(err, proj) {
                if (err) {
                    done(null, {
                        notice: "please login again"
                    });
                }
                if (proj) {
                    if (proj.users.hasOwnProperty(project.creator) && (proj.users[project.creator].status == 'owner')) {
                        delete proj.maps[project.data.m_n];
                        proj.markModified('maps');
                        proj.save(function save() {
                            if (err) {
                                done(null, "map cannot be created");
                            }
                            done(null, proj.maps);
                        });
                    } else {
                        done(null, {
                            notice: "You Do not have access to the requested Project.Editor and Viewer cannot delete a Map."
                        });
                    }
                } else {
                    done(null, {
                        notice: "project not found or was deleted"
                    })
                }
            });
    }
};

module.exports.deleteproject = function(project) {
    return function(done) {
        Project.findOne({
                '_id': project.data.pid
            },
            function proj_findone(err, proj) {
                if (err) {
                    done(null, {
                        notice: "please login again"
                    });
                }
                if (proj) {
                    if (proj.users.hasOwnProperty(project.owner) && proj.users[project.owner].status === 'owner') {
                        var name = proj.name;
                        co(function * () {
                            var status = yield removeusers(proj._id, proj.name, proj.users, proj.createdby);
                            proj.remove();
                            done(null, {
                                sucess: "project has been sucessfully deleted",
                                status: status,
                                name: name
                            });
                        })();
                    } else {
                        done(null, {
                            notice: "You Do not have access to the requested Project.Editor and Viewer cannot delete a Project. "
                        });
                    }
                } else {
                    done(null, {
                        notice: "project not found or was deleted"
                    })
                }
            });
    }
};

module.exports.firstproject = function(user) {
    return function(done) {
        var temp_project = new Project();
        temp_project.name = "Demo-Lean Canvas";
        temp_project.description = "Lean Canvas Example";
        var tom = new Date;
        tom.setDate(tom.getDate() + 1);
        temp_project.maps = {
            "Problem": {
                "10000": {
                    "i_no": 10000,
                    "due_date": tom.toDateString(),
                    "status": "Incomplete",
                    "parenti_no": 0,
                    "assign": "None",
                    "childi_no": [10001, 10002],
                    "info": "Highlight the problems your customer are facing.",
                    "name": "Problem"
                },
                "10001": {
                    "name": "SMS interactions",
                    "info": "Mobile Penetration is higher than WEB",
                    "childi_no": [],
                    "parenti_no": 10000,
                    "assign": "None",
                    "due_date": tom.toDateString(),
                    "status": "Incomplete",
                    "i_no": 10001
                },
                "10002": {
                    "i_no": 10002,
                    "status": "Incomplete",
                    "due_date": tom.toDateString(),
                    "parenti_no": 10000,
                    "assign": "None",
                    "childi_no": [],
                    "info": "It involves high cost server based solutions",
                    "name": "Existing Solutions are expensive"
                },
                'length': 3
            },
            "Intermediate": {
                "10000": {
                    "i_no": 10000,
                    "due_date": tom.toDateString(),
                    "status": "Incomplete",
                    "parenti_no": 0,
                    "assign": "None",
                    "childi_no": [
                        10001,
                        10002,
                        10003
                    ],
                    "info": "You can add owners, editors and viewers to your projects",
                    "name": "Add members to projects"
                },
                "10001": {
                    "name": "Owners",
                    "info": "Owners have all the rights regarding projects . Apart from editing, they can eveen delete a project and its maps",
                    "childi_no": [],
                    "parenti_no": 10000,
                    "assign": "None",
                    "due_date": tom.toDateString(),
                    "status": "Incomplete",
                    "i_no": 10001
                },
                "10002": {
                    "i_no": 10002,
                    "status": "Incomplete",
                    "due_date": tom.toDateString(),
                    "parenti_no": 10000,
                    "assign": "None",
                    "childi_no": [],
                    "info": "Editor also have complete access to a project but they cannot delete a project or map",
                    "name": "Editors"
                },
                "10003": {
                    "name": "viewers",
                    "info": "Viewers are silent spectators and can only see a project. They cannot create ,edit or delete anything.",
                    "childi_no": [],
                    "parenti_no": 10000,
                    "assign": "None",
                    "due_date": tom.toDateString(),
                    "status": "Incomplete",
                    "i_no": 10003
                },
                'length': 4
            },
            "Basics": {
                "10000": {
                    "name": "Welcome ",
                    "info": "This is a Task.",
                    "childi_no": [
                        10001,
                        10002,
                        10003,
                        10004,
                        10005
                    ],
                    "parenti_no": 0,
                    "assign": "None",
                    "status": "Incomplete",
                    "due_date": tom.toDateString(),
                    "i_no": 10000
                },
                "10001": {
                    "name": "Click",
                    "info": "Click on a Task to see whats inside it",
                    "childi_no": [],
                    "parenti_no": 10000,
                    "assign": "None",
                    "due_date": tom.toDateString(),
                    "status": "Incomplete",
                    "i_no": 10001
                },
                "10002": {
                    "i_no": 10002,
                    "status": "Incomplete",
                    "due_date": tom.toDateString(),
                    "parenti_no": 10000,
                    "assign": "None",
                    "childi_no": [],
                    "info": "Each Task can be given a Due date .Task gets its color from its Due date",
                    "name": "Due Date"
                },
                "10003": {
                    "name": "Discussions",
                    "info": "You can Discuss realtime with people on a task.",
                    "childi_no": [],
                    "parenti_no": 10000,
                    "assign": "None",
                    "due_date": tom.toDateString(),
                    "status": "Incomplete",
                    "i_no": 10003
                },
                "10004": {
                    "i_no": 10004,
                    "status": "Incomplete",
                    "due_date": tom.toDateString(),
                    "parenti_no": 10000,
                    "assign": "None",
                    "childi_no": [],
                    "info": "Click on task and then edit to edit a task.",
                    "name": "Edit Task"
                },
                "10005": {
                    "i_no": 10005,
                    "status": "Incomplete",
                    "due_date": tom.toDateString(),
                    "parenti_no": 10000,
                    "assign": "None",
                    "childi_no": [],
                    "info": "You can upvote and downvote a particular task to display your interest.",
                    "name": "Upvote/Downvote"
                },
                'length': 6
            }
        };
        temp_project.users = {};
        temp_project.createdby = user._id;
        temp_project.users[user._id] = {
            status: "owner",
            email: user.email
        };
        temp_project.save(function save(err) {
            if (err) {
                done(null, {
                    notice: "Demo Project coudn't be saved, its your turn to learn and make one yourself."
                });
            } else {

                done(null, temp_project._id);
            }

        });


    }
}