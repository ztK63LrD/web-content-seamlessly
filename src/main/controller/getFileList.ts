const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

export const getFilesList = () => {
    ipcMain.handle('on-getfiles-event', (_, __) => {
        return fs.readdirSync(path.resolve(__dirname, '../../src/renderer/src/assets/images/'))
    })
}