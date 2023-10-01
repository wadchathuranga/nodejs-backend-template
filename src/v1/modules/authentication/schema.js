const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const { Config, Databases } = require('../../../../config');

const { MONGO_DB_NAME_V1, JWT_EXPIRE, JWT_SECRET_STR } = Config.APPLICATION;

const conn = Databases.Mongo.connect(MONGO_DB_NAME_V1);

mongoose.connection = conn;

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },

  userName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    index: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  role: {
    type: String,
    enum: ['user', 'admin', 'super_admin'],
    default: 'user',
  },
}, { timestamps: true });

// Encrypt password using bcryptjs
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match user entered password with the password which is saved in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.genAccessToken = async function (payload) {
  return jwt.sign(payload, JWT_SECRET_STR, { expiresIn: JWT_EXPIRE });
};


const User = mongoose.model("User", UserSchema);
module.exports = User;
