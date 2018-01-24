const electron = require('electron');

const {
  app, BrowserWindow, Menu, Tray, ipcMain, shell,
} = electron;

const https = require('https');
const os = require('os');
const path = require('path');
const url = require('url');
const { autoUpdater } = require('electron-updater');

const notify = require(path.join(__dirname, '/modules/notify.js'));

const systemSpecs = {
  cpu_speed: os.cpus()[0].speed,
  mem_available: os.freemem(),
  high_spec: false,
};

// 2 684 354 560 == 2.5 GiB
if (systemSpecs.cpu_speed > 2800 && systemSpecs.mem_available > 2684354560) {
  systemSpecs.high_spec = true;
}

exports.systemSpecs = systemSpecs;

const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} = require('electron-devtools-installer');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

console.time('startup'); //eslint-disable-line

function openRantComposer() {
  mainWindow.show();
  mainWindow.webContents.send('compose_rant');
}

function openNotifications() {
  mainWindow.show();
  mainWindow.webContents.send('open_notif');
}

function quitApp() {
  mainWindow.webContents.send('quitApp');
}

const handleRedirect = (e, link) => {
  if (url !== mainWindow.webContents.getURL()) {
    e.preventDefault();
    shell.openExternal(link);
  }
};


/** This function will create the tray icon */
function initTray() {
  // No idea why using let or var or const with tray causes the tray not to display anything
  /* eslint-disable */
  let icon = path.join(__dirname, '/res/images/devrantLogo24.png');
  tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open App', click() { mainWindow.show(); } },
    { type: 'separator' },
    { label: 'Compose A Rant', click() { openRantComposer(); } },
    { label: 'Open Notifications', click() { openNotifications(); } },
    { type: 'separator' },
    { label: 'Quit', click() { quitApp(); } },
  ]);
  tray.setToolTip('devRantron');
  tray.setContextMenu(contextMenu);
  tray.on('click', () => { mainWindow.show(); });
  /* eslint-enable */
}

/** This function will create the mainWindow */
function createWindow() {
  notify.init();

  // Send usage data to firebase
  if (process.env.NODE_ENV !== 'development') {
    let plat = 'linux';

    if (/^win/.test(process.platform)) { plat = 'windows'; }
    if (/^dar/.test(process.platform)) { plat = 'osx'; }
    if (/^lin/.test(process.platform)) { plat = 'linux'; }

    console.log(`Logging usage. Platform is ${plat}`);

    https.get(`https://us-central1-devrantron.cloudfunctions.net/logUser/${plat}`, () => {
      console.log('Logged usage.');
    }).on('error', (e) => {
      console.warn(e);
    });
  }

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 600,
    minHeight: 600,
    minWidth: 590,
    show: false,
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  if (process.env.NODE_ENV === 'development') {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    /* eslint-disable no-console */
    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log('An error occurred: ', err));

    installExtension(REDUX_DEVTOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log('An error occurred: ', err));
  }

  // just show the window if all content has been loaded
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();

    // measure startup time
    console.timeEnd('startup'); //eslint-disable-line
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    const notifyWindow = notify.ui();
    if (notifyWindow) {
      notifyWindow.destroy();
    }
  });

  mainWindow.webContents.on('new-window', handleRedirect);

  mainWindow.webContents.on('will-navigate', (e, link) => {
    if (link.indexOf('devrant.io') !== -1) {
      const user = link.substr(link.lastIndexOf('/') + 1, link.length);
      mainWindow.webContents.send('open-profile', { user });
      e.preventDefault();
    }
  });

  initTray();
}

const shouldQuit = app.makeSingleInstance(() => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

if (shouldQuit) {
  app.quit();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

app.setAppUserModelId('com.tahnik.devrantron');

if (process.platform === 'darwin') {
  app.on('before-quit', () => {
    quitApp();
  });
  app.on('activate', (e, hasVisibleWindow) => {
    if (!hasVisibleWindow) {
      mainWindow.show();
      mainWindow.focus();
    }
  });
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('auto-launch', (event, arg) => {
  if (process.env.NODE_ENV !== 'development') {
    const AutoLaunch = require('auto-launch'); //eslint-disable-line

    const AppAutoLauncher = new AutoLaunch({
      name: 'devRantron',
      mac: {
        useLaunchAgent: true,
      },
    });

    if (arg) {
      AppAutoLauncher.enable();
    } else {
      AppAutoLauncher.disable();
    }
  }
});

ipcMain.on('showQRNotif', (sender, n) => {
  notify.show(n);
});

let compact = false;
let prevBounds = {};

ipcMain.on('toggleCompact', () => {
  compact = !compact;
  const screenSize = electron.screen.getPrimaryDisplay().workArea;
  if (compact) {
    prevBounds = mainWindow.getBounds();

    mainWindow.setBounds({
      x: screenSize.width - 600, y: 0, width: 600, height: screenSize.height,
    });
  } else {
    mainWindow.setBounds({
      x: prevBounds.x,
      y: prevBounds.y,
      width: prevBounds.width,
      height: prevBounds.height,
    });
  }
});

module.exports.sendReply = (i, m) => {
  mainWindow.webContents.send('notifReply', { rantid: i, message: m });
};

ipcMain.on('zoom-level', (event, arg) => {
  mainWindow.webContents.setZoomLevel(parseFloat(arg));
});

ipcMain.on('minimiseApp', () => {
  mainWindow.hide();
});

ipcMain.on('forceQuitApp', () => {
  app.exit(0);
});

ipcMain.on('reLaunch', () => {
  app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) });
  app.exit(0);
});

ipcMain.on('updateNow', () => {
  autoUpdater.quitAndInstall();
});

autoUpdater.on('update-not-available', () => {
  mainWindow.webContents.send('upToDate');
});

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('newUpdate');
});

app.on('ready', () => {
  autoUpdater.checkForUpdates();
});
