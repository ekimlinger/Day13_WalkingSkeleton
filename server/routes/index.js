var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_walking_skeleton');

var Cat = mongoose.model('Cat',{name:String});


router.get('/*', function(req,res){
  var file = req.params[0] || 'views/index.html';
  res.sendFile(path.join(__dirname, '../public', file));
});

router.post('/addCat',function(request,response){
  var kittyObj = new Cat({name: request.body.name});
  kittyObj.save(function(err){
    if(err){
      console.log('meow %s',err);
    }
    console.log(kittyObj);
    response.send(kittyObj.toJSON());
  });
});
router.delete('/removeCat',function(request,response){
  var lostCat = request.body["_id"];
  console.log("Attempting to remove: ", lostCat);
  // db.basic_walking_skeleton.remove(lostCat, function(err){
  //    if(err){
  //      console.log("meow%s", err)
  //    }
  response.send(lostCat);

  });
//   *********************
//  TODO: FIGURE OUT HOW THE DELETE CALL WORKS!!!
//   *********************

});

router.get('/cats', function(request,response){
  return Cat.find({}).exec(function(err,cats){
    if(err) throw new Error(err);
    response.send(cats);
    //JSON.stringify(cats) <--replaced with cats
  });
});

module.exports = router;
