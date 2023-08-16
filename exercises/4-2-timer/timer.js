
class MyTimer {
	
	constructor() {
		this.myTime = {
			'h': undefined,
			'm': undefined,
			's': undefined
		}
		this.error = false;
	}

	man() {
		console.log(`Использование: node timer.js [время]
Примеры:
node timer.js 1h 10m 11s - установит таймер на 1 час 10 минут 11 секунд
node timer.js 10m 11s - установит таймер на 10 минут 11 секунд
node timer.js 11s - установит таймер на 11 секунд`
		);
	}

	emitError(msg) {
		console.log(`Ошибка: ${msg}`);
		this.error = true;
	}

	get() {
		const p1 = process.argv[2];
		const p2 = process.argv[3];
		const p3 = process.argv[4];
		return {p1, p2, p3}
	}

	getMs(){
		for (const key in this.myTime) {
			if (this.myTime[key] === undefined)  this.myTime[key] = 0;
		}
		return (this.myTime['h'] * 60 + this.myTime['m'] * 60 + this.myTime['s']) * 1000
	}

	getValue(p, index) {
		const val = Number(p.slice(0, -1));
		if (!Number.isFinite(val)) {
			const msg =`Значение параметра ${index} имеет неверный формат`;
			this.emitError(msg);
			return;
		}
		return val;
	}

	setParamByName(paramName, p, index) {
		if (this.myTime[paramName] !== undefined) {
			const msg = `Попытка повторно задать параметр ${paramName}`;
			this.emitError(msg);
			return;
		}
		this.myTime[paramName] = this.getValue(p, index);
	}

	setParam(p, index){
		if(p === undefined) return;
		const paramName = p.substr(-1, 1);
		if (! paramName in this.myTime){
			const msg = `Значение параметра ${index} имеет неверный формат`;
			this.emitError(msg);
		}
		this.setParamByName(paramName, p, index);
	}

	prepare({p1, p2 ,p3}) {		
		if (p1 === undefined) {
			const msg = 'Hе указан ни один параметр';
			this.emitError(msg);
			return 0;
		}
		this.setParam(p1, 1);
		this.setParam(p2, 2);
		this.setParam(p3, 3);
		return this.getMs();
	}

	exec() {
		const input = this.get();
		const ms = this.prepare(input);
		if(!this.error) {
			setTimeout(()=>{
				console.log('Timer')
			}, ms)
		} else {
			this.man();
		}
	}
}

const myTimer = new MyTimer();
myTimer.exec();