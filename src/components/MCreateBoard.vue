<script setup>
import { addDoc, collection } from "firebase/firestore"
import {db} from "../firebase"
import {ref} from "vue"
import mainStore from '../store' 

let useStore = mainStore()
let name = ref(null) 
let description = ref(null)

async function handleSubmit() {
    let board = {
        name: name.value, 
        description: description.value, 
        createAt: new Date(), 
        members: [useStore.getCredential.uid], // chứa uid thành viên  
        tasks: [] // chứa dánh sách task đó
    }
    try { 
        const docRef = await addDoc(collection(db, "boards"), board)
        console.log("Document written with ID: ", docRef.id)
    }
    catch(e) {
        console.error("Error adding document: ", e);
    }
}

</script>

<template>
    <div>
        <div id="m-create-task" tabIndex="-1" aria-hidden="true"
            class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <form @submit.prevent="handleSubmit" class="relative p-4 w-full max-w-2xl max-h-full">
                <div class="relative bg-white rounded-lg shadow">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 rounded-t">
                        <h3 class="text-xl font-semibold text-gray-900">
                            Create board
                        </h3>
                        <button type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                            data-modal-hide="m-create-task">
                            <i class="text-xl fa-solid fa-xmark"></i>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div  class="p-4 md:p-5 space-y-4">
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900">Name board<span
                                    class='text-red-500'>*</span></label>
                            <input v-model="name" type="text"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="To do project" required />
                        </div>  
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900">description board</label>
                            <input v-model="description" type="text"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        </div>
                    </div>
                    <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                        <button type="submit" data-modal-hide="m-create-task"
                            class="text-white bg-primary focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Tạo</button>
                        <button data-modal-hide="m-create-task" type="button"
                            class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Hủy</button>
                    </div>
                </div>
            </form>
        </div>

    </div>
</template>