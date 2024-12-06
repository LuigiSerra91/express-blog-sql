const logger = (req, res, next) => {
const start = new Date().toString();
console.log(req);

console.error(`[${start}] | ${req.method} | ${req.url}`);
next()
}

module.exports = logger