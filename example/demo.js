var cmd = require("../src/index");
var process = require("process");

cmd.option("-g", "全局");
cmd.command("install [package]", "安装", function(pkg, opt){
	if(opt.g){
		console.log("全局安装", pkg);
	}else{
		console.log("局部安装", pkg);
	}
});
cmd.parse(process.argv);