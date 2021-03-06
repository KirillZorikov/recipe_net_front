import { createApp } from 'vue'
import {store} from './store'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import VueNextSelect from 'vue-next-select'
import titleMixin from './mixins/title.mixin'


const app = createApp(App)

axios.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        if (error.response.status !== 401) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        } else {
            localStorage.removeItem('user');
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }
)

app.use(router)
app.use(store)
app.use(VueAxios, axios)

app.component('vue-select', VueNextSelect)

app.mixin(titleMixin)

app.mount('#app')
