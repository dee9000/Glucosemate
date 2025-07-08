<template>
  <div class="chart-wrapper">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title, Tooltip, Legend, LineElement,
  CategoryScale, LinearScale, PointElement
} from 'chart.js'

// Register chart features
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

// Props from parent
const props = defineProps({
  history: Array
})

// Transform data for chart
const chartData = {
  labels: props.history.map(entry => new Date(entry.date).toLocaleDateString()),
  datasets: [{
    label: 'Glucose (mmol/L)',
    data: props.history.map(entry => entry.value),
    borderColor: '#42a5f5',
    backgroundColor: 'rgba(66, 165, 245, 0.2)',
    fill: true,
    tension: 0.3
  }]
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true
    }
  },
  scales: {
    y: {
      min: 3,
      max: 15
    }
  }
}
</script>

<style scoped>
.chart-wrapper {
  padding: 1rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-top: 2rem;
}
</style>
