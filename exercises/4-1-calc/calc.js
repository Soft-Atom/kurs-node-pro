const MyCalc = require('./my-calc');

const [,, method, ...numbers ] = process.argv;
const myCalc = new MyCalc(method, ...numbers);
myCalc.exec();

