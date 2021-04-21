var generator    = require('./lib/generate');
var generatePaymentNumber = {};

generatePaymentNumber.generate = generator.generateCardNumber;
module.exports = generatePaymentNumber;