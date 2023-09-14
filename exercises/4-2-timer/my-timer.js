
class MyTimer {
	_myTime = [
		{ measure: 'h', amount: 0, multiplier: 360 },
		{ measure: 'm', amount: 0, multiplier: 60 },
		{ measure: 's', amount: 0, multiplier: 1 },
	]

	_errors = [ ];

	constructor(timestring){
		this._timestring = timestring;
	}

	exec() {
		this._checkTimestringAndPrepare();
		if(this._errors.length) {
			this._generateErrors();
			return
		} 
		const ms = this._getMilisecond();
		setTimeout(this._timerCallback.bind(this), ms);
	}

	_checkTimestringAndPrepare(){
		if(this._timestring.trim() ==='') {
			this._errors.push('Не передан ни один аргумент');
			return;
		}

		const timeRegEx = this._generateTimeRegEx();
		const matchArr = [...this._timestring.matchAll(timeRegEx)];
		if (!matchArr.length) {
			this._errors.push(`Введены неверные аргументы: ${this._timestring}. Ни один из аргументов не соответствует формату.`);
			return;
		}

		const GROUP_COUNT = 3;
		const AMOUNT_GROUP_INDEX = 2;
		matchArr.forEach((match, matchIndex) =>{
			this._myTime.forEach((el, index) => {
				const amountGroupIndex = index * GROUP_COUNT + AMOUNT_GROUP_INDEX;
				const amountGroup = match[amountGroupIndex];

				if (amountGroup === undefined) return;

				const timeAmount = Number(amountGroup);
				if (Number.isNaN(timeAmount)) {
					this._errors.push(`Введено неверное значение для аргумента ${matchIndex+ 1}: ${match[0]}.`);
					return;
				}
				el.amount += timeAmount;
			})
		})
	}

	_generateTimeRegEx() {
		// /(([^\s]*)h(\s|$))|(([^\s]*)m(\s|$))|.../g
		const timeRegEx = this._myTime
			.map(el => `(([^\\s]*)${el.measure}(\\s|$))`)
			.join('|');
		return  new RegExp(timeRegEx, 'g');
	}

	_get

	_getMilisecond(){
		const res = this._myTime.reduce((acc, el) => acc += el.amount * el.multiplier, 0);
		return res * 1000;
	}

	_timerCallback() {
		console.log('Timer');
	}

	_generateErrors() {
		this._errors.forEach(e => console.error(`ОШИБКА: ${e}`));
		console.log(`Использование: node timer.js [время]
Примеры:
node timer.js 1h 10m 11s - установит таймер на 1 час 10 минут 11 секунд
node timer.js 10m 11s - установит таймер на 10 минут 11 секунд
node timer.js 11s - установит таймер на 11 секунд`
		);
	}

	
}

module.exports = MyTimer;