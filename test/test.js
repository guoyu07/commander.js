"use strict";
require("test").setup();

var cmd = require("../src/index");

describe("commander", function() {

	it("option bool", function() {
		cmd.option('-d', 'do stuff')
			.parse(['js', 'test','-d']);
		assert.ok(cmd.options.d);
	});

	it("option bool no", function() {
		cmd.option('-p', 'please')
			.parse(['js', 'test','-d']);
		assert.ok(cmd.options.d);
		assert.notOk(cmd.options.p);
	});

	it("option error", function() {
		assert.throws(function(){
			cmd.option('p', 'please');
		}, 'option must start with "-"');
	});

	it("version", function() {
		assert.equal(cmd.version(), "0.0.0");
		cmd.version("0.0.1");
		assert.equal(cmd.version(), "0.0.1");
	});

	it("command error", function() {
		assert.throws(function(){
			cmd.command('-p');
		}, 'option should not start with "-"');
	});

	it("command", function() {
		var cmdValue = '';
		cmd.command("install [obj]", 'install something', function(obj, options){
			cmdValue = options.g ? obj : '';
		})
		.option('-g', 'global')
		cmd.parse(['js', 'test', 'install', 'fibjs', '-g']);
		assert.equal(cmdValue, 'fibjs');
		cmd.parse(['js', 'test', 'install', 'fibjs']);
		assert.equal(cmdValue, '');
	});

});

require("test").run();
// require("test").run(console.DEBUG);