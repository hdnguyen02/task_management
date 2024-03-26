<script setup>  
import { ref } from 'vue'
import {auth} from '../firebase'
import {signInWithEmailAndPassword, setPersistence, browserLocalPersistence, 
    browserSessionPersistence, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import router from '../router'
    let email = ref(null)
    let password = ref(null)
    let isRemember = ref(false)
    let messageError = ref(null)

    async function handleSignInGoogle() {
        try {
            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider)
            router.push('/')
        }
        catch(error) {} 
    }

    async function handleSignInEmailPassword()  { 
    
        const persistenceType  = isRemember.value === true ? browserLocalPersistence : browserSessionPersistence
        try {
            await setPersistence(auth, persistenceType)
            await signInWithEmailAndPassword(auth, email.value, password.value)
            router.push('/')
        }
        catch(error) {
            messageError.value = error.message
        }
    }
    
    
</script>

<template>
    <section class="">
        <div class="flex items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div
                class="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
                <div style="box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;" class="bg-white rounded-lg space-y-4 px-6 py-12">
                    <div class="flex flex-col items-center">
                        <div class="flex flex-col w-full">
                            <button @click="handleSignInGoogle" class="flex items-center justify-center gap-x-1 text-blue-700 font-medium  py-2 px-2 border border-blue-500 rounded-lg">
                                <img class="w-6 h-6" src="../assets/icon-google.png">
                                <span>Sign in with google</span> 
                            </button>
                        </div>

                    </div>
                    <p 
                        class="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Sign in to your account
                    </p>
                    <form @submit.prevent="handleSignInEmailPassword" class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your
                                email</label>
                            <input v-model="email" type="email" id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="name@gmail.com" required>
                        </div>
                        <div>
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input v-model="password" type="password" id="password" minlength="6"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                required>
                        </div>
                        <div>
                            <span  class="text-red-500 text-sm">{{messageError}}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input v-model="isRemember" id="remember" type="checkbox"
                                        class="w-5 h-5 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        >
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="remember" class="text-gray-500">Remember me</label>
                                </div>
                            </div>
                            <a href="#"
                                class="text-sm font-medium text-primary-600 hover:underline">Forgot
                                password?</a>
                        </div>
                        <button type="submit"
                            class="w-full text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign
                            in</button>
                        <p class="text-sm text-gray-500 text-center">
                                Don’t have an account yet? 
                                <router-link to="/sign-up" class="font-medium text-primary hover:underline">Sign up</router-link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>../store