const bodyParser = require("body-parser")
require('dotenv').config()
import path from 'path'
import fs from 'fs'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'İşleyen Zihinler',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  server: {     
    /*https: {
      key: fs.readFileSync(path.resolve("../vuelogin", 'izders.com.key')),
      crs: fs.readFileSync(path.resolve("../vuelogin", 'izders.com.csr'))
    },*/
    port: process.env.OUR_PORT, // default: 3000     
    host: process.env.OUR_IP, // default: localhost   
  },   // other configs 

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.OUR_HOST
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['gsap'],
  },
  serverMiddleware: [
    bodyParser.json(),
    "~/api"
  ]
}
