/*jslint node:true*/

/**
 * Module dependencies.
 */
//load koa
var koa = require('koa');
var router = require('koa-router');
var parse = require('co-body');
var public_dir = require('koa-static-cache');
var app = module.exports = koa();
var views = require('co-views');
var config = require('./config/app');
var User = require('./model/user').User;
var config = require('./config/app');

var url = "https://jutja.com/";
// development only
if ('development' == app.env) {
        url = "http://localhost:2500/";
    }
var parser = function * parser(next) {
    this.req.body = yield parse.form(this);
    yield next;
}
//this function stores the referral id in this.req so its accessible from node 
var ref_req = function * parser(next) {
    this.req.ref = this.session.r;
    yield next;
}

//if (config.view.need) {
//activate the views
var render = views(__dirname + '/' + config.view.folder_name, {
    ext: config.view.engine
});

//};


// authentication
require('./auth');
var passport = require('koa-passport');
app.use(passport.initialize());
app.use(passport.session());

//use the router


app.use(public_dir(__dirname + "/public"), {
  maxAge: 365 * 24 * 60 * 60,
  gzip: true  
});
var Router = require('koa-router');

var checktoken = require('./auth.js').check_token;
var createtoken = require('./auth.js').create_token;
var passwordreset = require('./auth.js').password_reset;

var default_router = new Router();

//=======================================
//HOME PAGE (containing loging links)
//=======================================

default_router.get('/', function * () {
    if(this.req.uri.query && this.req.uri.query.r){
        this.session.r = this.req.uri.query.r;
    }
    this.body = yield render('index.ejs');
});



// =====================================
// LOGOUT ==============================
// =====================================

default_router.get('/logout', function * (next) {
    //this.req.session.destroy();
    this.logOut();
    this.session = null;
    this.redirect(url);
});


//=======================================
//Login PAGE 
//=======================================

default_router.get('/login', function * () {
var query = this.req.uri.query; 
    if(this.req.uri.query && this.req.uri.query.r){
        this.session.r = this.req.uri.query.r;
    }
    if (this.req.isAuthenticated()) {
        this.redirect(url+'app');
    } else {
        if (query && query.status == "wrong") {
            this.body = yield render('login.ejs', {
                login: true
            });
        } else {
            this.body = yield render('login.ejs', {
                login: false
            });
        }
    }
});

//=======================================
//handle login request from the form
//=======================================

default_router.post('/login',
    parser,
    passport.authenticate('local-signin', {
        successRedirect: url+'app',
        failureRedirect: url+'login?status=wrong'
    })
);

//=============================================
// route for facebook authentication and login
//=============================================

default_router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: 'email'
}));

//=============================profile=================================
// handle the callback after facebook has authenticated the user
//==============================================================

//Custom failure message should be diff. for fb users

default_router.get('/auth/facebook/callback',ref_req,
    passport.authenticate('facebook', {
        successRedirect: url+'app',
        failureRedirect: url+'login?status=wrong'
    }));



//=======================================
//Render password reset page
//=======================================

default_router.get('/resetpassword', function * () {
    if (this.req.isAuthenticated()) {
        this.redirect(url+'app');
    } else {
        this.body = yield render('resetpassword.ejs');
    }
});

//=======================================
//Handle Password Reset request
//=======================================

default_router.get('/reset-password', function * () {
    var token = this.request.query;
    if (token.token) {
        this.body = yield checktoken(token);
    } else {
        this.body = yield createtoken(token);
    }

});


//=======================================
//Render sign up page
//=======================================

default_router.get('/signup',ref_req, function * () {
    if(this.req.uri.query && this.req.uri.query.r){
        this.session.r = this.req.uri.query.r;
    }
    if (this.req.isAuthenticated()) {
        this.redirect('/app');
    } else {
        query = this.request.query;
        if (query && query.status == "alreadyregistered") {
            this.body = yield render('signup.ejs', {
                registered: true
            });
        } else {
            this.body = yield render('signup.ejs', {
                registered: false
            });
        }
    }
});


//=======================================
//Handle sign-up post request from the form
//=======================================// POST /signup
default_router.post('/signup',
    parser,
    passport.authenticate('local-signup', {
        successRedirect: url+'app',
        failureRedirect: url+'signup?status=alreadyregistered'
    })
);



/**app.use(function*(next) {
  this.request.query = this.query;

  yield next
}); **/
app.use(default_router.middleware());

// =====================================
// check the login ==============================
// =====================================
app.use(function * (next) {
    if (this.req.isAuthenticated()) {
        yield next;
    } else {
        this.redirect(url+'login')
    }
});

var userfindone = require('./util.js').createproject;
var project_edit = require('./util.js').editproject;
var project_find = require('./util.js').findproject;
var project_delete = require('./util.js').deleteproject;
var get_projects = require('./util.js').getprojects;

var map_create = require('./util.js').createmap;
var map_find = require('./util.js').findmap;

