import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    phone: {
        type: Number,
        required: true
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
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

const User = mongoose.model('user', userSchema)


export default User