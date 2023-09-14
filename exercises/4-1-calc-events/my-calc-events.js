const AbstractCalc = require('../4-1-calc/abstract-calc');

class MyCalcEvents extends AbstractCalc {
	constructor(emitter, method, ...numbers) {
		super(method, ...numbers);
		this._emitter = emitter;
		this._calcMethods = emitter.calcMethods;
	}

	_calc() {
		this._emitter.emit(this._method, ...this._numbers);
	}
	
}

module.exports = MyCalcEvents;
