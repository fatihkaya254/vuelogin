export default async function(context) {
  console.log("manager Middleware");
  let token = context.store.getters.getAuthkey;
  if (!context.store.getters.isAuthenticated) {
    context.redirect("/");
  } else {
    return context.$axios
      .post(`${process.env.OUR_HOST}/auth`, { token: token })
      .then(res => {
        if (res.data.user.role != undefined) {
          var rank = parseInt(res.data.user.role.rank, 10)   
            console.log("hello manager");
            if (rank <= 10) {
                let user = JSON.stringify(res.data.user);
                context.store.dispatch("setUser", user);
            } else {
                context.redirect("/");
            }
        }else{
            context.redirect("/");
        }
      });
  }
}