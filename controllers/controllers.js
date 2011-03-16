chatmodel = require('../models/chat.js');
usermodel = require('../models/user.js');
var chatter = chatmodel.chatter;
var userStore = usermodel.userStore;
exports.home = {
	index : function(req, res){
		res.render('index', {locals: {title: 'Chatter'}});
	},
	
	logOn : function(req,res){
		res.contentType('json');
		var user = userStore.getName(req.body.name);
		console.log("logon for user: " + req.body.name)
		if(user){
			req.session.user = user;
			res.send("success");
		}else{
			res.send("failed");
		}
	}
};

exports.chat = {
	room : function(req, res){
		res.render('chat/index', {locals: {title: "#" + req.params.room}});
	},
	
	get : function(req, res){
		chatter.subscribe(req.params.room, parseInt(req.query.last), function(newMessages){
			res.contentType('json');
			res.send(JSON.stringify(newMessages));
		});
	},
	
	post : function(req, res){
		chatter.pushMessage(req.params.room, req.session.user.name, req.body.message.message, function(){
			res.contentType('json');
			res.send();
		});
	}
}