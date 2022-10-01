const express = require("express");
const mongoose = require("mongoose");
const userController = require("./user/routes/user");
const orderController = require("./user/routes/orders");
const cartController = require("./user/routes/cart");
const itemController = require("./user/routes/items");
const multer = require("multer")();
const app = express();
// const jwt = require("jsonwebtoken");
require('dotenv').config();
const cors = require("cors");
// const uprotectedRoutes = ["/user/login", "/user/signup"];
const port = process.env.PORT || 3001 ;
const DB = process.env.MONGO_DB
//server
app.listen(port, (err)=> {
    if(!err) {
        console.log(`Server started at port ${port}`)
    } else {
        console.log(err);
    }
});
//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(multer.array());
app.use(cors());

//connect to database
mongoose.connect(`${DB}`, (data)=> {
    console.log("Successfully connected to db");
}, (err)=> {
    console.log(err)
});

app.get("/", (req, res)=> {
    res.send("Ecommerce Backend")
});

//middleware
app.use(userController);
app.use(orderController);
app.use(cartController);
app.use(itemController)