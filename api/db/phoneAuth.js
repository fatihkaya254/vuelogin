import mongoose from 'mongoose'

const phoneAuthSchema = mongoose.Schema({
    phone: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true,
    },
    createdAt: { 
        type: Date, 
        expireAfterSeconds: 10, 
        default: Date.now 
    }
})

const PhoneAuth = mongoose.model('phoneAuth', phoneAuthSchema)



export default PhoneAuth