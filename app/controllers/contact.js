var Contact = function () {
  this.index = function (req, resp, params) {
    var options = {
      "activePage": "contact"
    };

    this.respond({params: params, options: options}, {
      format: 'html'
    , template: 'app/views/contact/index'
    });
  };
};

exports.Contact = Contact;
