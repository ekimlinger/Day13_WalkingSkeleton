var express = require('express');

var app = express();
var index = require('./routes/index.js');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/",index);

// app.get("/", function(req,res){
//   res.send("Hello!");
// });



var server = app.listen (3000, function(){
  var port = server.address().port;
  console.log("Listening on port: ", port);

});
