<script setup>
import mainStore from '../store'
import {onBeforeMount } from 'vue'
const useStore = mainStore()

onBeforeMount(() => {
    useStore.fetchBoards()
});

</script>

<template> 
    <div class="flex flex-wrap justify-center mt-10">
        <div v-for="(board, index) in useStore.getBoards" class="p-4 max-w-sm">
            <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div class="flex items-center mb-3">
                    <div
                        class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                    </div>
                    <h2 class="text-lg font-medium">{{board.name}}</h2>
                </div>
                <div class="flex flex-col justify-between flex-grow">
                    <p class="leading-relaxed text-sm text-gray-100">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla id impedit officiis qui maxime quis dolores dicta expedita voluptatem, temporibus atque aut similique odio ipsum laudantium quidem veritatis fuga fugit.
                    </p>
                    <router-link :to="`/boards/${index}`" class="mt-3 hover:text-blue-600 inline-flex items-center">Detail
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </router-link>
                </div>
            </div>
        </div>

    

    </div>

</template>