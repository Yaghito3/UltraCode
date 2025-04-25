const { ipcRenderer } = require('electron');

require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs' } });

let editor;

require(['vs/editor/editor.main'], function () {
  editor = monaco.editor.create(document.getElementById('editor-container'), {
    value: "// Benvenuto in UltraCode!\n// Inizia a scrivere il tuo codice qui...",
    language: "javascript",
    theme: "vs-dark",
    automaticLayout: true
  });
});

document.getElementById('openFile').addEventListener('click', async () => {
  const fileData = await ipcRenderer.invoke('dialog:openFile');
  if (fileData) {
    editor.setValue(fileData.content);
    document.title = `UltraCode - ${fileData.filePath}`;
  }
});
