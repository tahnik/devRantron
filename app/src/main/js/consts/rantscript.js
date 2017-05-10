import electron from 'electron';
import rantscript from 'rantscript';

const rantscriptMain = electron.remote.require('rantscript');
export const rantscriptBrowser = rantscript;

// change to disable comprssion in production
rantscriptMain.httpSettings.SET_COMPRESS(false);
// only execute if we are in development
if (process.env.NODE_ENV === 'development') {
  rantscriptMain.httpSettings.SET_DEBUG(true);
}


// change to disable comprssion in production
rantscriptBrowser.httpSettings.SET_COMPRESS(false);
// only execute if we are in development
if (process.env.NODE_ENV === 'development') {
  rantscriptBrowser.httpSettings.SET_DEBUG(true);
}

export default rantscriptMain;