var add_node = require('./util.js').addnode;
var edit_node = require('./util.js').editnode;
var delete_node = require('./util.js').deletenode;
var gravatr = require('./auth.js').gravatr;
var crypto = require('crypto');

var secured = new Router();

secured.get('/myinfo', function * () {
    var userdetails = this.req.user;
    if (userdetails.fname) {
        this.body = yield render('app_udetails.ejs', {
            user: userdetails
        });
    } else {
        this.body = "Something is wrong. Please contact support mentioning this quote 'Do not take life too seriously. You will never get out of it alive.'";
    }
});
//////////////////////////////////////////////////////////////
//Gravatar method
//////////////////////////////////////////////////////////////

secured.get('/gravatar', function * () {
    post_ = this.request.query;
    user = this.req.user;
    if (post_.mail) { // method to set the gravatar
        var result = yield gravatr(user, post_.mail);
        this.body = result;
    } else {
        this.body = {
            notice: "wrong request"
        }
    };
});


//////////////////////////////////////////////////////////////
// Method to change the password for logged in users
//////////////////////////////////////////////////////////////

secured.post('/change-password', function * () {
    var user_ = this.req.user;
    post_ = yield(parse(this));
    if (post_.p) {
        user_.temp_pass = post_.p;
        this.body = yield passwordreset(user_);
    } else {
        done(null, "Looks like your seesion has expired. Please login again")
    };
});

secured.get('/project/create', function * () {
    this.body = yield render('app_project_create.ejs');
});

secured.post('/project/create', function * () {
    this.type = 'application/json';
    var userdetails = this.req.user;
    userdetails.tproject = yield parse(this);

    response = yield userfindone(userdetails);
    //todo - save project in other users as well. Will try to keep it lazy
    if (response.name) {
        this.req.user.projects[userdetails.tproject.name] = userdetails.tproject._id;
        this.body = JSON.stringify(response);;
    } else this.body = JSON.stringify({
        notice: "wrong request"
    });
});


//This will return all the forms of a user

secured.get('/app', function * () {
    //var projects = this.req.user.projects;
    var user_id = this.req.user._id;
    var project = yield get_projects(user_id);
    if (project.notice) {
        this.body = yield render('notice', {
            notice: project.notice
        });
    } else {
        user = this.req.user;
        if (user.facebook && user.facebook.id) {
            this.body = yield render('app_project_all', {
                project: project,
                user: this.req.user,
                pic: "https://graph.facebook.com/"+user.facebook.id+"/picture",
                payment: this.req.user.payment
            });
        } else {
            this.body = yield render('app_project_all', {
                project: project,
                user: this.req.user,
                pic: "https://www.gravatar.com/avatar/" + user.gravatar + "?s=200&d=identicon",
                payment: this.req.user.payment
            });
        }
    }
});
secured.get('/app2', function * () {
    //var projects = this.req.user.projects;
    var user_id = this.req.user._id;
    var project = yield get_projects(user_id);
    if (project.notice) {
        this.body = yield render('notice', {
            notice: project.notice
        });
    } else {
        user = this.req.user;
        if (user.facebook && user.facebook.id) {
            this.body = yield render('kanban.ejs', {
                project: project,
                user: this.req.user,
                pic: "https://graph.facebook.com/"+user.facebook.id+"/picture",
                payment: this.req.user.payment
            });
        } else {
            this.body = yield render('kanban.ejs', {
                project: project,
                user: this.req.user,
                pic: "https://www.gravatar.com/avatar/" + user.gravatar + "?s=200&d=identicon",
                payment: this.req.user.payment
            });
        }
    }
});

//this method only needs id to work    
/**
secured.get('/project/edit', function* (){
    var userdetails = this.req.user;
        userdetails.eproject = this.req.query.id;
        //Check if the query formed is good
    if(userdetails.eproject) {
    var editvproject = yield project_find(userdetails);
        if(editvproject.name){
            this.body = yield render('app_project_edit',{project: editvproject});
        } else {this.body = yield render('notice.ejs', { notice: editvproject}) ;}
    } else {
        this.body = yield render('notice.ejs', { notice: "request malfunctioned, Please contact support ."}) ;
    }
}); **/
//think about storing the info of project details somewhere. Better in the user projects. SO if we don't find the project in user, we update the user's data
secured.get('/project/edit', function * () {
    this.type = 'application/json';
    var userdetails = this.req.user;
    userdetails.eproject = this.request.query;
    //Check if the query formed is good and user has that project or not
    if (userdetails.eproject) {
        var result = yield project_edit(userdetails);
        this.body = JSON.stringify(result);
    } else {
        this.body = JSON.stringify({
            notice: "request was not wellformed.Please try again"
        });
    }
});

