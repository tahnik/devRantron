const notifier = require('node-notifier');
const path = require('path');

var isWin = /^win/.test(process.platform);
var isMac = /^dar/.test(process.platform);
var isLin = /^lin/.test(process.platform);

function notifyLinux(opt) {
  opt.browserWindow.send('os_notification', opt)
}
//path.join(__dirname, '128.png')

function notify(opt) {
  if (isLin) {
    notifyLinux(opt);
  }
}

module.exports = notify
