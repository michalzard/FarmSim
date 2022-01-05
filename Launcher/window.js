const { app, BrowserWindow,screen} = require('electron')
require('dotenv').config();

function createWindow () {
  const gameWindow = new BrowserWindow({
    autoHideMenuBar:false,
    width:screen.getPrimaryDisplay().size.width || 1080,
    height:screen.getPrimaryDisplay().size.height || 720,
    webPreferences:{
    devTools:true,
    },
    fullscreen:false,
    frame:process.env.ENV_MODE==="DEBUG" ? true : false,    
});
gameWindow.loadFile('../Game/index.html');
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

