const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

//express.json body parser
app.use(express.json());

//import routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/myposts");

//Route middleware for user
app.use("/api/user", authRoutes);
app.use("/api/posts", postRoutes);

//connect to database
mongoose.connect(
  process.env.DB_CONNECTION_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      console.log("Cannot connect to database");
    } else {
      console.log("Connected to database");
    }
  }
);

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Listening on port 3000");
  }
});
