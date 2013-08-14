var Articles = function () {
    var md = require("node-markdown").Markdown;

  this.byAuthor = function(req, resp, params) {
      var self = this;
      var options = { "activePage": "articles" };
      geddy.model.Blog.all({author: params.author}, {sort: {postDate: 'desc'}}, function(err, blogs) {
	  self.respond( {params: params, options: options, blogs: blogs, md: md}, {
	      format: 'html',
	      template: 'app/views/articles/index'
	  });
      });
  }

  this.index = function (req, resp, params) {
      var self = this;
      var options = {
	  "activePage": "articles"
      };
      
      geddy.model.Blog.all({}, {sort: {postDate: 'desc'}}, function(err, blogs) {
	  self.respond({params: params, options: options, blogs: blogs, md: md}, {
	      format: 'html'
//	      , template: 'app/views/articles/index'
	  })
      });
  }
  this.article = function(req, resp, params) {
      var self = this;
      var options = {
	  "activePage": "articles"
      };

      geddy.model.Blog.first({linktitle: params.title}, function(err, blog) {
	  if (!blog) {
	      var err = new Error();
	      err.statusCode = 404;
	      self.error(err);
	  } else {
	      self.respond({options: options, blog: blog, md: md}, { format: 'html' });
	  }
      });
  }
}


exports.Articles = Articles;
