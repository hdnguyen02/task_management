<script setup>
import mainStore from '../store'
import {onBeforeMount } from 'vue'
const useStore = mainStore()

onBeforeMount(() => {
    useStore.fetchBoards()
})
</script>

<template>  
    <div class="flex flex-wrap justify-center">
        <div v-for="(board, idBoard) in useStore.getBoards"  class="p-4 w-96">
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
                    <p class="leading-relaxed text-sm text  -gray-100 h-14">
                        {{board.description}}
                    </p>
                    <router-link :to="`/boards/${idBoard}`" class="mt-4 hover:text-blue-600 inline-flex items-center">Detail
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </router-link>
                    
  
                </div>
            </div>
        </div>


        <div v-if="Object.keys(useStore.getBoards).length == 0 && useStore.getIsDoneFetchBoards == true" class="mt-12 flex flex-col items-center">
                    <div class="w-40">
                        <img class="w-full h-full" src="https://cdni.iconscout.com/illustration/premium/thumb/todo-list-5523307-4609476.png?f=webp">
                    </div>
                    <span class="text-primary">
                        You have not created any boards yet
                    </span>
                </div>
    </div>
    

</template>