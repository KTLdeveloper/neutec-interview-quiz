<script setup>
    import Content from '@/components/Content.vue'
    import Header from '@/components/Header.vue'
    import Sidebar from '@/components/Sidebar.vue'
    import { ref } from 'vue'

    const showMenu = ref(false)
    const handleToggleMenu = () => {
        showMenu.value = !showMenu.value
    }
</script>

<template>
    <Header @toggle-menu="handleToggleMenu" />
    <Content />
    <Sidebar v-model="showMenu" />
</template>

<style lang="scss">
    html,
    body,
    #app {
        width: 100%;
        height: 100%;
    }
    body {
        margin: 0;
    }
    #app {
        position: relative;
        display: flex;
        flex-direction: column;
    }
</style>
