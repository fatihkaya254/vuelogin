export default function(context){
    console.log("sessioncontrol Middleware");
    if (process.client) {
        console.log('client');
        context.store.dispatch("initAuth")
    } else {
        console.log('server');
        context.store.dispatch("initAuth", context.req)
    }
}