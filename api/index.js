const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path")

//import All Route Here 
const reviewRoute = require("./route/reviewRoute")
const category = require("./route/serviceCategoryRoute")
const service = require("./route/serviceRoute");
const user = require("./route/userRoute")
const forgotpassword = require("./route/forgotpasswordRoute")
const gallery = require("./route/galleryRoute")
const categorytwo = require("./route/serviceCategoryTwoRoute")


app.use(express.json());
dotenv.config();
app.use(cors({ origin: true, credentials: true }));


//connecting images folder to the server
app.use("/images", express.static(path.join(__dirname, "/images")));





//All the entry point of comes here
// app.use("/","Working properly")
// app.use("/api/user", userRoute)
app.use("/api/review", reviewRoute)
app.use("/api/category", category)
app.use("/api/categorytwo", categorytwo)
app.use("/api/service", service)
app.use("/api/user", user)
app.use("/api/forgot", forgotpassword)
app.use("/api/gallery", gallery)





//connecting build folder(React) to the server
__dirname = path.resolve();
app.use(express.static(path.join(__dirname, "./build")));

app.get("/", (req, res) => {
  res.send("Server is working Properly")
})

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });



// connecting database from the server(connection string from .env file)

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(console.log("connected to mongo")).catch(err => console.log(err));


app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend is listening at http://localhost:${process.env.PORT}`)
});