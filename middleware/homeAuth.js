import axios from "axios";
export default async function(context){
    console.log("homeauth Middleware");
    let token = context.store.getters.getAuthkey
    if(!context.store.getters.isAuthenticated){
    }else{
        return axios
          .post(`${process.env.OUR_HOST}/auth`, { token: token })
          .then((res) => {
            console.log('hello world');
            let user = JSON.stringify(res.data.user)
            context.store.dispatch("setUser", user)
        })
    }
}