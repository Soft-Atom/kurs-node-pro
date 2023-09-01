const MyTimer = require('./my-timer')

const [ ,,...args ] = process.argv;

const myTimer = new MyTimer(args.join(' '));
myTimer.exec();