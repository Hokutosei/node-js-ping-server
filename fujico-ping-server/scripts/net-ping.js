var ping = require('net-ping');

var session = ping.createSession();

console.log(session)

session.pingHost('google.com', function(error, target) {
	if (error)
		console.log (target + ": " + error.toString());
	else 
		console.log(target + ": Alive");
});
