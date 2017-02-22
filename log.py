import sys, json, os

class Logger (object):
    def __init__(self):
        self.data = sys.stdin.readlines()

    def read_in(self):
        return json.loads(self.data[0])

    #log the data
    def log(self, data):
        path = os.getcwd() + '/logs'
        if not os.path.exists(path): os.makedirs(path)
        msg = 'This is ' + data[0] + ' and it is ' + data[0]
        f = open("logs/testlog.txt", "a+")
        f.write(msg + '\n')
        print 'log'

    def main(self):
        # gets data array
        self.dataIn = self.read_in()
        print self.dataIn[0]
        self.log(self.dataIn)


# Instantiate and start log
log = Logger()
log.main()
