<script setup>
import mainStore from '../store'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { doc, updateDoc } from "firebase/firestore"
import { db } from '../firebase'
import PopupDeleteBoard from '../components/PopupDeleteBoard.vue'

const route = useRoute()
const useStore = mainStore()
const isNewItem = ref(false)
const idBoard = route.params.idBoard


let idTaskChooseStatus = null


let inputCreateTask = ref({
    name: null,
    owners: null,
    status: "notStarted",
    dueDate: new Date().toISOString().slice(0, 10).replace(/\//g, "-"),
    priority: 1
})


function handleEditName(indexTask) {
    const span = document.getElementById(`span-name-task-${indexTask}`)
    const input = document.getElementById(`input-name-task-${indexTask}`)
    input.value = span.textContent

    setTimeout(() => {
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
    const board = useStore.getBoards[idBoard]
    board.tasks[indexTask].name = valueInput
    const boardRef = doc(db, "boards", idBoard)
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
    const updateBoard = JSON.parse(JSON.stringify(useStore.getBoards[idBoard]));
    updateBoard.tasks.push(task)
    const boardRef = doc(db, "boards", idBoard)
    await updateDoc(boardRef, updateBoard)
}

function handleEditStatus(indexTask) {
    const popup = document.getElementById("popup-choose-status")
    popup.style.display = "block"
    idTaskChooseStatus = indexTask

}

async function handleChooseStatus(key) {
    const board = useStore.getBoards[idBoard]
    const statusOld = board.tasks[idTaskChooseStatus].status
    const popup = document.getElementById("popup-choose-status")
    popup.style.display = "none"
    if (statusOld == key) return
    board.tasks[idTaskChooseStatus].status = key
    const boardRef = doc(db, "boards", idBoard)
    await updateDoc(boardRef, board)
}

async function handleChoosePriority(indexTask, priority) {
    const board = useStore.getBoards[idBoard]
    const priorityOld = board.tasks[indexTask].priority
    if (priority == priorityOld) return
    board.tasks[indexTask].priority = priority
    const boardRef = doc(db, "boards", idBoard)
    await updateDoc(boardRef, board)
}

async function handleBlurEditDate(indexTask, event) {
    let dueDate = event.target.value
    const board = useStore.getBoards[idBoard]
    const dueDateOld = board.tasks[indexTask].dueDate
    if (dueDate == dueDateOld) return
    board.tasks[indexTask].dueDate = dueDate
    const boardRef = doc(db, "boards", idBoard)
    await updateDoc(boardRef, board)
}

function handleHiddenChooseStatus() {
    const popup = document.getElementById("popup-choose-status")
    popup.style.display = "none"
}

function handleEditNameBoard() {
    const h3 = document.getElementById(`h3-name-board`)
    const input = document.getElementById(`input-edit-name-board`)

    h3.style.display = "none"
    input.style.display = "block"
    input.value = h3.textContent

    setTimeout(() => {
        input.focus()
    })

}

async function handleBlurEditNameBoard() {

    const h3 = document.getElementById(`h3-name-board`)
    const input = document.getElementById(`input-edit-name-board`)


    let valueOld = h3.textContent
    let valueInput = input.value
    input.style.display = "none"
    h3.style.display = "block"
    if (valueInput.trim() == "" || valueOld == valueInput) return // rỗng hoặc trùng với giá trị trước đó. 
    const board = useStore.getBoards[idBoard]
    board.name = valueInput.trim()
    const boardRef = doc(db, "boards", idBoard)
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
    <div v-if="useStore.getBoards[idBoard]" class="">
        <div class="flex justify-between items-center">
            <div class="flex items-center gap-x-3 cursor-pointer  h-12">
                <h3 @click="handleEditNameBoard" id="h3-name-board" class="font-medium text-xl md:text-3xl">{{
        useStore.getBoards[idBoard].name }}</h3>

                <input @blur="handleBlurEditNameBoard" id="input-edit-name-board" type="text"
                    class="hidden w-full text-xl md:text-3xl bg-gray-50 border border-gray-300 text-gray-900 font-medium rounded-lg h-12" />
            </div>
            <div class="flex gap-x-6">
                <PopupDeleteBoard :idBoard="idBoard" />
                <div class="flex items-center gap-x-2 cursor-pointer">
                    <img class="w-6 h-6" src="../assets/person.png">
                    <span class="text-sm md:text-md hover:text-primary">Person</span>
                </div>

                <div class="flex items-center gap-x-2 cursor-pointer">
                    <img class="w-5 h-5" src="../assets/filter.png">
                    <span class="text-sm md:text-md hover:text-primary">Filter</span>
                </div>
            </div>
        </div>

        <!-- handle search tasks -->
        <!-- <div class="mt-8 flex justify-start md:justify-end gap-8">
            <input type="search"
                class="block w-32 md:w-56 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search tasks" />
        </div> -->
        <hr class="border-gray-200 my-12">
        <div class="">
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 table-auto lg:table-fixed">
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
                        <tr v-for="(task, indexTask) in useStore.getBoards[idBoard].tasks" :key="idBoard"
                            class="bg-white border-b border-gray-200">
                            <th @click="handleEditName(indexTask)" scope="row"
                                class="px-6 h-16 font-medium text-gray-900 whitespace-nowrap lg:whitespace-normal">
                                <span :id="`span-name-task-${indexTask}`">{{ task.name }}</span>
                                <input type="text" @blur="handleBlurEditName(indexTask)"
                                    :id="`input-name-task-${indexTask}`"
                                    class="hidden w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg h-8" />
                            </th>
                            <td class="px-6 h-16">
                                {{ task.owners == null ? "None" : "hdnguyen" }}
                            </td>
                            <td class="px-6 h-16 flex gap-x-2 items-center">
                                <i @click="handleChoosePriority(indexTask, item)" v-for="item in 5"
                                    :class="{ 'star-yellow': item <= task.priority }"
                                    class="fa-solid fa-star cursor-pointer"></i>
                            </td>
                            <td class="px-6 h-16 cursor-pointer">
                                <input @blur="handleBlurEditDate(indexTask, $event)" :value="task.dueDate" type="date"
                                    class="border-0 p-0">
                            </td>
                            <td class="relative px-6 h-16 cursor-pointer">
                                <button @click="handleEditStatus(indexTask)"
                                    :style="`background-color: ${infoStatus[task.status].color};`"
                                    class="text-white text-sm h-8 w-24 font-medium rounded-lg">
                                    {{ infoStatus[task.status].content }}
                                </button>


                            </td>
                        </tr>

                        <!-- New item -->
                        <tr v-show="isNewItem">
                            <th scope="row"
                                class="px-6 h-16 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <input v-model="inputCreateTask.name" @blur="handleBlurCreateTask" type="text"
                                    id="create-name-task"
                                    class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-300 block h-8"
                                    required />
                            </th>

                            <!-- owner -->
                            <td class="px-6 h-16">
                                None
                            </td>
                            <td class="px-6 h-16 flex gap-x-2 items-center">
                                <i v-for="item in 5" :class="{ 'star-yellow': item <= inputCreateTask.priority }"
                                    class="fa-solid fa-star cursor-pointer"></i>
                            </td>
                            <td class="px-6 h-16">
                                <input :value="inputCreateTask.dueDate" type="date" class="border-0 p-0">

                            </td>
                            <td class="px-6 h-16">
                                <button :style="`background-color: ${infoStatus.notStarted.color};`"
                                    class="text-white text-sm h-8 w-24 font-medium rounded-lg">
                                    {{ infoStatus.notStarted.content }}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="mt-3">
                    <button @click="handleCreateTask"
                        class="text-gray-800 py-1 px-3 md:px-6 rounded inline-flex gap-x-3 items-center">
                        <img class="w-8 h-8" src="../assets/plus.png">
                    </button>
                </div>
                <div v-if="useStore.getBoards[idBoard].tasks == 0" class="mt-12 flex flex-col items-center">
                    <div class="w-40">
                        <img class="w-full h-full"
                            src="https://cdni.iconscout.com/illustration/premium/thumb/todo-list-5523307-4609476.png?f=webp">
                    </div>
                    <span class="text-primary">
                        You have not created any tasks yet
                    </span>
                </div>
            </div>
        </div>
    </div>


    <!-- Handle -->
    <div id="popup-choose-status" class="fixed top-0 left-0 w-full h-full hidden">
        <div class="absolute top-1/2 left-1/2 bg-white px-8 py-10 rounded-lg"
            style="transform: translate(-50%, -50%);box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px;">
            <button @click="handleHiddenChooseStatus" type="button"
                class="absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="deleteModal">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>

            <p class="my-6 text-center">Select task status</p>
            <div class="flex flex-col md:flex-row justify-center items-center gap-4">
                <button v-for="(value, key) in infoStatus" :key="value.content" @click="handleChooseStatus(key)"
                    :style="`background-color: ${value.color};`"
                    class="text-white font-medium text-sm py-2 w-28 rounded-lg">
                    {{ value.content }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.star-yellow {
    color: #F5CB2A;
}
</style>