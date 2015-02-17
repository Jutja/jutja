var Project = require('./model/project').Project;
var User = require('./model/user').User;
var Team = require('./model/team').Team;
var smtp = require('./auth.js').smtp;

//findemail finds email of a user 
var findemail = function(userdetails) {
    //this loop stores right value of email in email variable
    if (userdetails.email) {
        var email = userdetails.email;
    } else if (userdetails.facebook.email) {
        var email = userdetails.facebook.email;
    } else {
        return false;
    }
    return email;
};

var checkeditor = function(email, editor) {
        if (editor.indexOf(email) >= 0) {
            return true;
        } else return false;
    }
    //this function add the projects of secondary users(intended). Here User is an array. If User is not registered, 
    //he will receive an invitation to this website
var updateusers = function(pid, pname, user) {
        var status = {};
        for (var i = 0; i < user.length; ++i) {
            User.findOne({
                'email': user[i]
            }, function(err, fuser) {
                if (err) {
                    status[user[i]] = "Could not be added";
                } else {
                    if (fuser) {
                        if (fuser.projects.hasOwnProperty(pname)) {
                            status[user[i]] = "already has a project by same name";
                        } else {
                            fuser.projects[pname] = pid;
                            fuser.markModified('projects');
                            fuser.save(function save() {
                                if (err) {
                                    status[user[i]] = "Project could not be saved in this user's info. Please try again later or contact support"
                                } else {
                                    status[user[i]] = "User has been Added"
                                }
                            })
                        }
                    } else {
                        status[user[i]] = "User not registered";
                    }
                }
                if (i == user.length - 1) {
                    console.log(status);
                    return status;
                }
            });
        }

    }
    // Here we get user as 
var removeusers = function(pid, name, user) {
        var status = {};
        console.log("In removeusers function");
        for (var i = 0; i < user.length; i++) {
            User.findOne({
                'email': user[i]
            }, function(err, fuser) {
                if (err) {
                    status[user[i]] = "Could not be added";
                } else {
                    if (fuser) {
                        if (fuser.projects.hasOwnProperty(name)) {
                            delete fuser.projects[name];
                            fuser.markModified('projects');
                            fuser.save(function save() {
                                if (err) {
                                    status[user[i]] = "Project could not be deleted from this user's info. Please try again later or contact support"
                                } else {
                                    status[user[i]] = "project deleted from the user"
                                }
                            })
                        }
                    } else {
                        status[user[i]] = "User not registered";
                    }
                }
            });

        }
        return status;
    }
    //Not currently working obviously :p
    //This function invites user to the website to register.user- user's email who has to be invited.email contains the text that needs to sent in the email
var inviteuser = function(user, email) {

}

module.exports.getprojects = function(userid) {
    return function(done) {
        User.findOne({
            '_id': userid
        }, function(err, user) {
            if (err) {
                done(null, {
                    notice: "error in connection. Please try again later or contact support"
                });
            } else if (user) {
                done(null, user.projects);
            } else {
                done(null, {
                    notice: "session expired.Please try again later"
                });
            }
        });
    }
}

//propogate the project to the all the users and also check for non registered user. Also somehow Update user session data of all the user.
module.exports.createproject = function(userdetails) {
    return function(done) {
        User.findOne({
                '_id': userdetails._id
            },
            function userfindONE(err, user) {

                if (err) {
                    done(null, {
                        notice: "please login again , your session seems to have expired"
                    });
                }
                if (!(user.projects.hasOwnProperty(userdetails.tproject.name))) { //This means the project is not yet create
                    var temp_project = new Project();
                    temp_project.name = userdetails.tproject.name;
                    if (userdetails.tproject.members) {
                        var emails = userdetails.tproject.members.split(',');
                        temp_project.users = {};
                        temp_project.users.editor = emails;
                    } else {
                        emails = []
                    }
                    if (userdetails.email) {
                        temp_project.users.editor.push(userdetails.email)
                    } else if (userdetails.facebook.email) {
                        temp_project.users.editor.push(userdetails.facebook.email);
                    }
                    var stat = updateusers(temp_project._id, temp_project.name, emails);
                    temp_project.save(function save() {
                        if (err) {
                            done(null, {
                                notice: "Project coudn't be saved, Please try again sometime later"
                            });
                        } else {
                            user.projects[temp_project.name] = temp_project._id;
                            user.markModified('projects');
                            user.save(function save() {
                                if (err) {
                                    done(null, {
                                        notice: "This error is highly unlikely, yet if you see this .Please report this issue. "
                                    });
                                }
                            });
                            temp_project.stat = stat; //this is temporary stat to show which users were added.
                            done(null, temp_project);
                        }
                    });
                } else if (user.projects.hasOwnProperty(userdetails.tproject.name)) { //THis means the project exists
                    done(null, {
                        notice: "You have already created a project with same name, please use a different name"
                    });
                } else done(null, {
                    notice: "nothing is matching"
                });
            }

        );
    };
}

