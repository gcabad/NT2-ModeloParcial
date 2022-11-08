import Vue from 'vue'
import VueRouter from 'vue-router'

import Punto1 from './componentes/Punto1.vue'
import Punto2 from './componentes/Punto2.vue'

/* import Binding from './componentes/Binding.vue' */

Vue.use(VueRouter)

//INSTALL ROUTER: npm i vue-router@3

export const router = new VueRouter({
    mode: 'history',
    routes: [
         //{ path: '/', redirect: '/punto1' }, 
         { path: '/punto1', component: Punto1 },
         { path: '/punto2', component: Punto2 },
    ]
})