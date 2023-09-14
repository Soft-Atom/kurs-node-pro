const MyCalcEvents = require('./my-calc-events');
const MyEventEmitter = require('./my-event-emitter');

const [,, method, ...numbers ] = process.argv;
const myCalcEvents = new MyCalcEvents(new MyEventEmitter(), method, ...numbers);
myCalcEvents.exec();

