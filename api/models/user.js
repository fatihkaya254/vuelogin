import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    phone: {
        type: Number,
    },
    email: {
        type: String,
    },
    name: {
        type: String,
    },
    surname: {
        type: String,
    },
    birthDay: {
        type: Date,
    },
    profilePic: {
        type: String,
    },
    googleId: {
        type: String,
    },
    appleId: {
        type: String,
    },
    role:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Role'
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

const User = mongoose.model('user', userSchema)


export default User