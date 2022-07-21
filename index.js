const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");


const ImageRouter = require("./routes/images");
const userRoute = require("./routes/users");
const shipperRoute = require("./routes/shipper");
const blogRoute = require("./routes/blog");
const staffRoute = require("./routes/staff");
const supportRoute = require("./routes/support");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");
const blackListRoute = require("./routes/blacklist");
const oderRoute = require("./routes/oder");
const resetPwdRouter = require("./routes/resetPwd");

const port = process.env.PORT || 3000;

dotenv.config();

mongoose.connect(
    process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected to MongoDB");
    }
);

//middleware
app.use(express.json());
app.use(helmet());
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


//APIs Info User

//APIs Login/Register Account
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://serverluanvan.herokuapp.com/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use("/api/users", userRoute);
app.use("/api/shipper", shipperRoute);
app.use("/api/blog", blogRoute);
app.use("/api/staff", staffRoute);
app.use("/api/support", supportRoute);
app.use("/api/auth", authRoute);
app.use("/api/blacklist", blackListRoute);
app.use("/api/oder", oderRoute);
app.use("/api/resetpwd", resetPwdRouter);
app.use("/api/image", ImageRouter);


var server = app.listen(3000, () => {
    console.log("Backend server is running!");
    console.log("localhost:" + port);
});