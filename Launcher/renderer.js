const { ipcRenderer } = require('electron');

async function loadVersions() {
  const versionList = document.getElementById('versionList');
  versionList.innerHTML = '<p>Caricamento...</p>';

  const versions = await ipcRenderer.invoke('fetchVersions');
  versionList.innerHTML = '';

  if (versions.length === 0) {
    versionList.innerHTML = '<p>Nessuna versione trovata.</p>';
    return;
  }

  versions.forEach((version) => {
    const versionItem = document.createElement('div');
    versionItem.className = 'version-item';

    const versionName = document.createElement('span');
    versionName.textContent = version.name;

    const installButton = document.createElement('button');
    installButton.textContent = 'Installa';
    installButton.addEventListener('click', async () => {
      const result = await ipcRenderer.invoke('installVersion', version.name);
      alert(result);
    });

    const openButton = document.createElement('button');
    openButton.textContent = 'Apri';
    openButton.addEventListener('click', async () => {
      const result = await ipcRenderer.invoke('openVersion', version.name);
      alert(result);
    });

    versionItem.appendChild(versionName);
    versionItem.appendChild(installButton);
    versionItem.appendChild(openButton);
    versionList.appendChild(versionItem);
  });
}

loadVersions();