export default function (context) {
    console.log("sessioncontrol Middleware");
    let token = context.store.getters.getAuthkey;
    if (process.client) {
      if (context.store.getters.getUser) return;
      if(!token) localStorage.removeItem('jwt')
      console.log("client");
      context.store.dispatch("initAuth");
    } else {
      console.log("server");
      context.store.dispatch("initAuth", context.req);
    }
  }