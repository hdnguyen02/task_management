<script setup>
import { ref } from 'vue'
import { auth } from '../firebase'
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
const newPassword = ref(null)
const confirmPassword = ref(null)
const curentPassword = ref(null)
const messageError = ref(null)

function handleShow() {
    document.getElementById("popup").style.display = "block"
}

function handleHidden() {
    document.getElementById("popup").style.display = "none"
}

async function handleChangePassword() {

    const user = auth.currentUser
    const credential = EmailAuthProvider.credential(
        user.email,
        curentPassword.value
    )
    try {
        await reauthenticateWithCredential(user, credential)
    }
    catch (error) {
        messageError.value = error.message
        document.getElementById('alertRed').style.display = 'block'
        setTimeout(() => {
            document.getElementById('alertRed').style.display = 'none'
        }, 2000)
        return
    }

    if (newPassword.value == confirmPassword.value) {
        await updatePassword(user, newPassword.value)
        document.getElementById('alertGreen').style.display = 'block'
        setTimeout(() => {
            document.getElementById('alertGreen').style.display = 'none'
        }, 2000)
        document.getElementById('popup').style.display = 'none'
    }
    else {
        messageError.value = "newpassword and newpassword do not match"
        document.getElementById('alertRed').style.display = 'block'
        setTimeout(() => {
            document.getElementById('alertRed').style.display = 'none'
        }, 2000)
    }
}

</script>
<template>
    <div id="alertGreen" class="hidden fixed bottom-8 right-8 p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
        role="alert">
        <span class="font-medium">Success!</span> changed password successfully
    </div>

    <div id="alertRed" class="hidden fixed bottom-8 right-8 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
        role="alert">
        <span class="font-medium">Error!</span> {{ messageError }}
    </div>

    <a @click="handleShow" class="underline text-primary cursor-pointer">Change password</a>
    <div id="popup" class="fixed top-0 left-0 w-full h-full hidden">
        <form @submit.prevent="handleChangePassword" class="absolute top-1/2 left-1/2 bg-white px-8 py-10 rounded-lg"
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

            <div class="mb-6">
                <label class="block mb-2 text-sm font-medium">
                    Curent Password
                </label>
                <input v-model="curentPassword" type="text" minlength="6"
                    class="w-80 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    required />
            </div>

            <div class="mb-6">
                <label class="block mb-2 text-sm font-medium">
                    New password
                </label>
                <input v-model="newPassword" type="text" minlength="6"
                    class="w-80 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    required />
            </div>
            <div class="mb-6">
                <label for="email" class="block mb-2 text-sm font-medium">
                    Confirm new password
                </label>
                <input v-model="confirmPassword" type="text" minlength="6"
                    class="w-80 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    required />
            </div>


            <div class="flex md:flex-row flex-col gap-4 justify-end items-center">
                <button type="submit"
                    class="py-2 px-3 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300">
                    Change password
                </button>
            </div>
        </form>
    </div>
</template>