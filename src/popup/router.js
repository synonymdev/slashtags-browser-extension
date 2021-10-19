import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import Account from '@/components/Accounts.vue'
import AddAccount from '@/components/Accounts/Add.vue'
import Home from '@/components/Home.vue'
import Onboarding from '@/components/Onboarding.vue'

const routes = [
    { path: '/', redirect:'/account'},
    { path: '/onboarding', component: Onboarding },
    { path: '/account', component: Account },
    { path: '/account/add/:tag', component: AddAccount, props: true },
    { path: '/home', component: Home },
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

export default router