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
    adress: {
        type: String,
    },
    mainBranch: {
        type: String,
    },
    role:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'role'
    },
    grade:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'grade'
    },    
    branch:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'branch'
    },   
    school:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'schoolCourse'
    },
    invoiceInfo:{
        type: Object
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})
userSchema.index({ phone: 1 }, { unique: true,  partialFilterExpression: { phone: { $exists: true } } })

const User = mongoose.model('user', userSchema)


export default User