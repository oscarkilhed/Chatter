function makeUser(name, that){
	var public = that || {};
	var private = {};
	
	public.name = name;
	return public;
}

function makeUserStore(that){
	var public = that || {};
	var private = {};
	
	private.users = {};
	
	public.getName = function(name){
		if(!private.users[name]){
 			var user = makeUser(name);
 			private.users[name] = user;
			return user;
		}else{
			return undefined;
		}
	}
	
	return public;
}

exports.userStore = makeUserStore();