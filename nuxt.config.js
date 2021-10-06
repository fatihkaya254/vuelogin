const bodyParser = require("body-parser");

require("dotenv").config();
import path from "path";
import fs from "fs";
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "İşleyen Zihinler",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "google-site-verification",
        content: "77GsZ_cFE2zVjV5NuLNkE5UA-Nr5THP67ho6z-jseEc"
      },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  server: {
    https: {
      key: fs.readFileSync(path.resolve("../vuelogin", 'izders.com.key')),
      cert: fs.readFileSync(path.resolve("../vuelogin", 'IZDERSCOM_AllCertificate.crt'))
    },
    port: process.env.OUR_PORT, // default: 3000
    host: process.env.OUR_IP // default: localhost
  }, // other configs

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    
      "@nuxtjs/fontawesome",

    
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/dotenv"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
<<<<<<< HEAD
    https: true,
    baseURL: process.env.OUR_HOST
=======
    https: process.env.AXIOS_HTTPS,  
    baseURL: process.env.OUR_HOST,  
    headers : {
      common: {
        'Authorization' : process.env.AXIOS_AUTH
      }
    }
>>>>>>> 0ef8eb3bb2ed71f2e654371c2a6ce1b00ab923cd
  },
  // font awesome configuration: https://www.npmjs.com/package/@nuxtjs/fontawesome
  fontawesome: {
    component: "fa",
    suffix: true,
    icons:{
      solid: true,
      brands: true,
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["gsap"]
  },
  serverMiddleware: [bodyParser.json(), "~/api"]
};
