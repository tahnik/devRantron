/* eslint-disable */
/**
 * We won't use this for now. We will work on it in later versions
 */
const notifier = require('node-notifier');
const path = require('path');

const isWin = /^win/.test(process.platform);
const isMac = /^dar/.test(process.platform);
const isLin = /^lin/.test(process.platform);

function notifyLinux(opt) {
  opt.browserWindow.send('os_notification', opt);
}
// path.join(__dirname, '128.png')

function notify(opt) {
  if (isLin) {
    notifyLinux(opt);
  }
}

module.exports = notify;
