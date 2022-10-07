

console.log("NODE ENV", process.env.NODE_ENV)

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./key_prod');
} else {
    module.exports = require('./key_dev');
}
 

