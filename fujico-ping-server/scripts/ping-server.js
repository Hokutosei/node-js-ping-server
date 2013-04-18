var pin = require('pin');

pin('http://google.com').interval(10000)
	.up(function(response) {
		console.log(response.socket);	
	})
	.down(function(error, response) {
		//console.log(response);
	})
