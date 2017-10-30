var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//API
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/bookshop");

var db = mongoose.connection;
db.on("error", console.error.bind(console, "#MongoDB - connection error: "));

//SETUP SESSIONS
app.use(session({
  secret: "mySecretString",
  saveUninitialized: false,
  resave: false,
  cookie: {maxAge: 1000*60*60*24*2},
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
}))

//SAVE SESSION CART API
app.post("/cart", (req, res) => {
  const cart = req.body;
  req.session.cart = cart;
  req.session.save((err) => {
    if (err){
      throw err;
    }
    res.json(req.session.cart);
  })
})

//GET SESSION CART API
app.get("/cart", (req, res) => {
  if(typeof req.session.cart !== "undefined"){
    res.json(req.session.cart);
  }
})

//End Setup sessions

var Books = require("./models/books.js");

//POST BOOK
app.post("/books", function(req, res){
  var book = req.body;

  Books.create(book, function(err, books){
    if(err){
   throw err;
    }
    res.json(books);
  })
});

//GET BOOKS
app.get("/books", function(req, res){
  Books.find(function(err, books){
    if(err){
      throw err;
    }
    res.json(books)
  })
})

//DELETE BOOKS
app.delete("/books/:_id", function(req, res){
  var query = {_id:req.params._id}

  Books.remove(query, function(err, books){
    if (err){
      console.log("# API DELETE BOOKS: ", err);
    }
    res.json(books);
  })
})

//UPDATE BOOKS
app.put("/books/:id", function(req, res){
  var book = req.body;
  var query = req. params._id;
  //if the field doesn't exist $set will set a new field
  var update = {
    "$set":{
      title:book.title,
      description:book.description,
      image:book.image,
      price:book.price
    }
  }
  //When true returns the udpate document
  var options = {new: true};

  Books.findOneAndUpdate(query, update, options, function(err, books){
    if(err){
      throw err
    }
    res.json(books);
  })

})

//GET BOOKS IMAGES API
app.get("/images", (req, res) => {
  const imgFolder = __dirname + "/public/images/"
  //REQUIRE FILE SYSTEM
  const fs= require("fs");
  //READ ALL FILES IN THE DIRECTORY
  fs.readdir(imgFolder, (err, files) => {
    if (err){
      return console.error(err);
    }
    //CREATE AN EMPTY ARRAY
    const filesArr = [];
    //ITERATE ALL IMAGES IN DIRECTORY AND ADD TO
    files.forEach((file) => {
      filesArr.push({name: file});
    })
    //SEND THE JSON RESPONSE WITH ARRAY
    res.json(filesArr);
  })
})

//END API

app.listen(3001, (err) => {
  if(err){
    return console.log(err)
  }
  console.log("API server is running on http://localhost:3001")
})
