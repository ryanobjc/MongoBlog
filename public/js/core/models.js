(function () {
var Blog = function () {

  this.defineProperties({
    title: {type: 'string', required: true},
    body: {type: 'string'},
    status: {type: 'string'},
    linktitle: {type: 'string', required: true},
    author: {type: 'string'},
    postDate: {type: 'date'},
  });

  //this.validatesFormat('linktitle', /[a-zA-Z0-9-]/, {message: 'Link title wrong'});
  /*
  this.property('login', 'string', {required: true});
  this.property('password', 'string', {required: true});
  this.property('lastName', 'string');
  this.property('firstName', 'string');

  this.validatesPresent('login');
  this.validatesFormat('login', /[a-z]+/, {message: 'Subdivisions!'});
  this.validatesLength('login', {min: 3});
  // Use with the name of the other parameter to compare with
  this.validatesConfirmed('password', 'confirmPassword');
  // Use with any function that returns a Boolean
  this.validatesWithFunction('password', function (s) {
      return s.length > 0;
  });

  // Can define methods for instances like this
  this.someMethod = function () {
    // Do some stuff
  };
  */

};

/*
// Can also define them on the prototype
Blog.prototype.someOtherMethod = function () {
  // Do some other stuff
};
// Can also define static methods and properties
Blog.someStaticMethod = function () {
  // Do some other stuff
};
Blog.someStaticProperty = 'YYZ';
*/

exports.Blog = Blog;

}());

(function () {
var Passport = function () {
  this.defineProperties({
    authType: {type: 'string'},
    key: {type: 'string'}
  });

  this.belongsTo('User');
};

Passport = geddy.model.register('Passport', Passport);
}());

(function () {
var User = function () {
  this.defineProperties({
    username: {type: 'string', required: true},
    password: {type: 'string', required: true},
    familyName: {type: 'string', required: true},
    givenName: {type: 'string', required: true},
    email: {type: 'string', required: true}
  });

  this.validatesLength('username', {min: 3});
  this.validatesLength('password', {min: 8});
  this.validatesConfirmed('password', 'confirmPassword');

  this.hasMany('Passports');
};

User = geddy.model.register('User', User);
}());