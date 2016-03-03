(function() {
	
	var express = require('express');
	
	var app = express();
	var PORT = 8050;
	
	app.use(express["static"](__dirname + '/app'));
	
	app.listen(PORT, function() {
		console.log('moodplay server started at http://localhost:' + PORT);
	});
	
}).call(this);
