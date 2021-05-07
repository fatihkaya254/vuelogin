import axios from "axios";
export default function(context) {
  let token = context.store.getters.getAuthkey;
  if (!context.store.getters.isAuthenticated) {
    context.redirect("/");
  } else {
    return axios
      .post("http://192.168.1.54:8000/api/auth", { token: token })
      .then(res => {
        console.log("hello master");
        if (res.data.user.phone == 5073857166) {
          let user = JSON.stringify(res.data.user);
          context.store.dispatch("setUser", user);
        } else {
          context.redirect("/");
        }
      });
  }
}
