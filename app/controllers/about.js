var About = function () {
  this.index = function (req, resp, params) {
    var options = {
      "activePage": "about"
    };

    this.respond({params: params, options: options}, {
      format: 'html'
    , template: 'app/views/about/index'
    });
  };
};

exports.About = About;

