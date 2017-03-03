/**
 *
 * pynode - a Python Based tool for NodeJS
 * Daniel Cobb
 * 2-21-2017
 *
 */
 const fs = require('fs');
 const path = require('path');
 const spawn = require('child_process').spawn;

class dataHold {
  // store the data from python
  hold(dataIn, key) {
    this.data = dataIn;
    this.key = key;
    this.locker = {
      key: this.key,
      data: this.data,
    }
    const k = JSON.stringify(this.key)
    const d = this.data.toString()
    const k1 = k.toString().replace(/\n/g, ' ')
    const d1 = d.replace(/\n/g, ' ')
    this.msg = `Result: ${d1} Data: ${k1}\n`
    fs.appendFile('./tmp.txt', this.msg, (err) => {
      if (err) throw err;
    })
    console.log(this.msg)
}
}

module.exports = {
  count(data) {
    this.pyHandle(data)
  },
  isalnum(data) {
    this.pyHandle(data)
  },
  pyHandle(arr) {
    const data = JSON.stringify(arr);
    const l = new dataHold
    const py = spawn('python', [path.join(__dirname, '/log.py')], {stdio: [null, null, null, 'ipc']});
    py.stdin.write(data);
    py.stdin.end();
    let dataOut = '';
    let key = JSON.parse(data)
    const info = [];
    let res;
    py.stdout.on('data', (dataReturn) => {
      dataOut += dataReturn;
      l.hold(dataOut, key)
    });
    py.stdout.on('close', (dataReturn) => {

    });
  }
}
