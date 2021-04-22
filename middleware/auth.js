import axios from "axios";
export default function(context){
    let token = context.store.getters.getAuthkey
    if(!context.store.getters.isAuthenticated){
        context.store.commit("changeButton", "Giriş Yap")
    }else{
        context.store.commit("changeButton", "Çıkış Yap")
        axios
          .post("http://localhost:8000/api/auth", { token: token },{withCredentials: true, credentials: 'include'})
          .then((res) => {
            let user = JSON.stringify(res.data.user)
            context.store.dispatch("setUser", user)
        })
    }
}