import express from 'express'
const app = express()
import mongoose from 'mongoose'
//import PhoneAuth from './models/phoneAuth.js'
import User from './controllers/user.js'
import Role from './controllers/role.js'
import cors from "cors"

var corsOptions = {
    origin: 'http://http://192.168.1.54:8000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));


mongoose.connect("mongodb+srv://root:root@cluster0.k07vz.mongodb.net/blogpost?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log('connected to db'))
.catch((err) => console.log(err))

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


//kullanıcılar
app.post('/phone', User.generateCode)
app.post('/code', User.authCode)
app.post('/auth', User.auth)
app.put('/updateProfile', User.update)
app.get('/users', User.getAll)

//ROLLER
app.post('/addRole', Role.newRole)
app.get('/roles', Role.getAllRoles)


module.exports = {
    path : "/api",
    handler: app
}