export default async function (context) {
  console.log("homeauth Middleware");
  let token = context.store.getters.getAuthkey;
  if (!context.store.getters.isAuthenticated) {
    console.log("if homeauth Middleware");
  } else {
    console.log("else homeauth Middleware333");
    if (context.store.getters.getUser) return;
    return context.$axios
      .post(`${process.env.OUR_HOST}/auth`, { token: token })
      .then((res) => {       
        if(!res.data.auth) {
          context.store.dispatch("clearAuthkey");
          context.redirect("/")
        }
        else{
            let user = JSON.stringify(res.data.user);
            context.store.dispatch("setUser", user);
          }
      });
  }
}
