const MyTimer = require('../4-2-timer/MyTimer');
const notifier = require('node-notifier')

class TimerNotifier extends MyTimer {
	timerCallback() {
		notifier.notify('Timer');
	}
}

const timerNotifier = new TimerNotifier();
timerNotifier.exec();
