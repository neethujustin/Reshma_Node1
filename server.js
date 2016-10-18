
var express = require('express');
var app = express();
var uc;
var uname;
var path = require('path');
var mongo=require('mongodb');
var mongoClient=mongo.MongoClient;
var url="mongodb://mummy:mummy1@ds059496.mlab.com:59496/blogdatabase";
mongoClient.connect(url,function(err,db){
	console.log("huhyuhyui");
	uc=db.collection('data');
  });

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post('/login', function ( req, res) {	
	var user = req.param('uname');
	var pass = req.param('upass');
	  // res.send(username+ ' ' + name + ' ' + password);
	  // uc.find({username:usern});
	 uc.find({username: user}).toArray(function(err, docs) {
	      if(docs.length==0&&user!=null&&pass!=null){
	      	 uc.insert({username: user, password:pass}, function(err, result) {
	  	 	res.sendFile(__dirname + '/login.html');
	  	 });
	  	}
	  	 	else if(docs.length!=0){
	  		res.sendFile(__dirname+'/sign.html');
	      	 	
	      }
	  	 });
	 var npass=req.param('new');
	  	uc.update({username:uname},
   {$set:{password:npass}},{multi:true});
	  	res.sendFile(__dirname+'/login.html');
	      
})
app.post('/index', function ( req, res) {
	 var user = req.param('name');
	 var pass = req.param('pass');
	  // res.send(username+ ' ' + name + ' ' + password);
	  // uc.find({username:usern});
	 uc.find({username: user,password:pass}).toArray(function(err, docs) {
	      console.log("mn");
	    if(docs.length!=0&&user!=null&&pass!=null){
	      	 
	  	 	res.sendFile(__dirname + '/index.html');
	  	 
	  	}
	  	 	else{
	  		res.sendFile(__dirname+'/login.html');
	      	console.log("incorrect username or password");
	      	 	
	      }
	  	 });	
	      
})
app.post('/reset_pwd', function ( req, res) {
	uname=req.param('forgotname');
	console.log(uname);
	uc.find({username: uname}).toArray(function(err, docs) {
		if(docs.length!=0&&uname!=null){
	  	 	res.sendFile(__dirname + '/reset.html'); 	 
	  	}
	  	 	else{
	  		res.sendFile(__dirname+'/forgot.html');
	      	console.log("incorrect username");
	      	 	
	      }
	  	 });	
	});


app.use(express.static(path.join(__dirname, '/public')));
app.get('/', function (req, res) {
   res.sendFile(__dirname+'/index.html'); 
});
app.get('/login', function (req, res) {
   res.sendFile(__dirname+'/login.html'); 
});
app.get('/sign', function (req, res) {
   res.sendFile(__dirname+'/sign.html'); 

});
app.get('/index', function (req, res) {
   res.sendFile(__dirname+'/index.html'); 

});
app.get('/forgot', function (req, res) {
   res.sendFile(__dirname+'/forgot.html'); 

});
app.get('/reset', function (req, res) {
   res.sendFile(__dirname+'/reset.html'); 

});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
}); 

	

