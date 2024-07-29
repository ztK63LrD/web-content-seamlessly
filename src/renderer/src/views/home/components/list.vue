<template>
    <div class="list">
        <div class="no-item" v-if="webSiteStore.webSites.length <= 0">暂无数据...</div>
        <div class="item" v-for="(item, index) in filteredWebSites" :key="index">
            <div class="read-item" :class="{ selected: currentWebSite === index }" @click="handleClick(index, item.url)">
                <img :src="item.screenShot" :alt="item.title">
                <h2>{{ item.title }}</h2>
                <button @click.stop="handleDelete(item.url)"> x </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, inject, computed } from 'vue'
import { useWebSiteStore } from '@renderer/store/modules/webSite'
const webSiteStore = useWebSiteStore()
const { searcKeyWord } = inject('search-key') as any
const { ipcRenderer } = require('electron')

// 当前点击的网站
const currentWebSite = ref<number>(0)
// 点击网站
const handleClick = (index, url) => {
    currentWebSite.value = index
    // window.open(url, '_blank')
    ipcRenderer.invoke('on-open-window', url)
}
// 获取关键字网站信息 
const filteredWebSites = computed(() => {
    const keyword = searcKeyWord.value.trim().toLowerCase()
    if (!keyword) {
        return webSiteStore.webSites
    } else {
        return webSiteStore.webSites.filter(item => item.title.toLowerCase().includes(keyword))
    }
})
// 点击删除事件
const handleDelete = (url: string) => {
    webSiteStore.deleteWebSite(url)
    currentWebSite.value = 0
}
</script>

<style scoped lang="scss">
.list {
    width: 100%;
    height: 100%;
    .no-item {
        width: 100%;
        position: absolute;
        top: 100px;
        color: silver;
        font-weight: bold;
        text-align: center;
        z-index: -1;        
    }
    .item {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 15px;
        .read-item {
            width: 100%;
            min-height: 80px;
            display: flex;
            align-items: center;
            align-content: center;
            border-bottom: lightgray 2px solid;
            background: #fafafa;
            border-left: 10px solid lightgray;
            user-select: none;
            position: relative;
            padding: 10px;
            img {
                width: 20%;
                margin-right: 25px;
                border: 1px solid #ccc;
            }
            button {
                position: absolute;
                display: none;
                right: 10px;
                top: 10px;
                width: 30px;
                height: 30px;
                background: #f44336;
                border: none;
                border-radius: 50%;
                color: white;
                text-align: center;
                font-size: 16px;
                cursor: pointer;
            }
            &:hover {
                cursor: pointer;
                background-color: #ccc;
            }
            &:hover button {
                display: inline-block;
            }
            &.selected {
                border-left-color: dodgerblue;
            }
        }
    }
}
</style>
