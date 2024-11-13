
const mongoose = require("mongoose");


function Connect(){


    mongoose.connect("mongodb://localhost:27017");
    const db = mongoose.connection;
    db.once("open", () => {
    console.log("Mongodb connection successful");
    });

    const userSchema = new mongoose.Schema({
    username: String,
    role: String,
    email: String,
    password: Number,
    });


}
const Users = mongoose.model("User", userSchema);

module.exports ={
    Connect,
    Users
}