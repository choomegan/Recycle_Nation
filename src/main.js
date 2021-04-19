import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes.js'
import VueQrcodeReader from "vue-qrcode-reader";


Vue.use(VueQrcodeReader);
Vue.use(VueRouter)

Vue.config.productionTip = false

//register routes
const myRouter = new VueRouter({
    routes: Routes,
    mode: 'history'
})

new Vue ({
    render: h => h(App),
    router: myRouter
}).$mount('#app')