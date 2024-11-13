const { compile } = require("ejs");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const port = 5500;
// const alert = require("alert");
// const popup = require('popups');

const app = express();
app.use(express.static("./Public"));
app.use(express.static("./Public/Post_Login"));
app.use(express.urlencoded({ extended: false }));

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

const Users = mongoose.model("User", userSchema);


app.get("/", (req, res) => {
    console.log("NEW REQUEST");
    res.sendFile(path.join(__dirname, "/Public/index.html"));

});

app.post("/register", async (req, res) => {
  const { username, role, email, password } = req.body;

  try {
    const usernameExists = await Users.findOne({ username: req.body.username });
    const emailExists = await Users.findOne({ email: req.body.email });
    if (usernameExists && emailExists) {
      res.status(400).send("Username and email already taken");
    }
    if (emailExists) {
      res.status(400).send("Email already taken");
    }
    if (usernameExists) {
      return res.status(400).send("Username already taken");
    } else {
      isLogedin = true;
      console.log(isLogedin)
      const newUser = new Users({ username, role, email, password });
      await newUser.save();
      //after registering redirect to loginnnnn.
      res.sendFile(path.join(__dirname, "/Public/Post_Login/landing.html"));
      console.log("reg sucess");
    }
  } catch (err) {
    // Save new user to MongoDB

    res.status(500).send("Error registering user. Please try again.");
    console.error(err);
  }
});

app.post("/login", async(req, res)=>{

  const{username,password} = req.body;
  try{
    const check_ = await Users.findOne({ username: req.body.username , password});
    console.log(req.body.username)
    if(!check_){
      res.send("user name cannot be found")
    }
    
    // const isPasswordMatch = await bcrypt.compare(req.body.password, check_.password);
    // if(isPasswordMatch){
    //   res.send("sucess")
    // }
    else{
      res.send("wrong password");
    }
  }
  catch(err){
    console.log(err)
    res.send("failed");
  }

})

// if(isLogedin){
//   console.log("Logged_In")
//   app.get("/Arivu", (req,res)=>{
//     res.sendFile(path.join(__dirname, "/Public/Post_Login/landing.html"));
//   })
// }

app.listen(port, (err) => {
  if (err) {
    console.log("Error " + err);
  } else {
    console.log("Server Running On Port " + port);
  }
})
