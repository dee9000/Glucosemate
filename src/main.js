import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './router'

// Font Awesome setup
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import all required solid icons
import {
  faHeartbeat,
  faBell,
  faChevronRight,
  faTint,
  faUtensils,
  faChartBar,
  faFileAlt,
  faHome,
  faCalendarAlt,
  faChartLine,
  faPills,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons'

// Add all to the library
library.add(
  faHeartbeat,
  faBell,
  faChevronRight,
  faTint,
  faUtensils,
  faChartBar,
  faFileAlt,
  faHome,
  faCalendarAlt,
  faChartLine,
  faPills,
  faUserCircle
)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)
app.mount('#app')
