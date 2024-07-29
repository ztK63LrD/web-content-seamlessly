<template>
    <div class="dialog" v-if="showDialog">
        <div class="content">
            <div class="input">
                <input v-model="url" type="text" placeholder="请输入网址" @keyup.enter="handleAdd" />
            </div>
            <div class="btns">
                <button @click="handleAdd" :disabled="isSumbit">添加</button>
                <button @click="handleCannel" :disabled="isSumbit">取消</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
const { ipcRenderer } = require('electron')
import { useWebSiteStore } from '@renderer/store/modules/webSite'

let url = ref('https://www.')
const webSiteStore = useWebSiteStore()
const isSumbit = ref(false) // 是否提交

const { showDialog, setIsShow } = inject('dialog-visible') as any
const handleAdd = async () => {
    isSumbit.value = true
    try {
        if (url.value.startsWith('https://www.')) {
            let result = await ipcRenderer.invoke('add-url', url.value)
            webSiteStore.addWebSite(result)
            isSumbit.value = false  
            setIsShow(false)
        } else {
            ipcRenderer.invoke('onShowMessage', '当前输入不是正确网址！')
            url.value = 'https://www.'
            isSumbit.value = false
        }
    } catch (error) {
        ipcRenderer.invoke('onShowMessage', '无法访问该站点！')
        url.value = 'https://www.'
        isSumbit.value = false
    }
    url.value = 'https://www.'
}
const handleCannel = () => {
    setIsShow(false)
    url.value = 'https://www.'
}
</script>

<style scoped lang="scss">
.dialog {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    .content {
        width: 100%;
        padding: 0 20px;
        .input {
            width: 100%;
            height: 30px;
            outline: none;
            margin-bottom: 10px;
            font-size: 12px;
            input {
                width: 100%;
                height: 100%;
            }
        }
        .btns {
            button {
                height: 30px;
                margin-right: 10px;
                font-size: 12px;
                padding: 0 20px;
                cursor: pointer;
            }
        } 
    }
}
</style>
