// 网站模块信息仓库
import { defineStore } from "pinia";
import { ref } from "vue"
const { ipcRenderer } = require('electron')

export const useWebSiteStore = defineStore("webSite", () => {
    let webSites = ref<any>([]);

    // 添加网站信息
    const addWebSite = (data) => {
        // 判断是否已经存在该网站信息
        if (webSites.value.find(item => item.url === data.url)) {
            ipcRenderer.invoke('onShowMessage', '此网站已经被添加了！')
        } else {
            webSites.value = [ data, ...webSites.value ]
        }
    }
    // 删除网站信息
    const deleteWebSite = (url) => {
        webSites.value = webSites.value.filter(item => item.url !== url)
    }
    return { 
        webSites, 
        addWebSite,
        deleteWebSite
    }
}, { persist: true }) // 开启持久化