secured.get('/project/delete', function * () {
    var userdetails = this.req.user;
    userdetails.eproject = this.req.query;
    //Check if the query formed is good and user has that project or not
    if (userdetails.eproject) {
        //var editproject = yield project_edit(userdetails);
        var editvproject = yield project_delete(userdetails);
        var projects = this.req.user.projects;
        if (editvproject.delete) {
            this.body = yield render('notice.ejs', {
                notice: editvproject.delete
            });
        } else {
            this.body = yield render('notice.ejs', {
                notice: editvproject.notice
            });
        }
    } else {
        this.body = yield render('notice.ejs', {
            notice: "request malfunctioned, or you don't have access to the project "
        });
    }
});
//check the user in project editor as well
secured.get('/project/view', function * () {
    var userdetails = this.req.user;
    userdetails.proj = this.request.query;
    if (userdetails.proj) {
        var viewproject = yield project_find(userdetails);
        if (viewproject.notice) {
            this.body = yield render('notice.ejs', {
                notice: viewproject.notice
            });
        } else if (viewproject) {
            this.body = yield render('app_project_view.ejs', {
                project: viewproject,
                user: this.req.user
            });
        }
    } else {
        this.body = yield render('notice.ejs', {
            notice: "request malfunctioned, Please Try again "
        });
    }
});

secured.get('/project/timeline', function * () {
    var userdetails = this.req.user;
    this.body = "Timeline of the project will be visible here";
});
// To mix map create and map view, we will use the create modal which will create a node and redirect to view page :)
//THis accepts get req with get parameter id which is project id
secured.get('/project/maps/create', function * () {

    var userdetails = this.req.user;
    userdetails.pid = this.req.query.id;
    userdetails.m_n = this.req.query.name;
    this.body = yield render('map.ejs', {
        pid: userdetails.pid,
        p_n: userdetails.m_n
    });
});

secured.post('/project/maps/create', function * () {
    this.type = 'application/json';
    var userdetails = this.req.user;
    userdetails.cmaps = yield(parse(this));
    var result = yield map_create(userdetails);
    this.body = JSON.stringify(result);
});
//This will take get parameters pid -projectid and name - mapname
secured.get('/project/maps/find', function * () {
    this.type = 'application/json';
    var userdetails = this.req.user;
    userdetails.cmaps = this.request.query;
    var map = yield map_find(userdetails);
    this.body = JSON.stringify(map);
});


//This will take get parameters pid -projectid and name - mapname
secured.get('/project/maps/view', function * () {
    var userdetails = this.req.user;
    query = this.request.query;
    this.body = yield render('app_project_map', {
        pid: query.pid,
        name: query.name,
        user: this.req.user,
        pname: query.pname
    });
});

//accepts post requests with all map details and project id in the format given below

secured.post('/project/maps/addnode', function * () {
    this.type = 'application/json';
    var userdetails = this.req.user;
    userdetails.cmaps = yield(parse(this));
    var addnode = yield add_node(userdetails);
    this.body = JSON.stringify(addnode);
});

//accepts post requests with all map details and project id in the format given below
secured.post('/project/maps/editnode', function * () {
    this.type = 'application/json';
    var userdetails = this.req.user;
    userdetails.cmaps = yield(parse(this));
    var editnode = yield edit_node(userdetails);
    this.body = editnode;

});
//accepts post requests with project_id and map_name and i_no 
secured.post('/project/maps/delete', function * () {
    var userdetails = this.req.user;
    userdetails.cmaps = yield(parse(this));
    var result = yield delete_node(userdetails);
    this.body = JSON.stringify(result);
});

secured.get('*', function * (next) {
    this.body = yield render('404.ejs');
});
//All the methods for Team Management

var create_team = require('./util.js').teamcreate;
var add_team = require('./util.js').teamadd;
var remove_team = require('./util.js').teamremove;
var find_team = require('./util.js').teamfind;
var delete_team = require('./util.js').teamdelete;

//want name attribute in post request 
secured.post('/team/create', function * () {
    var userdetails = this.req.user;
    userdetails.team.name = yield parse(this);
    if (userdetails.team.name) {
        var result = yield create_team(userdetails);
        this.body = result;
    } else {
        this.body = "query not working"
    }
});

// want newmember array and name in post request
secured.post('/team/add', function * () {
    var userdetails = this.req.user;
    userdetails.team = yield parse(this);
    if (userdetails.team.name) {
        this.body = yield add_team(userdetails);
    } else {
        this.body = "query not working"
    }
});
// want name attribute and  member attribute
secured.post('/team/remove', function * () {
    var userdetails = this.req.user;
    userdetails.team = yield parse(this);
    if (userdetails.team.name) {
        this.body = yield remove_team(userdetails);
    } else {
        this.body = "query not working"
    }
});
// want a name attribute in a post request
secured.post('/team/find', function * () {
    var userdetails = this.req.user;
    userdetails.team = yield parse(this);
    if (userdetails.team.name) {
        this.body = find_team(userdetails);
    } else {
        this.body = "query not working"
    }
});

// want a name attribute in a post request
secured.post('/team/delete', function * () {
    var userdetails = this.req.user;
    userdetails.team = yield parse(this);
    if (userdetails.team.name) {
        this.body = yield delete_team(userdetails);
    } else {
        this.body = "query not working"
    }
});

secured.post('/finduser', function * () {
    this.body = "under development";
})


app.use(secured.middleware())
