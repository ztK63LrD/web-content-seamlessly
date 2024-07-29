const { ipcMain, dialog } = require('electron');

export const showMessage = () => {
    ipcMain.handle('onShowMessage', (_, msg) => {
        dialog.showMessageBoxSync({
            title: '消息提示',
            type: 'error',
            message: msg,
        })
    })
}