var About = function () {
  this.index = function (req, resp, params) {
    this.respond({params: params}, {
      format: 'html'
    , template: 'app/views/about/index'
    });
  };
};

exports.About = About;

