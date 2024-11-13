const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username: String,
    role: String,
    email: String,
    password: Number,
  });