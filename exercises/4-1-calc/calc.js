const add = require('./add');
const multiply = require('./multiply');

const getArg = (i) => {
	const res = process.argv[i];
	if (res === undefined) {
		console.log(`Не указан параметр ${i - 1}`);
	}	
	return res;
}

const getNumArg = (i) => {
	let res = getArg(i);
	if (res === undefined) return res;

	res = Number(res);
	if (!Number.isFinite(res)){
		console.log(`${i-1} аргумент должен быть числом`);
		return undefined;
	}

	return res;
} 

const man = () => {
	console.log(`Использование: node calc.js [а] [b] [function]
	a, b - должны быть числами
	function - 'add'или 'multiply'(add - сложение, multiply - умножение)`)
}

const funcCall = (f, a, b) => {
	if (a && b) {
		console.log(f(a, b));
	} else {
		man();
	}
}

const main = () => {
	const a = getNumArg(2);
	const b = getNumArg(3);

	const operator = getArg(4);
	switch (operator) {
		case 'add':  
			funcCall(add, a, b);
			return;
		case 'multiply': 
			funcCall(multiply, a, b);
			return;
		case undefined: 
			break;
		default:
			console.log('Неверное значение параметра 3 (допускается add или multiply)');
			break ;	
	}
	man();
}

main();
