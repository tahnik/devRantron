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


const main = require('../app.js');

let callback = () => {}

function notifyLinux(opt) {
  opt.browserWindow.send('os_notification', opt);
}
// path.join(__dirname, '128.png')
let w;
function initUI() {
  w = new BrowserWindow({
    width: 460,
    height: 172,
    frame: false,
    show: false,
    resizable: false
  });

  w.loadURL(url.format({
    pathname: path.join(__dirname, 'notification.html'),
    protocol: 'file:',
    slashes: true
  }))

  w.on('closed', () => {
    w = null
  })
}

function showNotif(n) {
  w.webContents.send('notifData', n);
}

module.exports = {
  init: initUI,
  send: (i,m)=>{main.sendReply(i,m)},
  show: showNotif,
  ui: () => {return w}
}
