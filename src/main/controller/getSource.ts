const { ipcMain, BrowserWindow } = require('electron');

export const getSource = () => {
    ipcMain.handle('add-url', async (_, url) => {
        const win = new BrowserWindow({
            width: 500,
            height: 500,
            show: false,
            webPreferences: {
                offscreen: true, // 开启 offscreen
            },
        });

        win.loadURL(url);

        return new Promise((resolve, reject) => {
            win.webContents.on('did-finish-load', async () => {
                try {
                    const title = win.getTitle();
                    // 获取nativeImage
                    const image = await win.webContents.capturePage();
                    if (image.isEmpty()) {
                        reject({ msg: '无法访问该站点！' });
                    } else {
                        const screenShot = image.toDataURL();
                        resolve({
                            title,
                            screenShot,
                            url
                        });
                    }
                } catch (error) {
                    reject(error);
                }
                // 关闭窗口，避免内存泄漏
                win.close();
            });
        });
    });
}