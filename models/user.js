var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  facebook      : {
    id          : String
  },
  github        : {
    id          : String
  },
  name          : String,
  token         : String,
  email         : String,
  username      : String,
  createdAt     : { type: Date, default: Date.now }
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = mongoose.model('User', userSchema);