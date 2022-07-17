const parser = require('any-date-parser');

const startDate = parser.attempt('2020-10-06T17:41:28.999Z')
console.log(startDate.year + "-" + startDate.month)