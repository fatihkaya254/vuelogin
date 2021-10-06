export default async function(context) {
  console.log("auth Middleware");
  let token = context.store.getters.getAuthkey;
  if (!context.store.getters.isAuthenticated) {
    console.log("unAuthenticated");
    context.redirect("/");
  } else {
    return context.$axios
      .post(`${process.env.OUR_HOST}/auth`, { token: token })
      .then(res => {
        console.log("hello auth");
        let user = JSON.stringify(res.data.user);
        context.store.dispatch("setUser", user);
      });
  }
}
