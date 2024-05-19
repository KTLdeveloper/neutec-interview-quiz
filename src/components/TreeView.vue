<script setup>
    import { computed, defineComponent, defineEmits, defineProps, inject } from 'vue'

    defineComponent({
        name: 'defineComponent',
    })

    const props = defineProps({
        text: {
            type: String,
            default: '',
        },
        symbol: {
            type: String,
            default: '',
        },
        children: {
            type: Array,
            default: () => [],
        },
        depth: {
            type: Number,
            default: 0,
        },
    })

    const emit = defineEmits(['update-activity-nodes'])

    const activityNodes = inject('activityNodes')
    const handleUpdateActivityNodes = ({ depth, symbol }) => {
        emit('update-activity-nodes', { depth, symbol })
    }
    const isActive = computed(() => activityNodes.get(props.depth) === props.symbol)
    const toggleText = () => {
        handleUpdateActivityNodes({ depth: props.depth, symbol: props.symbol })
    }
</script>

<template>
    <div class="w-full text-white" :class="{ 'bg-gray-500': isActive }">
        <div class="flex items-center h-10 pl-4" :class="{ 'text-yellow-200': isActive }" @click="toggleText">
            {{ text }}
        </div>
        <div class="pl-3 ml-3" v-if="isActive && children.length > 0">
            <TreeView
                v-for="item in children"
                :text="item.text"
                :children="item.children || []"
                :symbol="item.key"
                :key="item.key"
                :depth="depth + 1"
                @update-activity-nodes="handleUpdateActivityNodes"
            />
        </div>
    </div>
</template>
