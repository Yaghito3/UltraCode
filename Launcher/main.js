const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
const axios = require('axios');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');
}

// Handle fetching versions from GitHub
ipcMain.handle('fetchVersions', async () => {
  try {
    const response = await axios.get('https://api.github.com/repos/Yaghito3/UltraCode/tags');
    return response.data; // Array of tags
  } catch (error) {
    console.error('Errore nel recupero delle versioni:', error);
    return [];
  }
});

// Handle version installation
ipcMain.handle('installVersion', async (event, version) => {
  const versionPath = path.join(__dirname, 'versions', version);
  if (fs.existsSync(versionPath)) {
    return 'Versione già installata';
  }

  try {
    const response = await axios({
      url: `https://github.com/Yaghito3/UltraCode/archive/refs/tags/${version}.zip`,
      method: 'GET',
      responseType: 'stream'
    });

    const zipPath = path.join(__dirname, `${version}.zip`);
    const writer = fs.createWriteStream(zipPath);

    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    // Decomprimere il file zip
    const extract = require('extract-zip');
    await extract(zipPath, { dir: versionPath });

    fs.unlinkSync(zipPath); // Rimuovi il file zip dopo l'estrazione
    return 'Installazione completata';
  } catch (error) {
    console.error('Errore durante l\'installazione:', error);
    return 'Errore durante l\'installazione';
  }
});

// Handle opening a version
ipcMain.handle('openVersion', (event, version) => {
  const versionPath = path.join(__dirname, 'versions', version);
  if (!fs.existsSync(versionPath)) {
    return 'Versione non installata';
  }

  const editorPath = path.join(versionPath, 'UltraCode-main', 'main.js'); // Cambiare il percorso se necessario
  exec(`electron ${editorPath}`, (err) => {
    if (err) {
      console.error('Errore nell\'avvio dell\'editor:', err);
    }
  });
  return 'Editor avviato';
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});