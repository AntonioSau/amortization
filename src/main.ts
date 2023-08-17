import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import axios from 'axios'
import VueGoodTablePlugin from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css'



axios.defaults.baseURL = 'http://localhost:8000/api/';

const app = createApp(App)

app.use(router)
app.use(VueGoodTablePlugin);

app.mount('#app')
