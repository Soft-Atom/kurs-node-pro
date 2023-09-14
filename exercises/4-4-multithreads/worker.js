const {parentPort, workerData} = require('worker_threads');

const getCount = ({start, end}) => {
	count = 0;
	for (let i = start; i <= end; i++) {
		if ((i % 3) === 0) {
			count += 1; 
		}
	}
	return count;
}

parentPort.postMessage(getCount(workerData));