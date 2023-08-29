const multiply = (...args) => args.reduce((acc, el) => acc *= el, 0);
module.exports = multiply;