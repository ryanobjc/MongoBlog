var strategies = require('../helpers/passport/strategies')
  , authTypes = geddy.mixin(strategies, {local: {name: 'local account'}});;

var Blogs = function () {
    var passport = require('../helpers/passport')
    , cryptPass = passport.cryptPass
    , requireAuth = passport.requireAuth;
    
  this.before(requireAuth);
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this
      , User = geddy.model.User;
    User.first({id: this.session.get('userId')}, function (err, user) {
      var data = {
        user: null
      , authType: null
      };
      if (user) {
        data.user = user;
        data.authType = authTypes[self.session.get('authType')].name;
      }
	geddy.model.Blog.all({}, {createdAt: 'desc'}, function(err, blogs) {
	    self.respond({user: data.user, authType: user.authType, 
			  params: params, blogs: blogs});
	});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
      params.linktitle = params.title.replace(/[^a-zA-Z0-9]/g, "-");
    var self = this
      , blog = geddy.model.Blog.create(params);

    if (!blog.isValid()) {
      this.flash.error(blog.errors);
      this.redirect({action: 'add'});
    }
    else {
      blog.save(function(err, data) {
        if (err) {
          self.flash.error(err);
          self.redirect({action: 'add'});
        }
        else {
          self.redirect({controller: self.name});
        }
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Blog.first(params.id, function(err, blog) {
      if (!blog) {
        var err = new Error();
        err.statusCode = 404;
        self.error(err);
      }
      else {
        self.respond({params: params, blog: blog.toObj()});
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Blog.first(params.id, function(err, blog) {
      if (!blog) {
        var err = new Error();
        err.statusCode = 400;
        self.error(err);
      }
      else {
        self.respond({params: params, blog: blog});
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Blog.first(params.id, function(err, blog) {

      blog.linktitle = params.title.replace(/[^a-zA-Z0-9]/g, "-");

      blog.updateProperties(params);

	
      if (!blog.isValid()) {
        this.flash.error(blog.errors);
        this.redirect({action: 'edit'});
      }
      else {
        blog.save(function(err, data) {
          if (err) {
            self.flash.error(err);
            self.redirect({action: 'edit'});
          }
          else {
            self.redirect({controller: self.name});
          }
        });
      }
    });
  };

  this.destroy = function (req, resp, params) {
    var self = this;

    geddy.model.Blog.remove(params.id, function(err) {
      if (err) {
        self.flash.error(err);
        self.redirect({action: 'edit'});
      }
      else {
        self.redirect({controller: self.name});
      }
    });
  };

};

exports.Blogs = Blogs;
