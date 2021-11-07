const { app, BrowserWindow,screen} = require('electron')
require('dotenv').config();

function createWindow () {
  const win = new BrowserWindow({
    width: screen.getPrimaryDisplay().size.width || 1920,
    height: screen.getPrimaryDisplay().size.height || 1080,
    webPreferences:{
    devTools:process.env.ENV_MODE==="DEBUG" ? true : false,
    },
    fullscreen:true,
    frame:false,
    
});

win.loadFile('../Game/index.html');
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

