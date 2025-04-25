require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs' } });

require(['vs/editor/editor.main'], function () {
  monaco.editor.create(document.getElementById('editor-container'), {
    value: "// Benvenuto in UltraCode!\n// Inizia a scrivere il tuo codice qui...",
    language: "javascript",
    theme: "vs-dark",
    automaticLayout: true
  });
});
