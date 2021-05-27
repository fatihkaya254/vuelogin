import Cookies from "js-cookie";

export const state = () => ({
  token: "",
  loginText: "Giriş Yapın",
  disabled: false,
  phoneIsValid: false,
  smsValid: false,
  numberInvalid: false,
  toForm: false,
  authKey: null,
  user: null
})


export const mutations = {

  setAuthkey(state, authKey) {
    state.authKey = authKey
  },
  clearAuthkey(state) {
    state.authKey = null
    state.user = null
    Cookies.remove("jwt")
    localStorage.removeItem("jwt")
  },
  setUser(state, user) {
    state.user = user
    console.log("my user: " + state.user)
  },
  changeToForm(state){
    state.toForm = !state.toForm
  },
  changePhoneIsValid(state, boolean){
    state.phoneIsValid = boolean
  },
  changeNumberInvalid(state, boolean){
    state.numberInvalid = boolean
  },
  changeDisabled(state, boolean){
    state.disabled = boolean
  },
  changeSmsValid(state, boolean){
    state.smsValid = boolean
  },
}

export const actions = {

  refreshUser({ commit, dispatch, state }){
    let token = state.authKey
    if(state.authKey==null){
    }else{
        return this.$axios
          .post(`${process.env.OUR_HOST}/auth`, { token: token })
          .then((res) => {
            console.log('hello world');
            let user = JSON.stringify(res.data.user)
            console.log("-------------------"+user)
            dispatch("setUser", user)
        })
    }
  },

  nuxtServerInit(vuexContext, context) {},
  initAuth(vuexContext, req) {
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
        }
      }
    } else {
      console.log("lokalden getir");
      token = localStorage.getItem("jwt");
    }
    vuexContext.commit("setAuthkey", token);
  },
  login(vuexContext, authKey) {
    console.log('login fonksiyonu başladı, authkey: ' + authKey);
    Cookies.set("jwt", authKey);
    localStorage.setItem("jwt", authKey);
    vuexContext.commit("setAuthkey", authKey);
    return this.$axios
      .post(
        `${process.env.OUR_HOST}/auth`,
        { token: authKey },
        { withCredentials: true, credentials: "include" }
      )
      .then(res => {
        console.log('login axos response: ' + res.data.user);
        let user = JSON.stringify(res.data.user);
        vuexContext.dispatch("setUser", user);
      });
  },
  setUser(vuexContext, user) {
    vuexContext.commit("setUser", user);
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
          commit("changePhoneIsValid", false);
          commit("changeSmsValid", true);
          commit("changeNumberInvalid", false);
        } else {
          commit("changePhoneIsValid", false);
          commit("changeSmsValid", false);
          commit("changeNumberInvalid", true);
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
          commit("changePhoneIsValid", false);
          commit("changeNumberInvalid", false);
          commit("changeSmsValid", false);
          commit("changeToForm", false);
        } else {
          console.log("");
        }
      });
  },
  authGoogle({ commit, dispatch, state }, authData) {
    console.log("as");
    this.$axios
      .post(
        "/authGoogle",
        {
          googleId: authData.googleId,
          name: authData.name,
          surname: authData.surname,
          email: authData.email,
          profilePic: authData.profilePic,
        },
        { withCredentials: true, credentials: "include" }
      )
      .then(res => {
        console.log(res);
        if (res.data.auth) {
          dispatch("login", res.data.authKey);
          commit("changePhoneIsValid", false);
          commit("changeNumberInvalid", false);
          commit("changeSmsValid", false);
          commit("changeToForm", false);
        } else {
          console.log("");
        }
      });
  }
}

export const getters = {
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
      let user = JSON.parse(state.user);
      let result = "Merhaba " + user.name
      if (user.name == undefined) {
        result = user.phone
      }
      return result;
    }
  },
  userPic(state){
    let user = JSON.parse(state.user);
    if (user != null) {
      return user.profilePic;
    }else{
      return false
    }
  },
  userId(state) {
    if (state.user != null && state.user != "") {
      let user = JSON.parse(state.user);
      return user._id;
    }
  },
  userName(state) {
    if (state.user != null && state.user != "") {
      let user = JSON.parse(state.user);
      return user.name;
    }
  },
  userSurname(state) {
    if (state.user != null && state.user != "") {
      let user = JSON.parse(state.user);
      return user.surname;
    }
  },

  userPhone(state) {
    if (state.user != null && state.user != "") {
      let user = JSON.parse(state.user);
      return user.phone;
    }
  },

}