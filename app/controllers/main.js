var Main = function () {
  this.index = function (req, resp, params) {
    var self = this;

    var options = {
      "activePage": "home"
    };

    this.respond({params: params, options: options}, {
      format: 'html',
      template: 'app/views/main/index'
    });
  };
};

exports.Main = Main;
