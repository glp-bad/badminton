require('./bootstrap');

import Vue from 'vue/dist/vue';
window.Vue = Vue;

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios  from 'axios';

axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN': window.csrf_token
};

import App from './App.vue';
Vue.use(VueAxios, axios);


//---------------
// ------- router
import Routes from './routes'
const router = new VueRouter({
    routes: Routes,
    mode: 'history'
});

// [Add code] Solve the Vue-Router's repeating point routing error in version 3.0
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

/*
router.beforeEach(
    (to, from, next) => {
        if(Vue.prototype.isLogin) {
            next();
        }
    }
)
*/

// console.log(router.currentRoute.path);

// ------- router
//---------------

import appHelper from "./plugin/appHelper";
Vue.use(appHelper);

// import isUndef from "./../../node_modules/vue/src/shared/util.js";
// import vueUtil from "./../../node_modules/vue/types/";

import ButtonComponent from './components/custom/ButtonComponent'
Vue.component('ff-button', ButtonComponent);

// font
import { library }          from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon }  from '@fortawesome/vue-fontawesome'
// import { faUserSecret }     from '@fortawesome/free-solid-svg-icons'
// import { faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import { fas }     from '@fortawesome/free-solid-svg-icons'

library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);

const app = new Vue(Vue.util.extend({ router }, App)).$mount('#app');

// const app = new Vue({ router }).$mount("#app");


