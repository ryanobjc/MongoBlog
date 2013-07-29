var Contact = function () {
  this.index = function (req, resp, params) {
    this.respond({params: params}, {
      format: 'html'
    , template: 'app/views/contact/index'
    });
  };
};

exports.Contact = Contact;
