var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  avatar: { type: String, required: true },
  facebookId: { type: String },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }
});

userSchema.set('toJSON', {
  transform: function(document, json) {
    delete json.passwordHash;
    delete json.__v;
    return json;
  }
});

// userSchema.pre("save", function(next) {
//     var self = this;
//     passwordRequired = {
//             validator: function(value) {
//                 if(self.facebookId.length === 20) {
//                   value = false;
//                 } else {
//                   value = true;
//                 }
//                 return value;
//             }
//           };
//           next();
// });


userSchema.virtual('password')
  .set(function(password) {
    this._password = password;

    this.passwordHash = bcrypt.hashSync(this._password, bcrypt.genSaltSync(8));
  });

userSchema.virtual('passwordConfirmation')
  .get(function() {
    return this._passwordConfirmation;
  })
  .set(function(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.path('passwordHash')
  .validate(function(passwordHash) {
    if(this.isNew) {
      if(!this._password) {
        return this.invalidate('password', 'A password is required');
      }

      if(this._password !== this._passwordConfirmation) {
        return this.invalidate('passwordConfirmation', 'Passwords do not match');
      }
    }
  });

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
}

module.exports = mongoose.model("User", userSchema);