/**
 *
 * pynode - a Python Based logger for NodeJS
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
      // call method to manipulate data
      this.test();
    });
  }
  test() {
    let alnum;
    alnum = JSON.parse(fs.readFileSync('tmp.json'))
    if(alnum.data === 'True\n') {
      console.log('The string was alphanumeric')
    } else {
      console.log('The string was not alphanumeric')
    }
  }
}

module.exports = {
  // Object to pass Array into JSON.stringify for Python
  createData(arr) {
    const data = arr;
    const dataOut = JSON.stringify(data);
    this.passToPy(dataOut);
  },
  // pyFn takes a JSON object for formatting to send to Python functions
  pyFn(dataIn) {
    const py = dataIn;
    switch (py[0]) {
      case 'isalnum':
        if (py.length == 2){
          this.passToFn(JSON.stringify(py))
        } else {
          console.error('Incorrect Format');
        }
        break;
      default:
        break;
    }
  },
  passToFn(dataIn) {
    const l = new dataHold
    const py = spawn('python', [path.join(__dirname, '/log.py')]);
    py.stdin.write(dataIn);
    py.stdin.end();
    let dataOut = '';
    let key = JSON.parse(dataIn)
    py.stdout.on('data', (dataReturn) => {
      dataOut += dataReturn;
      l.hold(dataOut, key)
    });
    py.stdout.on('close', () => {
      console.log(dataOut);
    });
    return true;
  },
  passToPy(dataIn) {
    const l = new dataHold
    const py = spawn('python', [path.join(__dirname, '/log.py')]);
    py.stdin.write(dataIn);
    py.stdin.end();
    let dataOut = '';
    py.stdout.on('data', (dataReturn) => {
      dataOut += dataReturn;
      l.hold(dataOut, 'key')
    });
    py.stdout.on('close', () => {
      console.log(dataOut);
    });
    return true;
  }
}
