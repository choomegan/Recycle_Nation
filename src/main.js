import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes.js'
import VueQrcodeReader from "vue-qrcode-reader";
import firebase from 'firebase/app'


Vue.use(VueQrcodeReader);
Vue.use(VueRouter)

Vue.config.productionTip = false

//register routes
const myRouter = new VueRouter({
    routes: Routes,
    mode: 'history'
})

/* myRouter.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser();
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && !currrentUser) next('login');
    else next();
}); */

let app = '';

firebase.auth().onAuthStateChanged(user => {
    console.log(user);
    if (!app) {
        app = new Vue ({
            render: h => h(App),
            router: myRouter
        }).$mount('#app')
    }
});
