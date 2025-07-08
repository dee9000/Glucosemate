<template>
  <div class="home-container">
    <!-- Greeting -->
    <header class="greeting">
      <h1>Hello, {{ displayName }}!</h1>

      <!-- 👇 Name Prompt -->
      <div v-if="!user.name" class="namePrompt">
        <p>What’s your name?</p>
        <input v-model="nameInput" placeholder="Enter your name" />
        <button @click="saveName">Save</button>
      </div>
    </header>

    <!-- Glucose Card -->
    <section class="pill-card card-green">
      <div class="card-left">
        <p class="label">TODAY</p>
        <h2 class="value">
          {{ user.glucoseToday ?? '--' }}
          <span class="unit">mmol/L</span>
        </h2>
      </div>
      <div class="card-right icon-box green-bg">
        <font-awesome-icon icon="heartbeat" />
      </div>
    </section>

    <!-- Medication Reminder -->
    <section class="pill-card card-pink">
      <div class="card-left">
        <font-awesome-icon icon="bell" class="bell-icon" />
        <div>
          <p class="med-label">Metformin</p>
          <p class="med-time">{{ user.medicationTime || 'Not set' }}</p>
        </div>
      </div>
      <div class="card-right">
        <font-awesome-icon icon="chevron-right" />
      </div>
    </section>

    <!-- Quick Action Grid -->
    <div class="grid">
      <!-- Blood Sugar Card -->
      <div class="action-card blue" @click="toggleGlucoseForm">
        <font-awesome-icon icon="tint" />
        <p>Log<br /><span>Blood Sugar</span></p>
      </div>

      <!-- Add Meal -->
        <div class="action-card yellow" @click="toggleMealForm">
        <font-awesome-icon icon="utensils" />
        <p>Add<br /><span>Meal/Note</span></p>
        </div>


      <!-- View Trends -->
      <div class="action-card action-card--green">
        <font-awesome-icon icon="chart-bar" />
        <p>View<br /><span>Trends</span></p>
      </div>

      <!-- Export Report -->
      <div class="action-card red">
        <font-awesome-icon icon="file-alt" />
        <p>Export<br /><span>Report</span></p>
      </div>
    </div>

    <div v-if="showMealForm" class="meal-form">
  <textarea
    v-model="mealInput"
    rows="3"
    placeholder="What did you eat or want to note?"
  ></textarea>
  <button @click="saveMealNote">Save</button>
</div>

<!-- Optional: Show last saved note -->
<div v-if="user.mealNote" class="meal-note-display">
  <p><strong>Last note:</strong> {{ user.mealNote }}</p>
</div>

    

    <!-- Glucose Input Form (outside grid for layout flow) -->
    <div v-if="showGlucoseForm" class="glucose-form">
      <input
        v-model="glucoseInput"
        type="number"
        step="0.1"
        min="1"
        max="25"
        placeholder="e.g. 5.7"
      />
      <button @click="saveGlucose">Save</button>
    </div>

    <!-- Reset Button -->
    <div class="reset-container">
      <button @click="resetData">Reset</button>
    </div>

    <!-- Bottom Nav -->
    <nav class="bottom-nav">
      <font-awesome-icon icon="home" />
      <font-awesome-icon icon="calendar-alt" />
      <font-awesome-icon icon="chart-line" />
      <font-awesome-icon icon="bell" />
    </nav>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/userStore'
import { ref, computed } from 'vue'

const user = useUserStore()
const displayName = computed(() => user.name || 'Guest')

const nameInput = ref(user.name)
const showGlucoseForm = ref(false)
const glucoseInput = ref(user.glucoseToday ?? '')

// Save user's name
function saveName() {
  if (nameInput.value.trim() !== '') {
    user.setName(nameInput.value.trim())
  }
}

// Reset all data
function resetData() {
  user.resetData()
  nameInput.value = ''
}

// Toggle and save glucose
function toggleGlucoseForm() {
  showGlucoseForm.value = !showGlucoseForm.value
}

function saveGlucose() {
  const value = parseFloat(glucoseInput.value)
  if (!isNaN(value)) {
    user.updateGlucose(value)
    showGlucoseForm.value = false
  }
}

const showMealForm = ref(false)
const mealInput = ref(user.mealNote ?? '')

function toggleMealForm() {
  showMealForm.value = !showMealForm.value
}

function saveMealNote() {
  if (mealInput.value.trim()) {
    user.updateMealNote(mealInput.value.trim())
    showMealForm.value = false
  }
}

</script>



<style scoped>
.home-container {
  padding: 1.5rem;
  font-family: 'system-ui', sans-serif;
  background: #fafafa;
  min-height: 100vh;
}

.greeting h1 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
}

/* Shared pill card style */
.pill-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem;
  border-radius: 20px;
  margin-bottom: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  background-color: white;
}

/* Specific colors */
.card-green {
  background-color: #eaf8f3;
}

.card-pink {
  background-color: #fdeced;
}

.label, .med-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #666;
}

.value {
  font-size: 2rem;
  font-weight: 700;
}

.unit {
  font-size: 0.9rem;
}

.card-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card-right {
  font-size: 1.5rem;
  color: #666;
}

.icon-box {
  background: #d0f0e7;
  padding: 0.6rem;
  border-radius: 12px;
}

.bell-icon {
  font-size: 1.5rem;
  color: #f57c7c;
}

.med-time {
  font-size: 0.8rem;
  color: #888;
}

/* Action button grid */
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
}

.action-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
  color: #333;
  text-align: center;
}

.action-card span {
  font-weight: normal;
  font-size: 0.8rem;
  color: #666;
}

.action-card.blue { background-color: #d4ecf7; }
.action-card.yellow { background-color: #fff5cc; }
.action-card.green { background-color: #e0f7ea; }
.action-card.red { background-color: #ffe0e0; }

.action-card font-awesome-icon {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

/* CSS */
.action-card--green {
  background-color: #e0f7ea;
}


/* Bottom navigation */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-around;
  padding: 0.7rem 0;
  font-size: 1.4rem;
  color: #555;
}

.reset-container {
  margin: 2rem 0 4rem;
  text-align: center;
}

.reset-container button {
  padding: 0.6rem 1.2rem;
  border-radius: 12px;
  border: none;
  background-color: #e0e0e0;
  color: #333;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.reset-container button:hover {
  background-color: #ccc;
}

.namePrompt {
  margin-top: 1rem;
  background: #fff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.namePrompt input {
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  font-size: 1rem;
}

.namePrompt button {
  margin-top: 0.7rem;
  padding: 0.5rem 1rem;
  background-color: #b2dfdb;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.namePrompt button:hover {
  background-color: #80cbc4;
}

.meal-form {
  margin-top: 1.5rem;
  background: #fff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.meal-form textarea {
  width: 100%;
  padding: 0.6rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: none;
}

.meal-form button {
  margin-top: 0.7rem;
  padding: 0.5rem 1rem;
  background-color: #fff2a8;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.meal-form button:hover {
  background-color: #ffe165;
}

.meal-note-display {
  margin-top: 1rem;
  background: #fffde7;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  font-size: 0.95rem;
  color: #444;
}



</style>

