import Vuex from "vuex";

import Cookies from "js-cookie";

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
      user: null
    },
    mutations: {
      setAuthkey(state, authKey) {
        state.authKey = authKey;
      },
      clearAuthkey(state) {
        state.authKey = null;
        Cookies.remove("jwt");
      },
      changeButton(state, buttonText) {
        state.loginText = buttonText;
      },
      setUser(state, user) {
        state.user = user;
        console.log("my user: " + state.user);
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {},
      initAuth(vuexContext, req,) {
        let token;
        if (req) {
          if (!req.headers.cookie) {
           
            return;
          } else {
            token = req.headers.cookie
              .split(";")
              .find(c => c.trim().startsWith("jwt="));
            if (token) {
              token = token.split("=")[1];
              console.log("initAuth birinci aksiyon: " + token);
            }
          }
        } else {
          console.log("lokalden getir");
          token = localStorage.getItem("jwt")
        }
        vuexContext.commit("setAuthkey", token)
      },
      login(vuexContext, authKey) {
        Cookies.set("jwt", authKey);
        localStorage.setItem("jwt", authKey);
        vuexContext.commit("setAuthkey", authKey);
        console.log("--------ELLÖÖ ------")
        return this.$axios('http://localhost:8000/api/auth', {
		    method: 'HEAD',
		    mode: 'no-cors',
      	}).then((response) => {
    let user = JSON.stringify(res.data.user)
    context.store.dispatch("setUser", user)
	}).catch((e) => {
		console.log(e);
	});

    //    return this.$axios
    //    .post("http://localhost:8000/api/auth", { token: authKey },{withCredentials: true, credentials: 'include'})
    //    .then((res) => {
    //      let user = JSON.stringify(res.data.user)
    //      context.store.dispatch("setUser", user)
    //    })
      }, 
      setUser(state, user){
        this.commit("setUser", user)
      },
      generatePasscode({ commit, dispatch, state }, authData) {
        console.log(authData);
        this.$axios
          .post(
            "/phone",
            { phone: authData.phone },
            { withCredentials: true, credentials: "include" }
          )
          .then(res => {
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
          .post(
            "/code",
            {
              phone: authData.phone,
              code: authData.code
            },
            { withCredentials: true, credentials: "include" }
          )
          .then(res => {
            console.log(res);
            if (res.data.auth) {
              dispatch("login", res.data.authKey);
              state.phoneIsValid = false;
              state.numberInvalid = false;
              state.toForm = false;
              state.smsValid = false;
              state.loginText = "Çıkış Yap";
            } else {
              console.log("");
            }
          });
      }
    },
    getters: {
      isAuthenticated(state) {
        return state.authKey != null;
      },
      getAuthkey(state) {
        return state.authKey;
      },
      getUser(state) {
        return state.user;
      },
      userPhone(state) {
        if (state.user != null && state.user != "") {
          let userPhone = JSON.parse(state.user)
          return userPhone.phone          
        }
      },
      userId(state) {
        if (state.user != null && state.user != "") {
          let userPhone = JSON.parse(state.user)
          return userPhone._id          
        }
      }
    }
  });
};
export default createStore;
