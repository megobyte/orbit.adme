import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _18205f3a = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _1336a428 = () => interopDefault(import('../pages/hash.vue' /* webpackChunkName: "pages/hash" */))
const _1f1195a0 = () => interopDefault(import('../pages/metr.vue' /* webpackChunkName: "pages/metr" */))
const _4968e4f9 = () => interopDefault(import('../pages/mobile-chat.vue' /* webpackChunkName: "pages/mobile-chat" */))
const _c681d592 = () => interopDefault(import('../pages/mobile-last.vue' /* webpackChunkName: "pages/mobile-last" */))
const _1417e4e5 = () => interopDefault(import('../pages/promo.vue' /* webpackChunkName: "pages/promo" */))
const _1370f422 = () => interopDefault(import('../pages/face/_id.vue' /* webpackChunkName: "pages/face/_id" */))
const _13a7ab28 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'

    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })

    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'manual'
    })
  }
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: decodeURI('/'),
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/about",
      component: _18205f3a,
      name: "about"
    }, {
      path: "/hash",
      component: _1336a428,
      name: "hash"
    }, {
      path: "/metr",
      component: _1f1195a0,
      name: "metr"
    }, {
      path: "/mobile-chat",
      component: _4968e4f9,
      name: "mobile-chat"
    }, {
      path: "/mobile-last",
      component: _c681d592,
      name: "mobile-last"
    }, {
      path: "/promo",
      component: _1417e4e5,
      name: "promo"
    }, {
      path: "/face/:id?",
      component: _1370f422,
      name: "face-id"
    }, {
      path: "/",
      component: _13a7ab28,
      name: "index"
    }],

    fallback: false
  })
}
