const test = require('./python.js')
//test.count(['count', 'the cow jumped over the moon again...', 'the'])
//const count = t.py.count(['count', 'the cow jumped over the moon again...', 'the'])
console.log('count: '+ test.count(['count', 'the cow jumped over the moon again...', 'the']))
console.log('alphanumeric: ' + test.isalnum(['isalnum', 'fghjk6']))
console.log('count: '+ test.count(['count', 'the cow jumped over the moon again...', 'moon']))

const numbers = ['1','2','1','1','1','1','4','5','7','5','6','3','5','2','1']

for(var i = 0; i < 10;) {
  test.count(['count', '1,2,1,1,1,1,4,5,7,5,6,3,5,2,1' , i.toString()])
  i++
}
/*
numbers.forEach((num)=>{
  test.count(['count','1,2,1,1,1,1,4,5,7,5,6,3,5,2,1' , num])
})

 */
