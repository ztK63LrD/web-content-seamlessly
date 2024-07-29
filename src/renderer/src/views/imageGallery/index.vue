<template>
    <div class="imageGallery">
        <div class="img-item" v-for="(item, index) in imgList" :key="index">
            <img :src="`/src/assets/images/${item}`" alt="图片">
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const { ipcRenderer } = require('electron')

const imgList = ref([])

// 获取本地图片资源
const getLocalImages = async () => {
    const fileList = await ipcRenderer.invoke('on-getfiles-event')
    imgList.value = fileList
}
onMounted(() => {
    getLocalImages()
})
</script>

<style scoped lang="scss">
.imageGallery {
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    .img-item {
        width: 19%;
        img {
            width: 100%;
        }
    }

}
</style>
