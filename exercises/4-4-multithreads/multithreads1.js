const getCount = require('./getCount');
const perfFunc = require('./perfFunc');

async function main() {
	try {
		console.log(await getCount(1, 300_000));
	} catch(e) {
		if (e instanceof Error) console.log(e.message);
	}
}

main = perfFunc(main);
main();