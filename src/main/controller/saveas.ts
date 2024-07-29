const { Menu, dialog } = require('electron');
const path = require('path');
const got = require('got');
const imageType = require('image-type');
const randomstring = require('randomstring');
const fs = require('fs');

export const saveas = (srcUrl) => {
    if (srcUrl) {
        const contextMenu = Menu.buildFromTemplate([
            {
                label: '图片另存为',
                click() {
                    got.get(srcUrl).then(async (res: any) => {
                        const chunk = Buffer.from(res.rawBody);
                        const imgType = imageType(chunk);
                        console.log(imgType.ext)
                        const { filePath, canceled } = await dialog.showSaveDialog({
                            title: '图片另存为',
                            defaultPath: path.resolve(__dirname, '../../src/renderer/src/assets/images/' + randomstring.generate(10) + '.' + imgType.ext),
                        })
                        if (!canceled) {
                            fs.writeFileSync(filePath, chunk)
                        }
                    })
                },
                accelerator: 'CmdOrCtrl+S'
            },
        ])
        contextMenu.popup();
    }
}