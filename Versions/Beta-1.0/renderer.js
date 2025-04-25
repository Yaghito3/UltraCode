const { ipcRenderer } = require('electron');

// Riceve il contenuto del file dopo che è stato aperto
ipcRenderer.on('file-opened', (event, { filePath, fileContent }) => {
  const editor = document.getElementById('editor');
  editor.textContent = fileContent;
  document.getElementById('status').textContent = `File aperto: ${filePath}`;
});

// Salva il contenuto dell'editor in un file
ipcRenderer.on('save-file', (event, filePath) => {
  const editorContent = document.getElementById('editor').textContent;
  const fs = require('fs');
  fs.writeFileSync(filePath, editorContent, 'utf8');
  document.getElementById('status').textContent = `File salvato: ${filePath}`;
});