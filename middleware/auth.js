import axios from "axios";
export default function(context){
    let token = context.store.getters.getAuthkey
    if(!context.store.getters.isAuthenticated){
    }else{
        return axios
          .post("http://localhost:8000/api/auth", { token: token })
          .then((res) => {
            console.log('hello world');
            let user = JSON.stringify(res.data.user)
            context.store.dispatch("setUser", user)
        })
    }
}