<script setup>
import { doc, deleteDoc } from "firebase/firestore"
import { db } from '../firebase'
import router from '../router'

const props = defineProps(['idBoard'])


function handleShow() {
    document.getElementById("popup").style.display = "block"
}

function handleHidden() {
    document.getElementById("popup").style.display = "none"
}

async function handleDelete() {
    await deleteDoc(doc(db, "boards", props.idBoard))
    router.push('/boards')
}
</script>

<template>

    <button @click="handleShow" class="flex gap-x-2 items-center hover:text-primary">
        <img class="w-6 h-6" src="../assets/trash.png" alt="">
        <span class="text-sm md:text-md">Delete</span>
    </button>

    <div id="popup" class="fixed top-0 left-0 w-full h-full hidden">
        <div class="absolute top-1/2 left-1/2 bg-white px-8 py-10 rounded-lg"
            style="transform: translate(-50%, -50%);box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px;">
            <button @click="handleHidden" type="button"
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

            <p class="my-6 text-sm md:text-md text-center">Are you sure you want to delete this item?</p>
            <div class="flex md:flex-row flex-col gap-4 justify-center items-center">
                <button @click="handleHidden" type="button"
                    class="py-2 px-3 text-sm font-medium bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10">
                    No, cancel
                </button>
                <button @click="handleDelete"
                    class="py-2 px-3 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300">
                    Yes, I'm sure
                </button>
            </div>
        </div>
    </div>
</template>