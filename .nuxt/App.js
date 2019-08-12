import Vue from 'vue'
import NuxtLoading from './components/nuxt-loading.vue'

import _6f6c098b from '../layouts/default.vue'

const layouts = { "_default": _6f6c098b }

export default {
  head: {"title":"#Лицопроще с Orbit","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"},{"hid":"description","name":"description","content":"Думаешь, у тебя сложное лицо? Проверь себя на сложнометре от Orbit!"},{"hid":"twitter:title","name":"twitter:title","content":"#Лицопроще с Orbit"},{"hid":"twitter:image:src","name":"twitter:image:src","content":"https:\u002F\u002Forbit.adme.ru\u002Fassets\u002Fimages\u002Fshare\u002Ftw.png"},{"hid":"twitter:card","name":"twitter:card","content":"summary_large_image"},{"hid":"og:title","property":"og:title","content":"#Лицопроще с Orbit"},{"hid":"og:url","property":"og:url","content":"https:\u002F\u002Forbit.adme.ru"},{"hid":"og:image","property":"og:image","content":"https:\u002F\u002Forbit.adme.ru\u002Fassets\u002Fimages\u002Fshare\u002Ffb.png"},{"hid":"og:description","property":"og:description","content":"Думаешь, у тебя сложное лицо? Проверь себя на сложнометре от Orbit!"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"rel":"icon","type":"image\u002Fpng","href":"\u002Ffavicon.png"},{"rel":"stylesheet","href":"\u002Fassets\u002Ffonts\u002Fstylesheet.css"}],"script":[{"src":"https:\u002F\u002Fwww.googletagmanager.com\u002Fgtag\u002Fjs?id=UA-145448819-1","type":"text\u002Fjavascript"},{"src":"\u002Fassets\u002Fjs\u002Fg.js","type":"text\u002Fjavascript"}],"style":[]},

  render(h, props) {
    const loadingEl = h('NuxtLoading', { ref: 'loading' })
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      },
      on: {
        beforeEnter(el) {
          // Ensure to trigger scroll event after calling scrollBehavior
          window.$nuxt.$nextTick(() => {
            window.$nuxt.$emit('triggerScroll')
          })
        }
      }
    }, [ templateEl ])

    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [loadingEl, transitionEl])
  },
  data: () => ({
    isOnline: true,
    layout: null,
    layoutName: ''
  }),
  beforeCreate() {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created() {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (process.client) {
      window.$nuxt = this
      this.refreshOnlineStatus()
      // Setup the listeners
      window.addEventListener('online', this.refreshOnlineStatus)
      window.addEventListener('offline', this.refreshOnlineStatus)
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },

  mounted() {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },

  computed: {
    isOffline() {
      return !this.isOnline
    }
  },
  methods: {
    refreshOnlineStatus() {
      if (process.client) {
        if (typeof window.navigator.onLine === 'undefined') {
          // If the browser doesn't support connection status reports
          // assume that we are online because most apps' only react
          // when they now that the connection has been interrupted
          this.isOnline = true
        } else {
          this.isOnline = window.navigator.onLine
        }
      }
    },

    errorChanged() {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },

    setLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    }
  },
  components: {
    NuxtLoading
  }
}
