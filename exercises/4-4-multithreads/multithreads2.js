const getCount = require('./getCount');
const perfFunc = require('./perfFunc');
const os = require('node:os');

async function main() {	
	try {
		const END = 300_000_003;
		const CORE_COUNT = os.cpus().length;
		const elCount = Math.floor(END / CORE_COUNT); 
		const arr = new Array(CORE_COUNT - 1).fill(1);
		const res = (await Promise.all([
			...arr.map((_, index) => getCount(index * elCount + 1, (index + 1) * elCount)),
			getCount((CORE_COUNT - 1) * elCount +1, END)
		])).reduce((acc,el) => acc += el, 0);
		console.log(res);
	} catch(e) {
		if (e instanceof Error) console.error(e.message);
	}
}

main = perfFunc(main);
main();