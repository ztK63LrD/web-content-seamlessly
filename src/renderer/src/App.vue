<template>
  <div class="container">
    <div class="header">
      <div class="menu">
        <router-link to="/home" :class="{ active: currentIndex === 0 }" @click="currentIndex = 0">网站收藏</router-link>
        <router-link to="/imageGallery" :class="{ active: currentIndex === 1 }" @click="currentIndex = 1">图片收藏</router-link>
      </div>
      <div class="close" @click="close">关闭</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const { ipcRenderer } = require('electron')

const currentIndex = ref(0)
// 关闭窗口
const close = () => {
  ipcRenderer.send('close-main-window')
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none;    /* Firefox */
  -ms-user-select: none;     /* IE/Edge */
  user-select: none;         /* 标准语法 */
  scrollbar-width: none; /* Firefox 隐藏滚动条 */
}
.container {
  width: 100%;
  height: 100%;
  .header {
    width: 100%;
    height: 60px;
    background-color: #008c8c;
    display: flex;
    align-items: center;
    justify-content: space-between;
    -webkit-app-region: drag;
    .menu {
      width: 200px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      -webkit-app-region: no-drag;
      a {
        text-decoration: none;
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        &:hover {
          color: #008
        }
        &.active {
          color: #008
        }
      }
    }
    .close {
      width: 50px;
      color: #fff;
      -webkit-app-region: no-drag;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }
}
</style>
