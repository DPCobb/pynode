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
    // write to json file
    fs.writeFile('./tmp.json', JSON.stringify(this.locker, null, 2), (err) => {
      if (err) throw err;
    });

    return this.locker;

  }
}

module.exports = {
  count(data) {
    return this.pyHandle(data)
  },
  pyHandle(arr) {
    const data = JSON.stringify(arr);
    const l = new dataHold
    const py = spawn('python', [path.join(__dirname, '/log.py')]);
    py.stdin.write(data);
    py.stdin.end();
    let dataOut = '';
    let info = '';
    let key = JSON.parse(data)
    py.stdout.on('data', (dataReturn) => {
      dataOut += dataReturn;
      l.hold(dataOut, key)
    });
    py.stdout.on('close', () => {
      return this.result().data;
    });
    return this.result().data;
  },
  result() {
    const result = JSON.parse(fs.readFileSync('./tmp.json'));
    return result;
  }
}
