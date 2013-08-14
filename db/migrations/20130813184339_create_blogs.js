var CreateBlogs = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('title', 'string');
          t.column('body', 'string');
          t.column('status', 'string');
	  t.column('linktitle', 'string');
	  t.column('author', 'string');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('blog', def, callback);
  };

  this.down = function (next) {
    var callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.dropTable('blog', callback);
  };
};

exports.CreateBlogs = CreateBlogs;
