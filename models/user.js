var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  local: {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  username: { String, required: true, unique: true },
  first_name: String,
  last_name: String,
  picture: String
});

UserSchema.statics.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("User", UserSchema);