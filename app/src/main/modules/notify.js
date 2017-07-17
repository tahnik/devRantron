/* eslint-disable */
/**
 * tahnik: We won't use this for now. We will work on it in later versions
 * rekkyrek: lol
 * tahnik: lol wut?
 */

const { BrowserWindow } = require('electron');
const notifier = require('node-notifier');
const path = require('path');
const url = require('url');

const isWin = /^win/.test(process.platform);
const isMac = /^dar/.test(process.platform);
const isLin = /^lin/.test(process.platform);

function notifyLinux(opt) {
  opt.browserWindow.send('os_notification', opt);
}
// path.join(__dirname, '128.png')
let w;
function initUI(opt) {
  w = new BrowserWindow({
    width: 460,
    height: 172,
    frame: false,
    show: false,
    resizable: true
  });

  w.loadURL(url.format({
    pathname: path.join(__dirname, 'notification.html'),
    protocol: 'file:',
    slashes: true
  }))

  setInterval(()=>{
    if(!w.isVisible()) {
      w.webContents.send('notifData', {});
    }
  }, 10000)

  w.on('closed', () => {
    w = null
  })
}

module.exports = {
  init: initUI,
  ui: () => {return w}
}
