<template>
    <div class="home">
        <searchBar></searchBar>
        <List></List>
    </div>
    <Dialog></Dialog>
</template>

<script setup lang="ts">
import { ref, provide } from "vue"
import searchBar from "./components/searchBar.vue"
import Dialog from "./components/dialog.vue"
import List from "./components/list.vue"

// 窗口的显示状态
const showDialog = ref(false)
const setIsShow = (isShow: boolean) => {
    showDialog.value = isShow
}
provide("dialog-visible", {
    showDialog,
    setIsShow
})
// 搜索组件的数据
const searcKeyWord = ref('')
const setSearchKeyWord = (key: string) => {
    searcKeyWord.value = key
}
provide("search-key", {
    searcKeyWord,
    setSearchKeyWord
})
</script>

<style scoped lang="scss">
.home {
    width: 100%;
    height: 100%;
}
</style>