module.exports.findproject = function(userdetails) {
    return function(done) {
        Project.findOne({
                '_id': userdetails.proj.id
            },
            function proj_findone(err, proj) {
                if (err) {
                    done(null, {
                        notice: "please login again"
                    });
                }
                if (proj) {
                    if (userdetails.email) {
                        var email = userdetails.email;
                    } else if (userdetails.facebook.email) {
                        var email = userdetails.facebook.email;
                    } else {
                        done(null, {
                            notice: "Please Login Again"
                        });
                    }
                    if (proj.users.editor.indexOf(email) >= 0) {
                        done(null, proj);
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


module.exports.editproject = function(userdetails) {
    return function(done) {
        Project.findOne({
                '_id': userdetails.eproject.old_id
            },
            function(err, proj) {
                if (err) {
                    done(null, "Please login again");
                } else {
                    if (proj) {
                        var email = findemail(userdetails);
                        if (email) {
                            if (checkeditor(email, proj.users.editor)) {
                                proj.name = userdetails.eproject.name;
                                User.findOne({
                                        '_id': userdetails._id
                                    },
                                    function(err, user) {
                                        if (err) {
                                            done(null, {
                                                notice: "Please Login again ot Try again Later"
                                            });
                                        } else if (user) {
                                            delete user.projects[userdetails.eproject.old_name];
                                            user.projects[userdetails.eproject.name] = userdetails.eproject.old_id;
                                            user.markModified('projects');
                                            user.save(function save() {
                                                if (err) {
                                                    done(null, {
                                                        notice: "User cannot be saved while renaming the project"
                                                    });
                                                }
                                            });
                                        }
                                    }
                                );
                                proj.save(function save() {
                                    if (err) {
                                        done(null, {
                                            notice: "something is wrong, Please report the issue"
                                        });
                                    }
                                    done(null, JSON.stringify(proj));
                                });
                            } else {
                                done(null, {
                                    notice: "You do not have access to this project"
                                })
                            }
                        } else {
                            done(null, {
                                notice: "please login again"
                            })
                        };
                    } else {
                        done(null, {
                            notice: "Project not found or was deleted"
                        })
                    };
                }
            });
    }
}

//Todos delete project should be accessible to only the owner but currently owners are not being added
module.exports.deleteproject = function(userdetails) {
    return function(done) {
        Project.findOne({
                '_id': userdetails.eproject.old_id
            },
            function proj_findone(err, proj) {
                if (err) {
                    done(null, "please login again");
                }
                if (proj) {
                    var email = findemail(userdetails);
                    if (email) {
                        if (checkeditor(email, proj.users.editor)) {
                            var stat = removeusers(userdetails.eproject.old_id, userdetails.eproject.name, proj.users.editor);
                            proj.remove();
                            console.log(stat);
                            done(null, {
                                delete: "Project has been deleted"
                            });
                        } else {
                            done(null, {
                                notice: "You Do not have access to this project."
                            })
                        };
                    } else {
                        done(null, {
                            notice: "Please Login Again"
                        })
                    };
                } else {
                    done(null, {
                        notice: "Project not found"
                    })
                };
            });
    }
}

//Here Each project has a object maps which has map_name as key . Each of maps[map_name] is an object which has two attributes lastindex and a map arraym
// Map array has all the nodes in form of objects
module.exports.createmap = function(map) {
    return function(done) {
        Project.findOne({
            '_id': userdetails.cmaps.project_id
        }, function findmap(err, proj) {
            if (err) {
                done(null, "please login again");
            } else {
                if (proj) {
                    var email = findemail(userdetails);
                    if (email) {
                        if (checkeditor(email, proj.users.editor)) {
                            userdetails.cmaps.childi_no = [];
                            if (proj.maps.hasOwnProperty(userdetails.cmaps.map_name)) {
                                proj.maps[userdetails.cmaps.map_name].lastindex = proj.maps[userdetails.cmaps.map_name].lastindex + 1;
                                proj.maps[userdetails.cmaps.map_name].map.push({
                                    name: userdetails.cmaps.name,
                                    info: userdetails.cmaps.info,
                                    childi_no: userdetails.cmaps.childi_no,
                                    i_no: proj.maps[userdetails.cmaps.map_name].lastindex,
                                    parenti_no: userdetails.cmaps.parenti_no,
                                    due_date: userdetails.cmaps.due_date,
                                    status: userdetails.cmaps.status
                                });
                            } else {
                                proj.maps[userdetails.cmaps.map_name] = {};
                                proj.maps[userdetails.cmaps.map_name].map = [];
                                proj.maps[userdetails.cmaps.map_name].map[0] = {
                                    name: userdetails.cmaps.name,
                                    info: userdetails.cmaps.info,
                                    childi_no: userdetails.cmaps.childi_no,
                                    i_no: 10000,
                                    parenti_no: userdetails.cmaps.parenti_no,
                                    due_date: userdetails.cmaps.due_date,
                                    status: userdetails.cmaps.status
                                };
                                proj.maps[userdetails.cmaps.map_name].lastindex = 10000;
                            }
                            proj.markModified('maps');
                            //  proj.maps[userdetails.cmaps.name].info = userdetails.cmaps.info;
                            proj.save(function save() {
                                if (err) {
                                    done(null, "map cannot be created");
                                }
                                done(null, proj.maps[userdetails.cmaps.map_name].map);
                            });
                        } else {
                            done(null, {
                                notice: "You Do not have access to this project."
                            })
                        };
                    } else {
                        done(null, {
                            notice: "Please Login Again"
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
// childi_no empty array is created as only one node at a time is created and we don't need to get it from frontend.Rest is kinda simple :p
module.exports.addnode = function(userdetails) {
    return function(done) {
        Project.findOne({
            '_id': userdetails.cmaps.project_id
        }, function findmap(err, proj) {
            if (err) {
                done(null, "please login again");
            } else {
                if (proj) {
                    var email = findemail(userdetails);
                    if (email) {
                        if (checkeditor(email, proj.users.editor)) {
                            userdetails.cmaps.childi_no = [];
                            if (proj.maps.hasOwnProperty(userdetails.cmaps.map_name)) {
                                proj.maps[userdetails.cmaps.map_name].lastindex = proj.maps[userdetails.cmaps.map_name].lastindex + 1;
                                proj.maps[userdetails.cmaps.map_name].map.push({
                                    name: userdetails.cmaps.name,
                                    info: userdetails.cmaps.info,
                                    childi_no: userdetails.cmaps.childi_no,
                                    i_no: proj.maps[userdetails.cmaps.map_name].lastindex,
                                    parenti_no: userdetails.cmaps.parenti_no,
                                    due_date: userdetails.cmaps.due_date,
                                    status: userdetails.cmaps.status
                                });
                                var totalnode = proj.maps[userdetails.cmaps.map_name].map;
                                var length = totalnode.length;
                                var key = 0; // this hold the information that whether particular key is found or not
                                for (var i = 0; i <= length - 1; i++) {
                                    if (totalnode[i].i_no == userdetails.cmaps.parenti_no) {
                                        key = 1;
                                        break;
                                    }
                                }
                                if (key === 1) {
                                    proj.maps[userdetails.cmaps.map_name].map[i].childi_no.push(proj.maps[userdetails.cmaps.map_name].lastindex);
                                } else done(null, {
                                    notice: "node not found"
                                });
                            } else {
                                done(null, {
                                    notice: "map does not exit"
                                });
                            }
                            proj.markModified('maps');
                            //  proj.maps[userdetails.cmaps.name].info = userdetails.cmaps.info;
                            proj.save(function save() {
                                if (err) {
                                    done(null, {
                                        notice: "map cannot be created"
                                    });
                                }
                                done(null, proj.maps[userdetails.cmaps.map_name].map);
                            });
                        } else {
                            done(null, {
                                notice: "Sorry You cannot add a node to this node"
                            })
                        };
                    } else {
                        done(null, {
                            notice: "Session has expired. Please Login Again."
                        })
                    };
                } else {
                    done(null, {
                        notice: "Project not found. Seems it has been deleted. Please contact support if you think this is an error."
                    })
                };
            }


        });
    }
}

module.exports.editnode = function(userdetails) {
    return function(done) {
        Project.findOne({
            '_id': userdetails.cmaps.project_id
        }, function findmap(err, proj) {
            if (err) {
                done(null, "please login again");
            } else {
                if (proj) {
                    var email = findemail(userdetails);
                    if (email) {
                        if (checkeditor(email, proj.users.editor)) {
                            if (proj.maps.hasOwnProperty(userdetails.cmaps.map_name)) {
                                var key = 0; // this hold the information that whether particular key is found or not
                                var length = proj.maps[userdetails.cmaps.map_name].map.length; //no. of nodes
                                var totalnode = proj.maps[userdetails.cmaps.map_name].map;
                                for (var i = 0; i <= length - 1; i++) {
                                    if (totalnode[i].i_no == userdetails.cmaps.i_no) {
                                        key = 1;
                                        break;
                                    }
                                }
                                if (key == 1) {
                                    proj.maps[userdetails.cmaps.map_name].map[i].name = userdetails.cmaps.name;
                                    proj.maps[userdetails.cmaps.map_name].map[i].info = userdetails.cmaps.info;
                                    proj.maps[userdetails.cmaps.map_name].map[i].due_date = userdetails.cmaps.due_date;
                                    proj.maps[userdetails.cmaps.map_name].map[i].status = userdetails.cmaps.status;
                                    if (userdetails.cmaps.chat) {
                                        proj.maps[userdetails.cmaps.map_name].map[i].chat = userdetails.cmaps.chat;
                                    }
                                    if (userdetails.cmaps.voting) {
                                        if (userdetails.cmaps.voting.like && !userdetails.cmaps.voting.dislike) {
                                            proj.maps[userdetails.cmaps.map_name].map[i].voting = userdetails.cmaps.voting;
                                            proj.maps[userdetails.cmaps.map_name].map[i].voting.dislike = [];
                                        } else if (!userdetails.cmaps.voting.like && userdetails.cmaps.voting.dislike) {
                                            proj.maps[userdetails.cmaps.map_name].map[i].voting = userdetails.cmaps.voting;
                                            proj.maps[userdetails.cmaps.map_name].map[i].voting.like = [];
                                        } else if (!userdetails.cmaps.voting.like && !userdetails.cmaps.voting.dislike) {
                                            proj.maps[userdetails.cmaps.map_name].map[i].voting.like = [];
                                            proj.maps[userdetails.cmaps.map_name].map[i].voting.dislike = [];
                                        } else {
                                            proj.maps[userdetails.cmaps.map_name].map[i].voting = userdetails.cmaps.voting;
                                        }
                                    } else {
                                        proj.maps[userdetails.cmaps.map_name].map[i].voting = {};
                                        proj.maps[userdetails.cmaps.map_name].map[i].voting.like = [];
                                        proj.maps[userdetails.cmaps.map_name].map[i].voting.dislike = [];
                                    }
                                    proj.markModified('maps');
                                    //  proj.maps[userdetails.cmaps.name].info = userdetails.cmaps.info;
                                    proj.save(function save() {
                                        if (err) {
                                            done(null, "map cannot be edited");
                                        }
                                        done(null, JSON.stringify(proj.maps[userdetails.cmaps.map_name].map));
                                    });

                                } else done(null, "node not found");
                            } else {
                                done(null, "map does not exit");
                            }
                        } else {
                            done(null, {
                                notice: "Sorry You cannot add a node to this node"
                            })
                        };
                    } else {
                        done(null, {
                            notice: "Session has expired. Please Login Again."
                        })
                    };
                } else {
                    done(null, {
                        notice: "Project not found. Seems it has been deleted. Please contact support if you think this is an error."
                    })
                };
            }
        });
    }
}

module.exports.findmap = function(userdetails) {
    return function(done) {
        Project.findOne({
            '_id': userdetails.cmaps.pid
        }, function findmap(err, proj) {
            if (err) {
                done(null, {
                    notice: "please login again"
                });
            } else {
                if (proj) {
                    var email = findemail(userdetails);
                    if (email) {
                        if (checkeditor(email, proj.users.editor)) {
                            if (proj.maps.hasOwnProperty(userdetails.cmaps.name)) {
                                done(null, proj.maps[userdetails.cmaps.name].map);
                            } else done(null, {
                                notice: "Map not found"
                            });
                        } else done(null, {
                            notice: "You do not have access tot this map"
                        });
                    } else done(null, {
                        notice: "Please Login again"
                    });
                } else done(null, {
                    notice: "Project Not Found"
                });
            }
        });
    }
}

//work on history
module.exports.deletenode = function(userdetails) {
    return function(done) {
        Project.findOne({
            '_id': userdetails.cmaps.project_id
        }, function findmap(err, proj) {
            if (err) {
                done(null, {
                    notice: "please login again"
                });
            } else {
                if (proj) {
                    var email = findemail(userdetails);
                    if (email) {
                        if (checkeditor(email, proj.users.editor)) {
                            if (userdetails.cmaps.hasOwnProperty('data')) {
                                proj.maps[userdetails.cmaps.map_name].map = userdetails.cmaps.data;
                                var length = Object.keys(proj.maps[userdetails.cmaps.map_name].map).length;
                                for (var i = 0; i < length; i++) {
                                    if (!proj.maps[userdetails.cmaps.map_name].map[i].hasOwnProperty('childi_no')) {
                                        proj.maps[userdetails.cmaps.map_name].map[i].childi_no = [];
                                    }
                                }
                            } else {
                                proj.maps[userdetails.cmaps.map_name].map[i] = {};
                            }
                            proj.markModified('maps');

                            proj.save(function save() {
                                if (err) {
                                    done(null, {
                                        notice: "map cannot be edited"
                                    });
                                }
                                done(null, proj.maps[userdetails.cmaps.map_name].map);
                            });
                        } else done(null, {
                            notice: "You do not have access tot this map"
                        });
                    } else done(null, {
                        notice: "Please Login again"
                    });
                } else done(null, {
                    notice: "Project Not Found"
                });
            }
        });
    }
}

//All the team functions are below
//team name is unique and we expect users to add prefixes to ensure it that way.Gamification of team can also happen
module.exports.teamcreate = function(userdetails) {
    return function(done) {
        Team.findOne({
            name: userdetails.team.name.name
        }, function(err, team) {
            if (err) {
                return done(err);
            }
            if (team) {
                return done(null, false);
            }
            var temp_team = new Team();
            temp_team.owner = userdetails.email;
            temp_team.name = userdetails.team.name.name;
            if (userdetails.members) {
                temp_team.members = userdetails.members;
            }

            temp_team.save(function save() {
                if (err) {
                    done(null, "Team couldn't be saved, Please try again sometime later");
                } else {
                    done(null, temp_team);
                }
            });
        });

    }
}

module.exports.teamadd = function(userdetails) {
    return function(done) {
        Team.findOne({
            name: userdetails.team.name
        }, function(err, team) {
            if (err) {
                return done(err);
            }
            if (team) {
                for (var i = o; i <= userdetails.team.newmember; i++) {
                    team.members.push(userdetails.team.newmember[i])
                }
                team.save(function save() {
                    if (err) {
                        done(null, "Team couldn't be saved, Please try again sometime later");
                    } else {
                        done(null, temp_team);
                    }
                });
            }
        });

    }
}
module.exports.teamremove = function(userdetails) {
    return function(done) {
        Team.findOne({
            name: userdetails.team.name
        }, function(err, team) {
            if (err) {
                return done(err);
            }
            if (team) {
                team.members.splice(team.members.indexOf(userdetails.team.member), 1);
                team.save(function save() {
                    if (err) {
                        done(null, "Team couldn't be saved, Please try again sometime later");
                    } else {
                        done(null, team);
                    }
                })
            } else {
                done(null, "team not found")
            }
        });
    }
}
module.exports.teamfind = function(userdetails) {
    return function(done) {
        Team.findOne({
            name: userdetails.team.name
        }, function(err, team) {
            if (err) {
                return done(err);
            }
            if (team) {
                return done(null, team);
            } else {
                return done(null, "team not found");
            }
        })
    }
}
module.exports.teamdelete = function(userdetails) {
    return function(done) {
        Team.findOne({
                'name': userdetails.team.name
            },
            function team_delete(err, team) {
                if (err) {
                    done(null, "please login again");
                }
                if (team) {
                    team.remove();
                    done(null, "Team has been deleted");
                } else {
                    done(null, "Team not found")
                }
            });
    }
}
