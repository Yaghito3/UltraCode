const { app, BrowserWindow, Menu, dialog } = require('electron');
const fs = require('fs');

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile('index.html');

  // Crea il menu
  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'Apri File...',
          click: async () => {
            const { canceled, filePaths } = await dialog.showOpenDialog({
              properties: ['openFile'],
              filters: [{ name: 'Tutti i file', extensions: ['*'] }],
            });

            if (!canceled && filePaths.length > 0) {
              const filePath = filePaths[0];
              const fileContent = fs.readFileSync(filePath, 'utf8');
              mainWindow.webContents.send('file-opened', { filePath, fileContent });
            }
          },
        },
        {
          label: 'Salva File...',
          click: async () => {
            const { canceled, filePath } = await dialog.showSaveDialog({
              title: 'Salva File',
              defaultPath: 'nuovo_file.txt',
              filters: [{ name: 'Tutti i file', extensions: ['*'] }],
            });

            if (!canceled && filePath) {
              mainWindow.webContents.send('save-file', filePath);
            }
          },
        },
        { type: 'separator' },
        { role: 'quit', label: 'Esci' },
      ],
    },
  ]);

  Menu.setApplicationMenu(menu);
}

app.whenReady().then(createMainWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});