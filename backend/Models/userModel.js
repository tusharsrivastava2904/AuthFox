// name
// email
// password
// profilePic

const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pic: {
    type: String,
    default:
      "https://icon-library.com/icon/default-user-icon-13.html.html>Default User Icon # 21979",
  },
},

    {
        timestamps: true,
    }

);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function (next) {
  if(!this.isModified){
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

});

const User = mongoose.model("User", userSchema);

module.exports = User;