<script setup>
    import TreeView from '@/components/TreeView.vue'
    import data from '@/mock/data.json'
    import { onClickOutside } from '@vueuse/core'
    import { defineComponent, defineModel, onMounted, provide, ref } from 'vue'

    defineComponent({
        name: 'PageSidebar',
    })

    // this is about sidebar's content
    const activityNodes = ref(new Map())
    provide('getActivityNodes', () => activityNodes.value)
    const handleUpdateActivityNodes = ({ depth, symbol }) => {
        const nodeValue = activityNodes.value.get(depth)
        if (nodeValue === undefined) {
            activityNodes.value.set(depth, symbol)
        } else {
            const originSize = activityNodes.value.size
            for (let i = depth; i < originSize; i++) {
                activityNodes.value.delete(i)
            }
            if (nodeValue !== symbol) {
                activityNodes.value.set(depth, symbol)
            }
        }
        window.localStorage.setItem('nodeHistory', JSON.stringify(Object.fromEntries(activityNodes.value)))
    }

    onMounted(() => {
        const history = window.localStorage.getItem('nodeHistory')
        if (history !== null) {
            activityNodes.value = new Map(Object.entries(JSON.parse(history)))
        }
    })

    // this is about show and hide menu
    const showMenu = defineModel({ default: false })
    const target = ref(null)
    onClickOutside(target, () => {
        showMenu.value = !showMenu.value
        // if user manual click outside, we need to clear all activityNodes
        if (showMenu.value) {
            activityNodes.value.clear()
            window.localStorage.clear()
        }
    })
</script>

<template>
    <transition name="slide">
        <div
            ref="target"
            v-if="showMenu"
            class="sidebar absolute top-0 right-0 z-20 w-1/2 h-full bg-black bg-opacity-90 overflow-y-auto"
        >
            <TreeView
                v-for="item in data"
                :text="item.text"
                :symbol="item.key"
                :children="item.children"
                :key="item.key"
                :depth="0"
                @update-activity-nodes="handleUpdateActivityNodes"
            />
        </div>
    </transition>
</template>

<style lang="scss" scoped>
    .slide-enter-active,
    .slide-leave-active {
        transition: transform 300ms;
    }
    .slide-enter-from,
    .slide-leave-to {
        transform: translate(100%, 0);
    }
</style>
