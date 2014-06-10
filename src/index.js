var trigger = require("trigger");
var coroutine = require("coroutine");

module.exports = new Command();

function Command(name){
	var o = this;
	o._name = name;
	o._options = [];
	o.options = {};
	o._commands = [];
	o._version = '0.0.0';
}

Command.prototype.version = function(ver){
	var o = this;
	if(!ver)
		return o._version;
	else
		o._version = ver;
	return o;
}

Command.prototype.option = function(opt, desc){
	var o = this;
	if(opt.slice(0, 1) !== '-')
		throw 'option must start with "-"';

	trigger.on(opt, function(){
		o.options[opt.slice(1)] = true;
	});
	o._options.push(opt);
	return o;
}

Command.prototype.command = function(cmd, desc, callback){
	var o = this;
	if(cmd.slice(0, 1) === '-')
		throw 'option should not start with "-"';

	cmd = cmd.split(/\s+/ig)[0];
	trigger.on(cmd, function(obj, opt){
		var fib = (function(){
			callback(obj, o.options);
		}).start();
		fib.join();
		o.options = [];
	});
	o._commands.push(cmd);
	return o;
}

Command.prototype.parse = function(argvs){
	var o = this;
	argvs = argvs.slice(2);

	var len = argvs.length;
	for(var i=0;i<len;i++){
		if(o._options.indexOf(argvs[i]) !== -1){
			trigger.triggerSync(argvs[i]);
		}
	}

	for(var i=0;i<len;i++){
		if(o._commands.indexOf(argvs[i]) !== -1){
			trigger.triggerSync(argvs[i], argvs[i+1], o);
			return o;
		}
	}
	o.help();
	return o;
}

Command.prototype.help = function(){
	console.log("\thelp info！");
}
