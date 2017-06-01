import React from 'react';
import electron from 'electron';
import TitleBar from '../../components/navigation/titlebar';


const remote = electron.remote.getCurrentWindow();

const close = () => {
  remote.close();
};

const minimize = () => {
  remote.minimize();
};


const maximize = () => {
  if (!remote.isMaximized()) remote.maximize();
  else remote.unmaximize();
};

export default function TBar() {
  return (
    <TitleBar
      close={close}
      minimize={minimize}
      maximize={maximize}
    />
  );
}
