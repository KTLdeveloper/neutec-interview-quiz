<script setup>
    import SidebarMenu from '@/components/Icons/SidebarMenu.vue'
    import { defineComponent, defineEmits } from 'vue'
    defineComponent({
        name: 'PageHeader',
    })
    defineEmits(['toggle-menu'])
</script>

<template>
    <div class="header flex items-center justify-end h-10 p-1">
        <div
            class="w-10 h-full flex items-center justify-center bg-gray-300 border border-black rounded"
            @click="$emit('toggle-menu')"
        >
            <SidebarMenu class="w-5 h-5" />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
