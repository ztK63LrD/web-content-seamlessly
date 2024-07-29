const { ipcMain, BrowserWindow } = require('electron');
const WinState = require('electron-window-state');
import { saveas } from './saveas'

let win;
export const openWindow = () => {
    ipcMain.handle('on-open-window', (_, url) => {
        // 窗口状态管理
        const winState = new WinState({
            defaultWidth: 800,
            defaultHeight: 600,
            electronStoreOptions: {
                name: 'win-state'
            }
        });
        win = new BrowserWindow({
            width: winState.width, 
            height: winState.height,
            x: winState.x, 
            y: winState.y,
            show: false,
        });

        win.on('ready-to-show', () => {
            win.show();
        });

        win.loadURL(url);

        winState.manage(win); // 窗口状态管理

        // 监听窗口渲染进程的 dom-ready 事件
        win.webContents.once('dom-ready', () => {
            // 创建按钮和添加事件监听
            win.webContents.executeJavaScript(js).catch(error => {
                console.error('Failed to execute JavaScript in the window:', error);
            });
        });
        win.webContents.on('context-menu', (_, params) => {
            saveas(params.srcURL)
        })
    });
};

ipcMain.handle('on-close-event', () => {
    if (win) {
        win.close();
    }
});

// 创建css代码
const cssText = `width: 100px;height: 50px;background-color: #0084ff;text-align: center;border-radius: 10px;line-height: 40px;position: fixed;bottom: 50px;right: 40px;z-index: 999;color: #fff;cursor: pointer;`;
// 创建js代码
const js = `
    const btn = document.createElement('button');
    btn.id = 'button';
    btn.innerText = '按钮';
    btn.style.cssText = '${cssText}';
    document.body.appendChild(btn);
`;
