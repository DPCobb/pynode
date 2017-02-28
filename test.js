const test = require('./main.js')

test.createData(['success', 'hello world'])
test.createData(['error', 'hello world'])
test.createData(['warning', 'hello world'])
test.pyFn(['isalnum', 'c2'])
console.log('alphanumeric: ' + test.result().data)
test.pyFn(['count', 'the cow jumped over the moon', 'the'])
console.log('count: ' + test.result().data)
