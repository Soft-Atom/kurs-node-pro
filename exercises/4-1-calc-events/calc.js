const {EventEmitter} = require ('events');

class MyEvenEmitter extends EventEmitter {
	constructor() {
		super();
		this.on('result', data => console.log(data));
		this.on('add', (a, b) => {
			this.emit('result', a + b);
		})
		this.on('multiply', (a, b) => {
			this.emit('result', a * b);
		})
	}
}

class MyCalc {
	constructor(emitter) {
		this.emitter = emitter;
	}

	man() {
		console.log(`Использование: node calc.js [а] [b] [function]
a, b - должны быть числами
function - 'add'или 'multiply'(add - сложение, multiply - умножение)`
		);
	}

	getParams() {
		const a = process.argv[2];
		const b = process.argv[3];
		const method = process.argv[4];
		return {a, b, method}
	}

	paramExists(param, index) {
		if (param === undefined) {
			console.log(`Не указан параметр ${index}`);
		}
		return param
	}

	prepareNumParam(num, index) {
		if(this.paramExists(num, index) === undefined) return undefined;
		num = Number(num);
		if (!Number.isFinite(num)) {
			console.log(`${index} параметр должен быть числом`);
			return undefined;
		}
		return num;
	}

	prepareMethodParam(method){
		if(this.paramExists(method, 3) === undefined) return undefined;
		if (!(method === 'add' || method === 'multiply')) {
			console.log('Неверное значение параметра 3 (допускается add или multiply)');	
			return undefined;	
		}
		return method;
	}

	prepareParams({a, b, method}) {
		a = this.prepareNumParam(a, 1);
		b = this.prepareNumParam(b, 2);
		method = this.prepareMethodParam(method)
		return {a, b, method} 
	}


	checkParams({a, b, method}) {	
		return a!==undefined && b!==undefined && method!==undefined;
	}

	emit({a, b, method}){
		this.emitter.emit(method, a, b);
	}

	exec() {
		if(!this.emitter instanceof MyEvenEmitter) {
			throw new Error('Неверно задан Emitter')
			return
		}
		const input = this.getParams();
		const params = this.prepareParams(input);
		if (this.checkParams(params)) {
			this.emit(params);
		} else {
			this.man();
		}
	}
}


const myCalc = new MyCalc(new MyEvenEmitter());
myCalc.exec();
