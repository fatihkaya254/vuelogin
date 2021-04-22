import Vuex from "vuex";

import Cookies from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: {
      token: "",
      loginText: "Giriş Yapın",
      disabled: 0,
      phoneIsValid: false,
      smsValid: false,
      numberInvalid: false,
      toForm: false,
      authKey: null,
      user: [],
    },
    mutations: {
      setAuthkey(state, authKey){
        state.authKey = authKey
      },
      clearAuthkey(state){
        state.authKey = null
        Cookies.remove("jwt")
      },
      changeButton(state, buttonText){
        state.loginText = buttonText
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context){

      },
      setUser(state, user){
        console.log("user değiştirildi yenisi: " + user);
        state.user = user
      },
      initAuth(vuexContext, req){
        let token
        if (req) {
          if (!req.headers.cookie) {
            return
          } else {
             token = req.headers.cookie.split(";").find( c => c.trim().startsWith("jwt="))
            if (token) {
              token = token.split("=")[1]
              console.log("initAuth birinci aksiyon: " + token);
            }
          }
        }else{
          console.log('lokalden getir');
        }
        vuexContext.commit("setAuthkey", token)
      },
      login(vuexContext, authKey){
        Cookies.set("jwt", authKey)
        localStorage.setItem("jwt", authKey)
        vuexContext.commit("setAuthkey", authKey)
      },
      generatePasscode({ commit, dispatch, state }, authData) {
        console.log(authData);
        this.$axios
          .post("/phone", { phone: authData.phone },{withCredentials: true, credentials: 'include'})
          .then((res) => {
            console.log(res);
            if (res.data.smsStatus == "success") {
              state.phoneIsValid = false;
              state.smsValid = true;
              state.numberInvalid = false;
            } else {
              state.phoneIsValid = false;
              state.smsValid = false;
              state.numberInvalid = true;
            }
          });
      },
      enterCode({ commit, dispatch, state }, authData) {
        console.log("as");
        this.$axios
          .post("/code", {
            phone: authData.phone,
            code: authData.code,
          },{withCredentials: true, credentials: 'include'})
          .then((res) => {
            console.log(res);
            if (res.data.auth) {
              dispatch("login", res.data.authKey)
              state.phoneIsValid = false;
              state.numberInvalid = false;
              state.toForm = false;
              state.smsValid = false;
              state.loginText = "Çıkış Yap";
            } else {
              console.log("");
            }
          });
      },
    },
    getters: {
      isAuthenticated(state){
          return state.authKey != null
      },
      getAuthkey(state){
        return state.authKey
      }
    },
  })
}
export default createStore