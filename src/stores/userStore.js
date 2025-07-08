// Import defineStore from Pinia
import { defineStore } from 'pinia'

// Define and export a store called "user"
export const useUserStore = defineStore('user', {
  // 🧠 Reactive state for anything user-related (name, glucose, etc.)
  state: () => ({
    name: localStorage.getItem('username') || '',     // User's name (persists)
    glucoseToday: 5.7,                                // Most recent glucose value
    medicationTime: '8 PM',                           // Medication reminder
    mealNote: '',                                     // Most recent meal/note
    glucoseHistory: []                                // 🆕 Glucose log over time
  }),

  actions: {
    // 🔄 Update the user's name and save it to localStorage
    setName(newName) {
      this.name = newName
      localStorage.setItem('username', newName)
    },

    // 🔁 Add a glucose value + update the current one
    updateGlucose(value) {
      this.glucoseToday = value

      this.glucoseHistory.push({
        value,
        date: new Date().toISOString()
      })
    },

    // 📝 Update meal or note text
    updateMealNote(note) {
      this.mealNote = note
    },

    // 🔄 Reset all data and clear localStorage
    resetData() {
      this.name = ''
      this.glucoseToday = null
      this.medicationTime = ''
      this.mealNote = ''
      this.glucoseHistory = []
      localStorage.removeItem('username')
    }
  }
})
