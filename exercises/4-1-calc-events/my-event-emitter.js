const {EventEmitter} = require ('events');

class MyEventEmitter extends EventEmitter {
	calcMethods = {
		'add': (...args) => {
			const res = args.reduce((acc, el) => acc += el, 0);
			this.emit('result', res);
		},
		'multiply': (...args) => {
			const res = args.reduce((acc, el) => acc *= el, 0)
			this.emit('result', res);
		},
	}

	constructor() {
		super();
		this.on('result', data => console.log(data));
		Object.entries(this.calcMethods).forEach(([key, value]) => {
			this.on(key, value);
		});
	}
}

module.exports = MyEventEmitter;