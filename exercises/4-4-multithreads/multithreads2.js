const getCount = require('./getCount');
const perfFunc = require('./perfFunc');

async function main() {	
	try {
		const END = 300_003;
		const CORE_COUNT = 4;
		const elCount = Math.floor(END / CORE_COUNT); 
		let arr = (new Array(CORE_COUNT - 1)).fill(1);
		arr = await Promise.all([
			...arr.map((_, index) => getCount(index * elCount + 1, (index + 1) * elCount)),
			getCount((CORE_COUNT - 1) * elCount +1, END)
		])	
		console.log(arr.reduce((acc,el) => acc += el, 0));
	} catch(e) {
		if (e instanceof Error) console.log(e.message);
	}
}

main = perfFunc(main);
main();