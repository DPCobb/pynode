import sys, json, os, datetime

class Logger (object):
    def __init__(self):
        self.data = sys.stdin.readlines()
        self.now = datetime.datetime.now()

    def read_in(self):
        return json.loads(self.data[0])

    #log the data
    def log(self, data):
        path = os.getcwd() + '/logs'
        if not os.path.exists(path): os.makedirs(path)
        msg = '-- ' + data[0] + ' @ ' + self.now.isoformat(' ') + ' MSG: ' + data[1]
        f = open("logs/testlog.txt", "a+")
        f.write(msg + '\n')

    def console(self, data):
        if data[0] == 'success':
            print ('\x1b[6;30;42m' + 'Success Event @ ' + self.now.isoformat(' ')  + '\x1b[0m \n\x1b[0;37m' + 'MSG:' + '\x1b[0m ' + data[1] + '\n\n')
        elif data[0] == 'warning':
            print ('\x1b[0;30;43m' + 'WARNING! @ ' + self.now.isoformat(' ')  + '\x1b[0m \n\x1b[0;37m' + 'MSG:' + '\x1b[0m ' + data[1] + '\n\n')
        elif data[0] == 'error':
            print ('\x1b[0;37;41m' + 'ERROR! @ ' + self.now.isoformat(' ')  + '\x1b[0m \n\x1b[0;37m' + 'MSG:' + '\x1b[0m ' + data[1] + '\n\n')
        else:
            print ('\x1b[0m' + 'Event @ ' + self.now.isoformat(' ')  + '\x1b[0m \n' + data[1] + '\n')


    def main(self):
        # gets data array
        self.dataIn = self.read_in()
        self.console(self.dataIn)
        self.log(self.dataIn)


# Instantiate and start log
log = Logger()
log.main()
