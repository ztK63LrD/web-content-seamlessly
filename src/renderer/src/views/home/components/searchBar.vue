<template>
    <div class="search-container">
        <div class="button" @click="handleAdd">+</div>
        <div class="input">
            <input type="text" placeholder="请输入关键字" @keyup="serchContent">
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'

const { setIsShow } = inject('dialog-visible') as any
const { setSearchKeyWord } = inject('search-key') as any
const handleAdd = () => {
    setIsShow(true)
}


const serchContent = (e: any) => {
    setSearchKeyWord(e.target.value)
}
</script>

<style scoped lang="scss">
.search-container {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba($color: #008c8c, $alpha: .3);
    padding: 0 10px;
    -webkit-app-region: drag;
    .button {
        width: 40px;
        height: 40px;
        background-color: #008c8c;
        border-radius: 5px;
        font-size: 30px;
        font-weight: bold;
        color: #fff;
        text-align: center;
        line-height: 35px;
        cursor: pointer;
        -webkit-app-region: no-drag;
    }
    .input {
        flex: 1;
        height: 36px;
        padding: 0 10px;
        -webkit-app-region: no-drag;
        input {
            width: 100%;
            height: 100%;
            outline: none;
            border: 1px solid #008c8c;
            border-radius: 5px;
            padding: 0 10px;
        }
    }
}
</style>
