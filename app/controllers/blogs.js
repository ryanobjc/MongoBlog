var Blogs = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Blog.all(function(err, blogs) {
      self.respond({params: params, blogs: blogs});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this
      , blog = geddy.model.Blog.create(params);

      // set linktitle
      blog.linktitle = blog.title.replace(/[^a-zA-Z0-9]/g, "-");

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
