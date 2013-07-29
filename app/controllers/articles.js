var Articles = function () {
  this.index = function (req, resp, params) {
    this.respond({params: params}, {
      format: 'html'
    , template: 'app/views/articles/index'
    });
  };
};

exports.Articles = Articles;
