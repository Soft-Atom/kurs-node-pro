const MyTimer = require('../4-2-timer/my-timer');
const notifier = require('node-notifier');

class TimerNotifier extends MyTimer {
	constructor(notifier, timestring){
		super(timestring);
		this._notifier = notifier;
	}

	_timerCallback() {
		this._notifier.notify('Timer');
	}
}
const [ ,,...args ] = process.argv;

const timerNotifier = new TimerNotifier(notifier, args.join(' '));
timerNotifier.exec();
