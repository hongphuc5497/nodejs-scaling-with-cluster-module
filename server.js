const app = require('express')();
const cluster = require('cluster');
const os = require('os');

const MAX_CPU = os.cpus().length;
console.log('🚀 ~ file: server.js:6 ~ cpus', MAX_CPU);

app.get('/', (req, res) => {
	for (let i = 0; i < 1e3; i++) {
		// console.log(i);
	}

  res.send(`Ok with process ${process.pid} `);

	cluster.worker.kill();
});

if (cluster.isMaster) {
	for (let i = 0; i < MAX_CPU; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		console.log({
			worker,
			code,
			signal,
    });

    cluster.fork();
	});
} else {
	app.listen(8888, () => console.log(`Process ${process.pid} running...`));
}
