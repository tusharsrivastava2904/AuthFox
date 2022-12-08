// name
// email
// password
// profilePic

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  pic: {
    type: String,
    required: true,
    default:
      "https://icon-library.com/icon/default-user-icon-13.html.html>Default User Icon # 21979",
  },
},

    {
        timestamps: true,
    }

);

const User = mongoose.model("User", userSchema);

module.exports = User;