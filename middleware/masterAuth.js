import axios from "axios";
export default function(context) {
  let token = context.store.getters.getAuthkey;
  if (!context.store.getters.isAuthenticated) {
    context.redirect("/");
  } else {
    return axios
      .post(`${process.env.OUR_HOST}/auth`, { token: token })
      .then(res => {
        console.log("hello master");
        if (res.data.user.phone == 5321130988 || res.data.user.phone == 5073857166 ) {
          let user = JSON.stringify(res.data.user);
          context.store.dispatch("setUser", user);
        } else {
          context.redirect("/");
        }
      });
  }
}
