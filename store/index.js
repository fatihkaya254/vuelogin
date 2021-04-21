import Vuex from "vuex";
import axios from "axios";
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
    },
    mutations: {
      setAuthkey(state, authKey){
        Cookies.set("jwt", authKey)
        state.authKey = authKey
      },
      clearAuthkey(state){
        state.authKey = null
        Cookies.remove("jwt")
      }
    },
    actions: {
      nuxtServerInit(vuexContext, contex){
        if (contex.req.headers.cookie) {
          let cookie = contex.req.headers.cookie.split(";").find( c => c.trim().startsWith("jwt="))
          cookie = cookie.split("=")[1]
          console.log(cookie);
        }
      },
      initAuth(dispatch){
       // console.log(dispatch);
       // const jwt = Cookies.get( 'jwt')
        //console.log("jwt: " + jwt)
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
              commit("setAuthkey", res.data.authKey)
              state.phoneIsValid = false;
              state.numberInvalid = false;
              state.toForm = false;
              state.smsValid = false;
              state.loginText = authData.phone;
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