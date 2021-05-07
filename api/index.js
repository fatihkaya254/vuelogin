import express from 'express'
const app = express()
import mongoose from 'mongoose'
import PhoneAuth from '../api/db/phoneAuth.js'
import User from '../api/db/user.js'
import Role from '../api/db/role.js'
import axios from "axios";
import jwt from "jsonwebtoken"
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

const maxAge = 3*24*60*60
const createToken = (id)=>{
    return jwt.sign({id}, "G@#FCs5,2Bpy!wN}YCVE", {
        expiresIn: maxAge
    })
}

app.post('/phone', async (req, res) => {
    const phoneNumber = req.body.phone
    const passcode = Math.floor(Math.random() * (99999 - 10000)) + 10000;
    axios.post('https://api.iletimerkezi.com/v1/send-sms/json',
        {
            "request": {
                "authentication": {
                    "username": "5073857166",
                    "password": "Up3QKbnUGxGp9TL",
                },
                "order": {
                    "sender": "ISLYNZHNLR",
                    "message": {
                        "text": "İzders.com giriş kodu: " + passcode,
                        "receipents": {
                            "number": [
                                phoneNumber
                            ]
                        }
                    }
                }
            }
        }
    )
        .then(async (resp) => {
            console.log("res: " + resp.status);
            if (resp.status == 200) {
                res.status(201).json({
                    smsStatus: "success",
                })
            }else{
                console.log('habu rizeye emicen vefat etti');
            }
        }).catch((resp) => {
            console.log(resp.response.status);
            if (resp.response.status == 452) {
                res.status(201).json({
                    smsStatus: "numberInvalid",
                })
            }
        })

    try {
        const auth = { phone: phoneNumber, code: passcode }
        const authInfo = await PhoneAuth.findOne({ phone: phoneNumber })
        if (authInfo) {
            const deleteAuth = await PhoneAuth.deleteOne({ phone: phoneNumber })
        } else {
            console.log('bu kayıt yok');
        }
        const createdPost = await PhoneAuth.create(auth)
        //  console.log(createdPost);
    } catch (error) {
        //  console.log(error);
    }
});

app.post('/auth', async (req, res) => {
    let token = req.body.token
    if (token) {
        jwt.verify(token, "G@#FCs5,2Bpy!wN}YCVE", async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
            } else {
                //console.log("id: " + decodedToken.id);
                const userInfo = await User.findById(decodedToken.id)
                //console.log("userinfobeforeid: " + userInfo);
                res.status(201).json({ user: userInfo})
            }
        })
    }else{
        res.status(201).json({ user: null})
    }
})

app.post('/addRole', async (req, res) => {
    let role = req.body.role
    const newRole = await Role.create(role)
    res.status(201).json({ role: newRole})
})

app.post('/code', async (req, res) => {
    console.log('sa');
    const enteredCode = req.body.code
    console.log(enteredCode);
    const phoneNumber = req.body.phone
    try {
        const auth = { phone: phoneNumber, code: enteredCode }
        const authInfo = await PhoneAuth.findOne(auth)
        if (authInfo) {
            console.log('yes');
            const userInfo = await User.findOne({phone: phoneNumber})
            console.log('yes1');
            if (userInfo) {
                console.log('yes2');
                const token = createToken(userInfo._id)
                res.status(201).json({ auth: true, userInfo: userInfo, authKey: token})
            } else {
                console.log('yes3');
                const NewUser = { phone: phoneNumber }
                const createdUser = await User.create(NewUser)
                const token = createToken(createdUser._id)
                res.status(201).json({ auth: true, userInfo: createdUser, authKey: token})
            }
        } else {
            res.status(201).json({ auth: false})
        }
    } catch (error) {
        
    }
});

app.put('/updateProfile', async (req, res) => {
    let id = req.body.id
    let where = req.body.where
    let value = req.body.value
    console.log('id: ' + id + ' where: ' + where + ' Value: ' + value);
    try {
        User.findByIdAndUpdate({_id : id}, { [where]: value }, ()=>{
            res.status(200).json({
                message:"updated"
            })
        })
    } catch (error) {
        console.log(error);
    }
})

app.get('/users', async (req, res) => {
    User.find({}, function(err, users) { 
        var userMap = {};   
        users.forEach(function(user) {
          userMap[user._id] = user;
        });
    
        res.send(userMap);  
    })
    ;
});

app.get('/roles', async (req, res) => {
    Role.find({}, function(err, roles) {
        var roleMap = {};
    
        roles.forEach(function(role) {
            roleMap[role._id] = role;
        });
    
        res.send(roleMap);  
    });
});

module.exports = {
    path : "/api",
    handler: app
}