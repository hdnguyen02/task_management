<script setup>
import mainStore from '../store'
import { useRoute } from 'vue-router'
import {ref} from 'vue'
import { doc, updateDoc } from "firebase/firestore"
import {db} from '../firebase'

const route = useRoute()
const useStore = mainStore()

let index = route.params.index
const board = ref(useStore.getBoards[index])
let isNewItem = ref(false)

let inputCreateTask = ref({
    name:null, 
    owners:null,
    status: "Not started", 
    dueDate: "07/07/2002", 
    priority: 5
})


function handleEditName(index) {
    const span = document.getElementById(`span-name-task-${index}`)
    const input = document.getElementById(`input-name-task-${index}`)
    setTimeout(() => {
        input.value = span.textContent
        input.focus()
    })
    input.style.display = "block"
    span.style.display = "none"
}

function handleBlurEditName(index) {
    const span = document.getElementById(`span-name-task-${index}`)
    const input = document.getElementById(`input-name-task-${index}`)
    span.textContent = input.value 
    input.style.display = "none"
    span.style.display = "block"
}

function handleCreateTask() {
    isNewItem.value = true
    setTimeout(() => {
        document.getElementById("create-name-task").focus()
    })

}

async function handleBlurCreateTask() {

    isNewItem.value = false
    if (inputCreateTask.value.name == null || inputCreateTask.value.name.trim() == "") return
    const task = { 
        name: inputCreateTask.value.name, 
        owners: inputCreateTask.value.owners, 
        priority: inputCreateTask.value.priority,
        dueDate: inputCreateTask.value.dueDate, 
        status: inputCreateTask.value.status
    }
    inputCreateTask.value.name = null
    const updateBoard = JSON.parse(JSON.stringify(useStore.getBoards[index]));
    updateBoard.tasks.push(task)
    const boardRef = doc(db, "boards",updateBoard.id)
    await updateDoc(boardRef, updateBoard)
}

// các trạng thái: none ( chưa xác định được )

let status = [{name: "Not started",color: "#5A5A5A"}, {name: "In progress",color: "#28456C"}, {name: "Done",color: "#2B593F"}]



</script>

<template> 
    <div class="pb-24">
        <div class="flex justify-between">
            <div class="flex items-center gap-x-3">
                <h3 class="font-medium text-3xl">{{board.name}}</h3>
                <i class="fa-regular fa-star text-xl pt-1"></i>
            </div>
            <div>
                <button class=""><i class="fa-solid fa-ellipsis text-lg opacity-60"></i></button>
            </div>
        </div>
        <div class="mt-8 flex justify-between gap-x-8 items-center">
            <div class="flex gap-x-8">
                <button @click="handleCreateTask"class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-4 rounded inline-flex gap-x-3 items-center">
                    <i style="font-weight: 100;" class="fa-solid fa-plus"></i>
                    <span>New item</span>
                </button>
                
                <input type="search" class="block w-56 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search tasks" />
            </div>

            <div class="flex gap-x-8">

            
            <div class="flex items-center gap-x-2 cursor-pointer">
                <i class="fa-solid fa-users-line pt-1 opacity-60"></i>
                <span class="">Person</span>
            </div>

            <div class="flex items-center gap-x-2 cursor-pointer">
                <i class="fa-solid fa-filter opacity-60"></i>
                <span class="">Filter</span>
            </div>
            <div class="flex items-center gap-x-2 cursor-pointer">
                <i class="fa-solid fa-arrow-up-a-z opacity-60"></i>
                <span class="">Sort</span>
            </div>

            <div class="flex items-center gap-x-2 cursor-pointer">
                <i class="fa-solid fa-share-nodes opacity-60"></i>
                <span class="">Share</span>
            </div>

            <div class="flex items-center gap-x-2 cursor-pointer">
                <i class="fa-solid fa-gear opacity-60"></i>
                <span class="">Setting</span>
            </div>
        </div>
        </div>

        <!-- Nội dung -->
        <div class="mt-12">
            

<div class="overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 table-fixed">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Name tasks
                </th>
                <th scope="col" class="px-6 py-3">
                    Owner
                </th>
                <th scope="col" class="px-6 py-3">
                    Priority
                </th>
                <th scope="col" class="px-6 py-3">
                    Due date
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(task, index) in useStore.getBoards[index].tasks" :key="index" class="bg-white border-b border-gray-200">
                <th @click="handleEditName(index)" scope="row" class="px-6 h-16 font-medium text-gray-900 whitespace-nowrap">
                    <span :id="`span-name-task-${index}`" >{{task.name}}</span> 
                    <input type="text" @blur="handleBlurEditName(index)" :id="`input-name-task-${index}`" class="hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg h-8" required />
                </th>
                <td class="px-6 h-16">
                    {{task.owners}}
                </td>
                <td class="px-6 h-16 flex gap-x-1 items-center">
                    <i v-for="item in task.priority" class="fa-regular fa-star"></i>
                </td>
                <td class="px-6 h-16">
                    {{task.dueDate}}
                </td>
                <td class="px-6 h-16">
                    {{task.status}}
                </td>
            </tr>


            <!-- New item -->
            <tr v-show="isNewItem"  class="border-b">
                <th scope="row" class="px-6 h-16 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <input v-model="inputCreateTask.name" @blur="handleBlurCreateTask" type="text" id="create-name-task" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-300 block h-6" required />
                </th>

                <!-- owner -->
                <td class="px-6 h-16">
                  
                </td>
                <td class="px-6 h-16">
                    5

                </td>
                <td class="px-6 h-16">
                    07/07/2002
                </td>
                <td class="px-6 h-16">
                    <button :style="`background-color: ${status[0].color};`" class="p-2 text-white rounded-lg text-sm">
                        {{status[0].name}}
                    </button>
                </td>
            </tr>
           
        </tbody>
    </table>
</div>

        </div>
    </div>
</template>