<template>
  <div class="home">
    <!-- Show the greeting -->
    <h1>Hello, {{ user.name || 'there' }} 👋</h1>

    <!-- If no name is set, ask for it -->
    <div v-if="!user.name" class="namePrompt">
      <p>What’s your name?</p>
      <input v-model="nameInput" placeholder="Enter your name" />
      <button @click="saveName">Save</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' // ✅ add this
import { useUserStore } from '../stores/userStore'

const router = useRouter()             // ✅ create router instance
const user = useUserStore()
const nameInput = ref('')

function saveName() {
  if (nameInput.value.trim()) {
    user.setName(nameInput.value.trim())
    router.push('/')                 // ✅ manually redirect to Home
  }
}
</script>


<style scoped>
.home {
  padding: 2rem;
  font-family: sans-serif;
}
.namePrompt {
  margin-top: 1rem;
  color:black;
}
input {
  padding: 0.5rem;
  margin-right: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  padding: 0.5rem 1rem;
  background-color: #468ff2;
  color: white;
  border: none;
  border-radius: 5px;
}
</style>
