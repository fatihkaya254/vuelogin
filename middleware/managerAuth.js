import axios from "axios";
export default async function(context) {
  let token = context.store.getters.getAuthkey;
  if (!context.store.getters.isAuthenticated) {
    context.redirect("/");
  } else {
    return axios
      .post(`${process.env.OUR_HOST}/auth`, { token: token })
      .then(res => {
        console.log("hello master");
        if (res.data.user.role != undefined) {   
            if (res.data.user.role.roleName ==  "manager") {
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