const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    title: "Pro-Vision Admin Console",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false, // Critical for loading local video streams later
    },
  });

  // 1. DEVELOPMENT MODE: Load from the local Vite server
  // Ensure this port matches your Vite port (usually 5173)
  const startUrl = 'http://localhost:5173';
  
  mainWindow.loadURL(startUrl);

  // Optional: Open DevTools automatically (good for debugging)
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { // Mac users expect apps to stay open
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});