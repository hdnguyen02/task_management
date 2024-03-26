<script setup>
import mainStore from '../store'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { doc, updateDoc } from "firebase/firestore"
import { db } from '../firebase'


const route = useRoute()
const useStore = mainStore()

let index = route.params.index
const board = ref(useStore.getBoards[index])
let isNewItem = ref(false)


let inputCreateTask = ref({
    name: null,
    owners: null,
    status: "notStarted",
    dueDate: new Date().toISOString().slice(0, 10).replace(/\//g, "-"),
    priority: 1
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

async function handleBlurEditName(indexTask) {
    const span = document.getElementById(`span-name-task-${indexTask}`)
    const input = document.getElementById(`input-name-task-${indexTask}`)
    let valueOld = span.textContent
    let valueInput = input.value
    input.style.display = "none"
    span.style.display = "block"
    if (valueInput.trim() == "" || valueOld == valueInput) return // rỗng hoặc trùng với giá trị trước đó. 
    const board = useStore.getBoards[index]
    board.tasks[indexTask].name = valueInput
    const boardRef = doc(db, "boards", board.id)
    await updateDoc(boardRef, board)
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
    const boardRef = doc(db, "boards", updateBoard.id)
    await updateDoc(boardRef, updateBoard)
}

function handleEditStatus(index) {
    const dropdown = document.getElementById(`div-dropdown-status-task-${index}`)
    if (dropdown.style.display == "block") { 
        dropdown.style.display = "none" 
    }
    else { 
        dropdown.style.display = "block"
    }
}

async function handleChooseStatus(indexTask, item) {

    const board = useStore.getBoards[index]
    const statusOld = board.tasks[indexTask].status 
    const dropdown = document.getElementById(`div-dropdown-status-task-${indexTask}`)
    dropdown.style.display = "none"
    if (statusOld == item) return
    board.tasks[indexTask].status = item
    const boardRef = doc(db, "boards", board.id)
    await updateDoc(boardRef, board)
}

async function handleChoosePriority(indexTask, priority) {   
    const board = useStore.getBoards[index]

    const priorityOld = board.tasks[indexTask].priority 
    if (priority == priorityOld){
        console.log("Giống priority")
        return
    }  
    board.tasks[indexTask].priority = priority
    const boardRef = doc(db, "boards", board.id)
    await updateDoc(boardRef, board)
}

async function handleBlurEditDate(indexTask, event) {
    let dueDate = event.target.value
    const board = useStore.getBoards[index]
    const dueDateOld = board.tasks[indexTask].dueDate 
    if (dueDate == dueDateOld) {
        console.log("Trùng duedate")
        return
    }
    board.tasks[indexTask].dueDate = dueDate
    const boardRef = doc(db, "boards", board.id)
    await updateDoc(boardRef, board)
}

let infoStatus = {
    notStarted: {
        content: "Not started",
        color: "#E2445B"
    },
    inProgress: {
        content: "In progress",
        color: "#4255FF"
    },
    done: {
        content: "Done",
        color: "#00C874"
    }
}

</script>

<template>




    <div class="pb-24">
        <div class="flex justify-between">
            <div class="flex items-center gap-x-3">
                <h3 class="font-medium text-3xl">{{ board.name }}</h3>
                <i class="fa-regular fa-star text-xl pt-1"></i>
            </div>
            <div>
                <button class=""><i class="fa-solid fa-ellipsis text-lg"></i></button>
            </div>
        </div>
        <div class="mt-8 flex flex-col lg:flex-row lg:justify-between gap-8">
            <div class="flex gap-x-8">
                <button @click="handleCreateTask"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-6 rounded inline-flex gap-x-3 items-center">
                    <i style="font-weight: 100;" class="fa-solid fa-plus"></i>
                </button>

                <input type="search"
                    class="block w-full lg:w-56 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search tasks" />
            </div>

            <div class="flex gap-x-2 justify-between lg:gap-x-8">
                <div class="flex items-center gap-x-2 cursor-pointer">
                    <i class="fa-solid fa-users-line pt-1"></i>
                    <span class="">Person</span>
                </div>

                <div class="flex items-center gap-x-2 cursor-pointer">
                    <i class="fa-solid fa-filter"></i>
                    <span class="">Filter</span>
                </div>
                <div class="flex items-center gap-x-2 cursor-pointer">
                    <i class="fa-solid fa-arrow-up-a-z"></i>
                    <span class="">Sort</span>
                </div>

                <div class="flex items-center gap-x-2 cursor-pointer">
                    <i class="fa-solid fa-share-nodes"></i>
                    <span class="">Share</span>
                </div>

                <div class="flex items-center gap-x-2 cursor-pointer">
                    <i class="fa-solid fa-gear"></i>
                    <span class="">Setting</span>
                </div>
            </div>
        </div>
        <hr class="border-gray-200 my-12">
        <div class="">
            <div class="">
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
                        <tr v-for="(task, index) in useStore.getBoards[index].tasks" :key="index"
                            class="bg-white border-b border-gray-200">
                            <th @click="handleEditName(index)" scope="row"
                                class="px-6 h-16 font-medium text-gray-900 whitespace-nowrap">
                                <span :id="`span-name-task-${index}`">{{ task.name }}</span>
                                <input type="text" @blur="handleBlurEditName(index)" :id="`input-name-task-${index}`"
                                    class="hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg h-8"
                                    required />
                            </th>
                            <td class="px-6 h-16">
                                {{ task.owners == null ? "None" : "hdnguyen" }}
                            </td>
                            <td class="px-6 h-16 flex gap-x-2 items-center">
                                <i @click="handleChoosePriority(index, item)" v-for="item in 5" :class="{ 'star-yellow': item <= task.priority }" class="fa-solid fa-star cursor-pointer"></i>
                            </td>
                            <td class="px-6 h-16 cursor-pointer">
                                <input @blur="handleBlurEditDate(index, $event)" :value="task.dueDate" type="date" class="border-0 p-0">
                            </td>
                            <td class="relative px-6 h-16 cursor-pointer">
                                <button @click="handleEditStatus(index)" :style="`background-color: ${infoStatus[task.status].color};`"
                                    class="text-white text-sm h-8 w-24 font-medium">
                                    {{ infoStatus[task.status].content }}
                                </button>
                            
                                <div :id="`div-dropdown-status-task-${index}`" class="bg-[#465463] hidden absolute top-16 z-10 divide-y divide-gray-100 rounded-lg w-44">
                                    <ul class="flex flex-col items-center gap-y-3 py-6 text-sm text-gray-700">
                                        <li class="mb-2" v-for="(value, key) in infoStatus" :key="value.content">
                                            <button @click="handleChooseStatus(index, key)" :style="`background-color: ${value.color};`" class="text-white text-sm h-8 w-24">
                                                {{ value.content }}
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        </tr>

                        <!-- New item -->
                        <tr v-show="isNewItem">
                            <th scope="row"
                                class="px-6 h-16 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <input v-model="inputCreateTask.name" @blur="handleBlurCreateTask" type="text"
                                    id="create-name-task"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-300 block h-8"
                                    required />
                            </th>

                            <!-- owner -->
                            <td class="px-6 h-16">
                                None
                            </td>
                            <td class="px-6 h-16 flex gap-x-2 items-center">
                                <i v-for="item in 5" :class="{ 'star-yellow': item <=inputCreateTask.priority }" class="fa-solid fa-star cursor-pointer"></i>
                            </td>
                            <td class="px-6 h-16">
                                <input :value="inputCreateTask.dueDate" type="date" class="border-0 p-0">
                                
                            </td>
                            <td class="px-6 h-16">
                                <button :style="`background-color: ${infoStatus.notStarted.color};`"
                                    class="text-white text-sm h-8 w-24 font-medium">
                                    {{ infoStatus.notStarted.content }}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
.star-yellow {
  color: #F5CB2A;
}


</style>