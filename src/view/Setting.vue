<script setup>
import { ref } from 'vue'
import mainStore from '../store'
import { updateProfile } from "firebase/auth"
import {auth} from '../firebase'
import PopupChangePW from '../components/PopupChangePW.vue'
import PopupDeleteAccount from '../components/PopupDeleteAccount.vue'

const useStore = mainStore()
const displayName = ref(useStore.getCredential.displayName)

 
async function handleSaveChanges() { 
    if (displayName.value == null || displayName.value.trim() == '') return 
    await updateProfile(auth.currentUser, { 
        displayName: displayName.value
    })    
    useStore.setDisplayName(displayName)
    document.getElementById('alertGreen').style.display = 'block'
    setTimeout(() => {
        document.getElementById('alertGreen').style.display = 'none'
    }, 2000)
}

</script>

<template>

    <!-- Alert Green -->
    <div id="alertGreen" class="hidden fixed bottom-8 right-8 p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
        <span class="font-medium">Notification</span> Saved changes successfully
    </div>

    <section class="max-w-screen-md mx-auto">
        <div class="border-gray-200 border-2 p-8 rounded-lg">
            <div class="mb-6">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email
                    address</label>
                <input type="email" id="email" :value="useStore.getCredential?.email" readonly
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required />
            </div>
            <div class="mb-6">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Display name
                </label>
                <input v-model="displayName" type="text" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required />
            </div>
            <div class="flex justify-between items-center">
                
                <PopupChangePW/>
                <button @click="handleSaveChanges" class="bg-primary  hover:bg-primary-700 text-white py-2 px-4 rounded-lg">
                    save changes
                </button>
            </div>
        </div>
        <div class="px-8 mt-3">
            <PopupDeleteAccount/>
        </div>
        
    </section>
</template>