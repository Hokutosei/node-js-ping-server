var events	= require('events');
var child	= require('child_process');

module.exports = function(target, options){
	var obj = new events.EventEmitter;
	var packets = 0;

	options = options || {};
	options.count = options.count || 10;

	function data(str){
		str = str + '';
		var lines = str.split("\n");
		if (lines.length > 1) {
			lines.forEach(data);
		} else {
			var clean = str.trim().replace(/\s+/g, ' ');
			var match = clean.match(/^(\d+) bytes from (.*?): icmp_[rs]eq=(\d+) ttl=(\d+) time=([\d\.]+) ms$/);
			if (!match) {
				match = clean.match(/^(\d+) packets transmitted, (\d+) received, (\d+)% packet loss, time (\d+)ms$/);
				if (match) {
					obj.emit('exit', {
						sent: +match[1],
						recieved: +match[2],
						loss: +match[3],
						time: +match[4]
					});
				}
			} else {
				obj.emit('data', {
					no: ++packets,
					bytes: +match[1],
					time: +match[4],
					ttl: +match[3]
				});
			}
		}
	}

	var spawn = child.spawn('ping', [target, '-c ' + options.count]);
	spawn.stdout.on('data', data);

	return obj;
};