<script setup>
import NavTop from './components/NavTop.vue'
import MCreateTask from './components/MCreateTask.vue'
import mainStore from './store'
const useStore = mainStore()
</script>

<template>
  <div v-show="useStore.getIsLogin == true || useStore.getIsLogin == false">
    <NavTop/>
    <div class="mt-32 mx-6 md:mx-36">
      <RouterView></RouterView>     
    </div>
    <MCreateTask/>
  </div>
  <div v-show="useStore.getIsLogin == null" style="height: 100vh; width: 100vw;" class="flex items-center justify-center font-medium">
    loading ...
  </div>
  
  
</template>

  