import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store.js'

Vue.use(VueRouter);

import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'

import Onboarding from '@/components/Onboarding.vue'
import Onboarding_Terms from '@/components/Onboarding/Terms.vue'
import Onboarding_Create from '@/components/Onboarding/Create.vue'
import Onboarding_Confirm from '@/components/Onboarding/Confirm.vue'

import Account from '@/components/Account/Index.vue'
import Account_Create from '@/components/Account/Create.vue'
import Account_View from '@/components/Account/View.vue'
import Account_Link from '@/components/Account/Link.vue'
import Account_Import from '@/components/Account/Import.vue'
import Account_List from '@/components/Account/List.vue'

import Profile from '@/components/Profile/Index.vue'
import Profile_List from '@/components/Profile/List.vue'
import Profile_View from '@/components/Profile/View.vue'
import Profile_Add from '@/components/Profile/Add.vue'

import Settings from '@/components/Settings.vue'

const routes = [
    { 
      path: '/login', 
      name: 'login',
      component: Login,
      meta: {
        requiresAuth: false
      }
    }, { 
      path: '/', 
      redirect: '/account/list', 
      meta: {
        requiresAuth: false
      }
    }, { 
      path: '/onboarding', 
      name: 'onboarding',
      component: Onboarding,
      meta: {
        requiresAuth: false
      },
      children: [{
          name: 'step1',
          path: 'terms',
          component: Onboarding_Terms,
          meta: { 
            requiresAuth: false
          }
        },{
          name: 'step2',
          path: 'create',
          component: Onboarding_Create,
          meta: { 
            requiresAuth: false
          }
        },{
          name: 'step3',
          path: 'confirm',
          component: Onboarding_Confirm,
          meta: { 
            requiresAuth: false
          }
        }]
    }, { 
      name: 'account',
      path: '/account',
      component: Account,
      meta: {
        requiresAuth: true
      },
      children: [{
        name: 'create',
        path: 'create',
        component: Account_Create,
        meta: { 
          requiresAuth: false
        }
      },{
        name: 'view',
        path: 'view/:id',
        component: Account_View,
        meta: { 
          requiresAuth: false
        }
      },{
        name: 'import',
        path: 'import',
        component: Account_Import,
        meta: { 
          requiresAuth: false
        }
      },{
        name: 'list',
        path: 'list',
        component: Account_List,
        meta: { 
          header: true,
          requiresAuth: true,
          profile: true
        }
      },{
        name: 'link',
        path: 'link/:tag',
        component: Account_Link,
        meta: { 
          header: true,
          requiresAuth: false,
          title : "Connect"
        }
      }]
    },{ 
      name: 'profile',
      path: '/profile',
      component: Profile,
      meta: {
        requiresAuth: true
      },
      children: [{
        name: 'list',
        path: 'list',
        component: Profile_List,
        meta: { 
          header: true,
          back: true,
          requiresAuth: true
        }
      },{
        name: 'view',
        path: 'view/:id',
        component: Profile_View,
        meta: { 
          header: true,
          back: true,
          requiresAuth: false
        }
      },{
        name: 'add',
        path: 'add',
        component: Profile_Add,
        meta: { 
          header: true,
          back: true,
          requiresAuth: false
        }
      }]
    },{ 
      path: '/settings', 
      component: Settings,
      meta: {
        header: true,
        back: true,
        requiresAuth: true
      } 
    },{ 
      path: '/home', 
      component: Home,
      meta: {
        requiresAuth: true
      } 
    }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
  console.log(to.name, from.name)
  if (to.matched.some(record => record.meta.requiresAuth)) {    
    if (to.name != "link" && from.name != "step1" && to.name != "import" && !store.getters.accountCount) {
      next({
        path: '/onboarding/terms',
        query: { redirect: to.fullPath }
      })
    } else if (store.getters.isLocked) {

      if (to.name == "import" &&  from.name == "login") {
        next()
      } else {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router