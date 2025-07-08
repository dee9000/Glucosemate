// Import defineStore from Pinia
import { defineStore } from 'pinia'

// Define and export a store called "user"
export const useUserStore = defineStore('user', {
  // 🧠 Reactive state for anything user-related (name, glucose, etc.)
  state: () => ({
    name: localStorage.getItem('username') || '', // User's name (persists)
    glucoseToday: 5.7, // Glucose value for today (sample)
    medicationTime: '8 PM', // Example time Metformin was taken
      mealNote: '' // 🆕 new state
  }),

  actions: {
    // 🔄 Update the user's name and save it to localStorage
    setName(newName) {
      this.name = newName
      localStorage.setItem('username', newName)
    },

    // 🔁 Reset everything to default (used by the Reset button)
    resetData() {
      this.name = ''
      this.glucoseToday = null
      this.medicationTime = ''
      localStorage.removeItem('username') // Clear local storage too
    },
    
      updateGlucose(value) {
      this.glucoseToday = value
    },

    updateMealNote(note) {
    this.mealNote = note
  }

  }
})
