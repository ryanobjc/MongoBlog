var Articles = function () {
  this.index = function (req, resp, params) {
    var options = {
      "activePage": "articles"
    };

    this.respond({params: params, options: options}, {
      format: 'html'
    , template: 'app/views/articles/index'
    });
  };
};

exports.Articles = Articles;
