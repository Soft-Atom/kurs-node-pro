const {Worker} = require('worker_threads');

module.exports = function workerFunction(start, end) {
	return new Promise((resolve, reject) => {
		const workerProcess = new Worker('./worker.js', {
			workerData: {
				start,
				end
			}
		});

		workerProcess.on('message', (data) => resolve(data));
		workerProcess.on('error', (err) => reject(err))
	})
}