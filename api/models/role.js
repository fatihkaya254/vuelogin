import mongoose from 'mongoose'

const roleSchema = mongoose.Schema({
    rank: {
        type: Number,
    },
    roleName: {
        type: String,
        unique : true,
        required: true,
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

const Role = mongoose.model('role', roleSchema)


export default Role