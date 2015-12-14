var backup = require('mongodb-backup');

backup({
  uri: 'mongodb://localhost/animehub',
  root: __dirname
});