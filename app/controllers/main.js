var strategies = require('../helpers/passport/strategies')
  , authTypes = geddy.mixin(strategies, {local: {name: 'local account'}});;

var Main = function () {

  this.index = function (req, resp, params) {
     var options = {
       "activePage": "home"
     }
     this.respond({options: options, params: params}, {
        format: 'html'
      , template: 'app/views/main/index'
      });
  };

  this.login = function (req, resp, params) {
    this.respond(params, {
      format: 'html'
    , template: 'app/views/main/login'
    });
  };

  this.logout = function (req, resp, params) {
    this.session.unset('userId');
    this.session.unset('authType');
    this.respond(params, {
      format: 'html'
    , template: 'app/views/main/logout'
    });
  };

};

exports.Main = Main;


