import {createApp} from 'vue'
import {createRouter, createWebHashHistory, RouterLink} from 'vue-router'
import ConsoleLayout from './console-layout.vue'
import {routes} from "./routes";
import './index.css'

const router = createRouter({
  history: createWebHashHistory(),
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  routes, // short for `routes: routes`
})

const app = createApp(ConsoleLayout)

app.use(router)

app.mount('#app')

