class AbstractCalc {
	_calcMethods = { 
		// methodName: calcFunction
	}

	_errors = [ ];

	constructor(method, ...numbers) {
		this._numbers = numbers.map(el => Number(el));
		this._method = method;
	}

	exec() {
		this._checkArguments();
		if (this._errors.length) {
			this._generateErrors();
			return;
		}
		this._calc();
	}

	_checkArguments() {
		if (!this._method) {
			this._errors.push('Не указан Метод');		
		} else if (!Object.hasOwn(this._calcMethods, this._method)) {
			this._errors.push(
				`Введен несуществующий Метод: ${this._method}. Допускается: ${Object.keys(this._calcMethods).join(', ')}`
			)
		}

		if(!this._numbers.length) {
			this._errors.push('Не указан ни один аргумент');	
		} else {
			this._numbers.forEach((value, index) => {
				if (Number.isNaN(value)) {
					this._errors.push(
						`Введено неверное значение: ${value}. Аргумент ${index + 1} должен быть числом`
					); 
				}
			});
		}
	}

	_generateErrors() {
		this._errors.forEach(e => console.error(`ОШИБКА: ${e}`));
		console.log(`Использование: node calc.js [Метод] [Аргументы]
		Аргументы - должны быть числами
		Метод - допускается: ${Object.keys(this._calcMethods).join(', ')}`)
	}

	_calc() { }

}

module.exports = AbstractCalc;