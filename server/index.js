const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const cors = require('cors') 
// const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
// const categoryRoute = require("./routes/categories");
// const multer = require("multer");
// const path = require("path");


//initializing app
const app = express();

app.use(cors())
app.options('*', cors()); 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//defining URI key
dotEnv.config();

//Database connectivity by mongoose
mongoose.set('strictQuery', false) // will be true by default from mongoose 7
mongoose.connect(process.env.MONGO_URI) //will return promise
	.then(() => console.log("Connected to DB successfully"))
	.catch(err => console.log(err));


// app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
// app.use("/api/categories", categoryRoute);
// app.use("/images",express.static(path.join(__dirname,"/images")));

app.listen("5000", () => {
	console.log("Starting server at http://localhost:5000")
})