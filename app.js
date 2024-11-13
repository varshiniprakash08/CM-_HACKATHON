const { compile } = require("ejs");
const express = require("express");
// const mongoose = require("mongoose");
const path = require("path");
const port = 5500;
// const jwt = require("jsonwebtoken");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyAKQ_tX2oP16TZkvrAFSBmq6QxQFA7lXJw");

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});



const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};
      
///

///
const app = express();
app.use(express.static("./Public"));
app.use(express.static("./Public/Post_Login"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');


// mongoose.connect("mongodb://localhost:27017");
// const db = mongoose.connection;
// db.once("open", () => {
//   console.log("Mongodb connection successful");
// });

// const userSchema = new mongoose.Schema({
//   username: String,
//   role: String,
//   email: String,
//   password: Number,
// });

// const Users = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  console.log("NEW REQUEST");
  // res.send("Hi")
  res.sendFile(path.join(__dirname, "./Public/main.html"));
});

// app.post("/register", async (req, res) => {
//   console.log("registration");
//   const { username, role, email, password } = req.body;

//   try {
//     const usernameExists = await Users.findOne({ username: req.body.username });
//     const emailExists = await Users.findOne({ email: req.body.email });
//     if (usernameExists && emailExists) {
//       res.status(400).send("Username and email already taken");
//     }
//     if (emailExists) {
//       res.status(400).send("Email already taken");
//     }
//     if (usernameExists) {
//       return res.status(400).send("Username already taken");
//     } else {
//       isLogedin = true;
//       console.log(isLogedin);
//       const newUser = new Users({ username, role, email, password });
//       await newUser.save();
//       //after registering redirect to loginnnnn.
//       res.sendFile(path.join(__dirname, "/Public/login.html"));
//       console.log("reg sucess");
//     }
//   } catch (err) {
//     // Save new user to MongoDB

//     res.status(500).send("Error registering user. Please try again.");
//     console.error(err);
//   }
// });

app.post("/Post_Login/landing.html", async (req, res) => {
  const { username, password } = req.body;
  try {
      res.sendFile(path.join(__dirname, "./Public/Post_Login/landing.html"));

  } catch (err) {
    console.log(err);
    res.send("failed");
  }
});


app.post("/Gen_AI", async (req, res) => {
  console.log("AI REQUESTED");

  const { section, course, weak, duration} = req.body;
  console.log(section, course, weak, duration);

  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(
      "I'm a student studying in class " +
        section +
        ". I am preparing for " +
        course +
        " and am weak in " +
        weak +"and the time left to prepare is "+duration+" months"+
        `generate me the road_map and timetable for this data, follow the following schema 
  RoadMap:{
    Phase_1:{
      Duration,
      Strategy,
      TimeTable:{
        Daily,
        Weekly,
        Monthly
      },
      Notes,
      Review

    },

    Phase_2:{
      Duration,
      Strategy,
      TimeTable:{
        Daily,
        Weekly,
        Monthly
      },
      Notes,
      Review
    },

    Phase_3:{
      Duration,
      Strategy,
      TimeTable:{
        Daily,
        Weekly,
        Monthly
      },
      Notes,
      Review
    },

    Recomended Books:{
      
    }
    
  } and the timetable and recomended books must be a string and include all subjects ,add no explanation or additional content and dont add any extra special characters just rturn a plain json object according to the given schema`);
    console.log(result.response.text());

    if (result) {
      // Clean up the JSON response
      const responseText = result.response.text().trim();
      const cleanedText = responseText.replace(/```json|```/g, '');

      // Parse the cleaned JSON and render the result
      const parsedResult = JSON.parse(cleanedText);
      res.render("roadmap", { result: parsedResult });
    }
  }
  run();
});



app.listen(port, (err) => {
  if (err) {
    console.log("Error " + err);
  } else {
    console.log("Server Running On Port " + port);
  }
});