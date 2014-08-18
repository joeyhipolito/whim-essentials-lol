var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  github        : {
    id          : String
  },
  name          : String,
  token         : String,
  email         : String,
  username      : String,
  createdAt     : { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);