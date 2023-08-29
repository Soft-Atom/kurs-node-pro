const add = (...args) => args.reduce((acc, el) => acc += el, 0);
module.exports = add;