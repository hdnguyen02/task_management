<script setup>
import {ref} from 'vue'
import { sendPasswordResetEmail } from "firebase/auth"
import {auth} from '../firebase'
const email = ref(null)
const isShowMessage = ref(false)

async function handleResetPassword() {
    try {
        await sendPasswordResetEmail(auth, email.value)
        isShowMessage.value = true 

    }
    catch(error) {
        console.log(error)
    }

}

</script>



<template>
    <section>
        <div class="flex flex-col justify-center items-center gap-8">
            <div class="max-w-md">
                <h3 class="text-center font-medium">
                    Reset your password
                </h3>
                <p class="mt-2 font-light text-center">
                    Enter your email and we'll send you a link to reset your password.
                </p>
            </div>
            <form @submit.prevent="handleResetPassword" class="max-w-md w-full">
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email
                        address</label>
                    <input v-model="email" type="email" id="email" required
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <p  v-if="isShowMessage" class="text-sm mt-3 font-light text-primary">Password recovery link has been sent to your email</p>
                <div>
                    <button class="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                        Reset your password
                    </button>
                </div>
            </form>

        </div>
    </section>
</template>