export default function(context){
    console.log("sessioncontrol Middleware");
    if (process.client) {
        context.store.dispatch("initAuth")
    } else {
        context.store.dispatch("initAuth", context.req)
    }
}