<script setup>
import { deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth"
import { auth } from '../firebase'
import { ref } from 'vue'
import router from "../router"


const password = ref(null)
const messageError = ref(null)

function handleShow() {
    document.getElementById("popupDeleteAccount").style.display = "block"
}

function handleHidden() {
    document.getElementById("popupDeleteAccount").style.display = "none"
}

async function handleDelete() {
    const user = auth.currentUser
    const credential = EmailAuthProvider.credential(
        user.email,
        password.value
    )
    try {
        await reauthenticateWithCredential(user, credential)
    }
    catch (error) {
        messageError.value = error.message
        document.getElementById('alertRedPopupDeleteAccount').style.display = 'block'
        setTimeout(() => {
            document.getElementById('alertRedPopupDeleteAccount').style.display = 'none'
        }, 2000)
        return
    }
    await deleteUser(auth.currentUser)
    router.push('/')
    // tiến hành xóa đi dữ liệu người dùng ( xóa toàn bộ board của người dùng )
}
</script>

<template>


    <div id="alertGreenPopupDeleteAccount"
        class="hidden fixed bottom-8 right-8 p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
        <span class="font-medium">Success!</span> changed password successfully
    </div>

    <div id="alertRedPopupDeleteAccount"
        class="hidden fixed bottom-8 right-8 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
        <span class="font-medium">Error!</span> {{ messageError }}
    </div>

    <a @click="handleShow" class="underline text-red-500 cursor-pointer">
        Delete account
    </a>


    <div id="popupDeleteAccount" class="fixed top-0 left-0 w-full h-full hidden">
        <form @submit.prevent="handleDelete" class="absolute top-1/2 left-1/2 bg-white px-8 py-10 rounded-lg"
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

            <p class="my-4">Are you sure you want to delete account?</p>
            <div class="mb-4">
                <input v-model="password" type="password" minlength="6" placeholder="Type password"
                    class="w-80 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    required />
            </div>
            <div class="flex md:flex-row flex-col gap-4 justify-start items-center">

                <button type="submit"
                    class="py-2 px-3 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300">
                    Yes, I'm sure
                </button>
            </div>
        </form>
    </div>
</template>