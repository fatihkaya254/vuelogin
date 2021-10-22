export default async function(context) {
  console.log("Record Middleware");
  let token = context.store.getters.getAuthkey;
  if (!context.store.getters.isAuthenticated) {
    context.redirect("/");
  } else if (
    context.route.fullPath == "/history/teacher" ||
    context.route.fullPath == "/history/student"
  ) {
    return context.$axios
      .post(`${process.env.OUR_HOST}/auth`, { token: token })
      .then(res => {
        let user = JSON.stringify(res.data.user);
        context.store.dispatch("setUser", user);
      });
  } else {
    return context.$axios
      .post(`${process.env.OUR_HOST}/auth`, { token: token })
      .then(res => {
        if (
          res.data.user.branch != undefined &&
          res.data.user.branch.length > 0
        ) {
          let user = JSON.stringify(res.data.user);
          context.store.dispatch("setUser", user);
          console.log("a");
          context.redirect("/history/teacher");
        } else {
          let user = JSON.stringify(res.data.user);
          context.store.dispatch("setUser", user);
          context.redirect("/history/student");
        }
      });
  }
}
