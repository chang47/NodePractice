var kue = require('kue'),
jobs = kue.createQueue();

kue.app.listen(3000);
var sequence = 0;
setInterval(
	function() {
		sequence += 1;
		(function(sequence) {
			var job = jobs.create('email', {
			title: 'Hello #' + sequence,
			to: 'coralbue@gmail.com',
			body: "hi"
		}).save();
		

		job.on('complete', function() {
			console.log('job ' + sequence + ' completed!')
		});

		job.on("failed", function() {
			console.log(sequence + ' failed')
		});
	})(sequence);
}, 1000 );