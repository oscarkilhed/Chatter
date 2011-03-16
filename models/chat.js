function makeRoom(name, that){
	var public = that || {};
	var private = {};
	
	if(name){
		public.name = name;
	}
	
	private.users = {};
	private.messages = [];
	private.queuedRequests = [];
	
	public.subscribe = function(last, callback){
		var newMessages = private.messages.slice(last+1);
		if(newMessages.length === 0){
			private.queuedRequests.push({
				last : last,
				callback : callback
			});
		}else{
			callback(newMessages);
		}
	}
	
	public.push = function(name, message){		
		private.messages.push({
			name : name,
			message : message,
			id : private.messages.length
		});
		
		for(i = 0; i < private.queuedRequests.length; i++){
			var item = private.queuedRequests[i];
			public.subscribe(item.last, item.callback);
		}
	}
	
	return public;
}


function makeChatStore (that) {
	var public = that || {};
	var private = {};

	private.rooms = {};
	
	public.pushMessage = function (room, name, message, callback) {
		if(!private.rooms[room]){
			private.rooms[room] = makeRoom(room);
		}
		callback();
		private.rooms[room].push(name, message);
	}
	
	
	public.subscribe = function(room, last, callback){
		if(!private.rooms[room]){
			private.rooms[room] = makeRoom(room);
		}
		private.rooms[room].subscribe(last, callback);
	}
	
	return public;
}

exports.chatter = makeChatStore();