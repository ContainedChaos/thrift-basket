const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

//express app
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded())

//middleware
//app.use((req, res, next) => {
//    console.log(req.path, req.method)
//    next()
//})

//routes
//app.get('/', (req, res) => {
//    res.json({mssg: 'Welcome to the ThriftBasket'})
//})

const uri = process.env.ATLAS_URI;
mongoose.set("strictQuery", false);
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
console.log("MongoDB database connection established successfully");
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

//Routes
app.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 

app.post("/register", (req, res)=> {
    const { name, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 

//listen for requests
app.listen(9002, () => {
console.log('Server is running on port: 9002');
});