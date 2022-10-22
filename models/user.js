let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required:true
  },
  nom: {
    type: String,
    required:true
  },
  prenom: {
    type: String,
    required:true
  },
  tel: {
    type: String,
    unique: true,
    required:true
  },
  sexe: {
    type: String,
    required:true
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(Number(process.env.SALT), (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject(false);
      }
      resolve(true);
    });
  });
};
let collectionName = "users";
mongoose.model("user", userSchema, collectionName);


