import mongoose from 'mongoose'

const waitingSMSSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    
})

const WaitingSMS = mongoose.model('waitingSMS', waitingSMSSchema)



export default WaitingSMS