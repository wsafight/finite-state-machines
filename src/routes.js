import Toggle from './modules/toggle/index.vue'
import Readme from './modules/readme.vue'
import Simple from './modules/simple/index.vue'

export const routes = [
  {path: '/', component: Readme},
  {path: '/toggle', component: Toggle},
  {path: '/simple', component: Simple}
]