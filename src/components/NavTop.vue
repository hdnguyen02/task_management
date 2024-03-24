<script setup>  
    import mainStore from '../store'
    import { auth } from "../firebase"
    import { signOut } from 'firebase/auth'
import { RouterLink } from 'vue-router';
    const useStore = mainStore()


    async function handleSignOut() { 
        await signOut(auth)
    }   
</script>


<template>
    <nav class="bg-ctnarbar fixed top-0 left-0 right-0">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                <span class="text-primary self-center text-3xl font-bold whitespace-nowrap">Todo</span>
            </router-link>
            <div class="flex items-center gap-x-5 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button v-show="useStore.isLogin == true" data-modal-target="m-create-task" data-modal-toggle="m-create-task" class="cursor-pointer h-8 w-8 ml-3 rounded-full bg-primary flex items-center justify-center">
                    <i class="fa-solid fa-plus text-2xl text-white"></i>
                </button>
                <button v-show="useStore.getCredential" type="button" class="flex text-sm bg-gray-800 rounded-full md:me-0" id="user-menu-button"
                    aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                    <span class="sr-only">Open user menu</span>
                    <img class="w-8 h-8 rounded-full"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaGTSgboR8sULrjYV4Wpx2d2sqn2RzOF0z8CQXr64C8g&s"
                        alt="user photo">
                </button>

                <!-- Dropdown menu -->
                <div v-show="useStore.getCredential" class="bg-gray-300 font-medium z-50 hidden top-0 my-4 text-base rounded-lg"
                    id="user-dropdown">
                    <div class="px-4 py-3">
                        <span class="block text-sm">{{useStore.getCredential?.displayName}}</span>
                        <span class="block text-xs truncate">{{useStore.getCredential?.email}}</span>
                    <hr class="mt-3">
                    </div>
                    <ul class="py-1" aria-labelledby="user-menu-button">
                        <li>
                            <a href="#" class="block px-4 py-2 text-sm">Setting</a>
                        </li>   
                        <li @click="handleSignOut">
                            <a href="#" class="block px-4 py-2 text-sm">Sign out</a>
                        </li>
                </ul>
                </div>
                <div v-show="!useStore.getCredential" class="flex gap-x-3">
                    <router-link to="/sign-in" class="bg-transparent hover:bg-blue-500 text-blue-700 font-medium hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded">
                        Sign up
                    </router-link>  
                    <router-link to="/sign-in" class="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-4 rounded">
                        Sign in
                    </router-link>
                    
                </div>
                <button data-collapse-toggle="navbar-user" type="button"
                    class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none"
                    aria-controls="navbar-user" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 17 14">    
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
            </div>
            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                <ul
                    class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                    <li>
                        <router-link to="/" class="block py-2 px-3 bg-blue-700 rounded md:bg-transparent md:p-0">Home</router-link>
                    </li>
                    <li v-if="useStore.getCredential">
                        <router-link to="/boards"
                            class="block py-2 px-3 rounded md:bg-transparent md:p-0"
                            aria-current="page">Boards</router-link>
                    </li>
                    <li>
                        <a href="#"
                            class="block py-2 px-3 rounded md:bg-transparent md:p-0"
                            aria-current="page">Contact</a>
                    </li>

                    
                </ul>
            </div>
        </div>
    </nav>
</template>../store