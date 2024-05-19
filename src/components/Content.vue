<script setup>
    import { defineComponent } from 'vue'
    defineComponent({
        name: 'PageContent',
    })
</script>

<template>
    <div class="content w-full h-full px-1 flex items-center justify-center bg-gray-300 overflow-hidden">
        <div class="w-full grid grid-cols-3 gap-1">
            <div
                v-for="(num, index) in 9"
                class="relative flex items-center justify-center h-[100px]"
                :key="`cell-${num}`"
            >
                <div
                    class="cell z-10 w-full h-full border-2 border-black"
                    :class="{
                        breath: index % 2 === 0 && index % 3 !== 0,
                    }"
                ></div>
                <div
                    v-if="(num < 4 || num > 6) && num % 2 !== 0"
                    class="ball w-full h-full absolute z-20 flex items-center justify-center"
                >
                    <div class="flex items-center justify-center w-[30px] h-[30px] bg-[#A5F12B] rounded-full">0</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .cell {
        background: radial-gradient(circle, rgba(113, 81, 95, 1) 81%, rgba(0, 0, 0, 1) 100%);
        &.breath {
            animation: breath 450ms ease infinite;
        }
    }
    @keyframes breath {
        from {
            opacity: 1;
        }
        to {
            opacity: 0.6;
        }
    }

    .ball {
        animation: moving 1000ms ease infinite;
    }
    @keyframes moving {
        from {
            transform: translate3d(0, 0, 0);
        }
        to {
            transform: translate3d(200%, 0, 0);
        }
    }
</style>
