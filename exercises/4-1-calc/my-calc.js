const AbstractCalc = require('./abstract-calc');

class MyCalc extends AbstractCalc{
	_calcMethods = {
		'add': require('./add'),
		'multiply': require('./multiply')
	}

	constructor(method, ...numbers) {
		super(method, ...numbers);
	}

	_calc() {
		const method = this._calcMethods[this._method];
		console.log(method(...this._numbers));
	}

}

module.exports = MyCalc;