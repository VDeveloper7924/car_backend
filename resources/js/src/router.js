import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store/store.js"

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: '/',
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [
        {
          path: '/',
          redirect: '/home'
        },
        {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
              {
                path: '/home',
                name: 'home',
                component: () => import('./views/Home.vue'),
                meta: {
                  rule: 'admin'
                }
              },
              {
                path: '/page2',
                name: 'page-2',
                component: () => import('./views/Page2.vue'),
                meta: {
                  rule: 'buyer'
                }
              },
            ],
        },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
        {
            path: '',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
        // =============================================================================
        // PAGES
        // =============================================================================
              {
                path: '/login',
                name: 'login',
                component: () => import('@/views/auth/Login.vue'),
                meta: {
                  rule: 'user'
                }
              },
              {
                path: '/register',
                name: 'register',
                component: () => import('@/views/auth/Register.vue'),
                meta: {
                  rule: 'user'
                }
              },
              {
                path: '/forgot-password',
                name: 'forgot_password',
                component: () => import('@/views/auth/ForgotPassword.vue'),
                meta: {
                  rule: 'user'
                }
              },
              {
                path: '/error-404',
                name: 'error-404',
                component: () => import('@/views/auth/Error404.vue'),
                meta: {
                  rule: 'user'
                }
              },
            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/error-404'
        }
    ],
})

router.afterEach((to, from, next) => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  
  if (appLoading) {
      appLoading.style.display = "none";
  }

  // refresh token
  if(store.state.auth.leftTokenTime() < 600 && to.meta.rule === 'admin') {
    store.dispatch('auth/refreshToken')
  }
})

router.beforeEach((to, from, next) => {
  if (!store.state.auth.isAuthenticated() && to.meta.rule !== 'user')
    next({ name: 'login' })
  else
    next()
})

export default router
