const {performance, PerformanceObserver} = require('perf_hooks');

module.exports = function perfFunc(f) {
	const perfObserver = new PerformanceObserver((items) => {
		const item = items.getEntriesByName(f.name)[0];
		console.log(`${item.name}: ${item.duration}`);
	})

	perfObserver.observe({entryTypes: ['function']});

	return performance.timerify(f);
}