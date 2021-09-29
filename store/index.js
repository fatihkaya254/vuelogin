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
  user: null,
  packagePop: false,
});

export const mutations = {
  setAuthkey(state, authKey) {
    state.authKey = authKey;
  },
  setPackagePop(state, status) {
    state.packagePop = status;
  },
  clearAuthkey(state) {
    state.authKey = null;
    state.user = null;
    Cookies.remove("jwt");
    localStorage.removeItem("jwt");
  },
  setUser(state, user) {
    state.user = user;
    console.log("my user: " + state.user);
  },
  changeToForm(state) {
    state.toForm = !state.toForm;
  },
  changePhoneIsValid(state, boolean) {
    state.phoneIsValid = boolean;
  },
  changeNumberInvalid(state, boolean) {
    state.numberInvalid = boolean;
  },
  changeDisabled(state, boolean) {
    state.disabled = boolean;
  },
  changeSmsValid(state, boolean) {
    state.smsValid = boolean;
  },
};

export const actions = {
  refreshUser({ commit, dispatch, state }) {
    let token = state.authKey;
    if (state.authKey == null) {
    } else {
      return this.$axios
        .post(`${process.env.OUR_HOST}/auth`, { token: token })
        .then((res) => {
          let user = JSON.stringify(res.data.user);
          dispatch("setUser", user);
        });
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
          .find((c) => c.trim().startsWith("jwt="));
        if (token) {
          console.log("token");
          token = token.split("=")[1];
        }
      }
    } else {
      console.log("localstorage");
      token = localStorage.getItem("jwt");
    }
    vuexContext.commit("setAuthkey", token);
  },
  login(vuexContext, authKey) {
    Cookies.set("jwt", authKey);
    localStorage.setItem("jwt", authKey);
    vuexContext.commit("setAuthkey", authKey);
    return this.$axios
      .post(`${process.env.OUR_HOST}/auth`, { token: authKey })
      .then((res) => {
        let user = JSON.stringify(res.data.user);
        vuexContext.dispatch("setUser", user);
      });
  },
  setUser(vuexContext, user) {
    vuexContext.commit("setUser", user);
  },

  setPackagePop(vuexContext, status) {
    vuexContext.commit("setPackagePop", status);
  },

  generatePasscode({ commit, dispatch, state }, authData) {
    this.$axios.post("/phone", { phone: authData.phone }).then((res) => {
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
    this.$axios
      .post("/code", {
        phone: authData.phone,
        code: authData.code,
      })
      .then((res) => {
        if (res.data.auth) {
          dispatch("login", res.data.authKey);
          commit("changePhoneIsValid", false);
          commit("changeNumberInvalid", false);
          commit("changeSmsValid", false);
          commit("changeToForm", false);
        } else {
          console.log("nothing else matters");
        }
      });
  },
  authGoogle({ commit, dispatch, state }, authData) {
    this.$axios
      .post("/authGoogle", {
        googleId: authData.googleId,
        name: authData.name,
        surname: authData.surname,
        email: authData.email,
        profilePic: authData.profilePic,
      })
      .then((res) => {
        if (res.data.auth) {
          dispatch("login", res.data.authKey);
          commit("changePhoneIsValid", false);
          commit("changeNumberInvalid", false);
          commit("changeSmsValid", false);
          commit("changeToForm", false);
        } else {
          console.log("nothing else matters");
        }
      });
  },
};

export const getters = {
  isAuthenticated(state) {
    return state.authKey != null;
  },
  getAuthkey(state) {
    return state.authKey;
  },

  getPackagePop(state) {
    return state.packagePop;
  },
  getUser(state) {
    return state.user;
  },
  userMerhaba(state) {
    if (state.user != null && state.user != "") {
      let user = JSON.parse(state.user);
      let result = user.name;
      if (user.name == undefined || user.name == "") {
        result = user.phone;
      }
      return result;
    }
  },
  userPic(state) {
    let user = JSON.parse(state.user);
    if (user != null) {
      return user.profilePic;
    } else {
      return false;
    }
  },
  userId(state) {
    if (state.user != null && state.user != "") {
      let user = JSON.parse(state.user);
      return user._id;
    }
  },
  userBirthDay(state) {
    if (state.user != null && state.user != "") {
      let user = JSON.parse(state.user);
      if (user.birthDay != null && user.birthDay != undefined) {
        let datetime = user.birthDay;
        let date = datetime.split("-");
        let year = date[0];
        let month = date[1];
        let day = date[2].charAt(0) + date[2].charAt(1);
        return day + "." + month + "." + year;
      }
    }
  },
  userEmail(state) {
    if (state.user != null && state.user != "") {
      let user = JSON.parse(state.user);
      if (user.email != null && user.email != undefined) {
        return user.email;
      } else {
        return "Kayıtlı Bir E-posta Adresi Yok";
      }
    }
  },
  userBirthDayForInput(state) {
    if (state.user != null && state.user != "") {
      let user = JSON.parse(state.user);
      if (user.birthDay != null && user.birthDay != undefined) {
        let datetime = user.birthDay;
        let date = datetime.split("-");
        let year = date[0];
        let month = date[1];
        let day = date[2].charAt(0) + date[2].charAt(1);
        return year + "-" + month + "-" + day;
      }
    }
  },
  userName(state) {
    if (state.user != null && state.user != "") {
      let user = JSON.parse(state.user);
      return user.name;
    }
  },
  userGoogleId(state) {
    if (state.user != null && state.user != "") {
      let user = JSON.parse(state.user);
      return user.googleId;
    }
  },
  isGoogleConnected(state) {
    if (state.user != null && state.user != "") {
      let user = JSON.parse(state.user);
      if (user.googleId != undefined && user.googleId != null) {
        return true;
      } else {
        return false;
      }
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

  userImage(state) {
    if (state.user != null && state.user != "") {
      let user = JSON.parse(state.user);
      return user.profilePic;
    }
  },

  userBranch(state) {
    if (state.user != null && state.user != "") {
      let user = JSON.parse(state.user);
      return user.branch;
    }
  },

  isTeacher(state) {
    if (state.user != null && state.user != "") {
      let user = JSON.parse(state.user);
      if (
        user.branch.length > 0 &&
        user.branch != null &&
        user.branch != undefined
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
};
