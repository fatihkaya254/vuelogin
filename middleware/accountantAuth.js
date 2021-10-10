export default async function(context) {
  console.log("accountancy Middleware");
  let token = context.store.getters.getAuthkey;
  if (!context.store.getters.isAuthenticated) {
    console.log("accountancy Middleware 5");
    context.redirect("/");
  } else {
    console.log("accountancy Middleware 8");
    return context.$axios
      .post(`${process.env.OUR_HOST}/auth`, { token: token })
      .then(res => {
        if (res.data.user.role != undefined) {
          var rank = parseInt(res.data.user.role.rank, 10)   
            console.log("hello manager");
            if (rank == 25 || rank == 0) {
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