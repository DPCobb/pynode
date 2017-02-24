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
          const alnum = this.passToPy(JSON.stringify(py))
          console.log('alnum: ' + alnum)
          if(alnum === 'True') {
            console.log('The string was alphanumeric')
          } else {
            console.log('The string was not alphanumeric')
          }
        } else {
          console.error('Incorrect Format');
        }
        break;
      default:
        break;
    }
  },
  passToPy(dataIn) {
    const py = spawn('python', [path.join(__dirname, '/log.py')]);
    py.stdin.write(dataIn);
    py.stdin.end();
    let dataOut = '';
    py.stdout.on('data', (dataReturn) => {
      dataOut += dataReturn;
    });
    py.stdout.on('close', () => {
      console.log(dataOut);
    });
    return dataOut
  }
}
