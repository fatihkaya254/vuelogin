export default async function (context) {
  console.log("auth Middleware");
  let token = context.store.getters.getAuthkey;
  if (!context.store.getters.isAuthenticated) {
    console.log("unAuthenticated");
    context.redirect("/");
  } else {
    if (context.store.getters.getUser) return;
    return context.$axios
      .post(`${process.env.OUR_HOST}/auth`, { token: token })
      .then((res) => {
        console.log("hello auth");
        if (!res.data.user) {
          context.redirect("/");
        }
        let user = JSON.stringify(res.data.user);
        if(!res.auth) dispatch("clearAuthkey");
        else context.store.dispatch("setUser", user);
      });
  }
}
