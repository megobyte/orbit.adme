
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: '#Лицопроще с Orbit',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'Думаешь, у тебя сложное лицо? Проверь себя на сложнометре от Orbit!' },
      { hid: 'twitter:title', name: 'twitter:title', content: '#Лицопроще с Orbit' },
      { hid: 'twitter:image:src', name: 'twitter:image:src', content: 'https://orbit.adme.ru/assets/images/share/tw.png' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'og:title', property: 'og:title', content: '#Лицопроще с Orbit' },
      { hid: 'og:url', property: 'og:url', content: 'https://orbit.adme.ru' },
      { hid: 'og:image', property: 'og:image', content: 'https://orbit.adme.ru/assets/images/share/fb.png' },
      { hid: 'og:description', property: 'og:description', content: 'Думаешь, у тебя сложное лицо? Проверь себя на сложнометре от Orbit!' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { rel: 'stylesheet', href: '/assets/fonts/stylesheet.css' }
    ],
    script: [
      { src: '/assets/js/g.js', type: 'text/javascript' },
      //{ src: 'https://vk.com/js/api/openapi.js?162', type: 'text/javascript' },
      //{ src: 'https://connect.facebook.net/en_US/sdk.js', type: 'text/javascript' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/hammer.js', ssr: false }
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/style-resources',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    proxy: true
    // See https://github.com/nuxt-community/axios-module#options
  },

  proxy: {
    '/task': { target: 'http://45.67.57.80'}
  },
  /**
   * Styles
   */
  styleResources: {
    scss: [
        '~assets/scss/vars.scss',
        //'assets/scss/file/_path-two.scss'
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extractCSS: process.env.NODE_ENV === 'production',
    extend(config, ctx) {
    }
  },

  server: {
    host: '0.0.0.0'
  },
}
