import mongoose from 'mongoose'

const sendedSMSSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    telNumber: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    
})

const SendedSMS = mongoose.model('sendedSMS', sendedSMSSchema)



export default SendedSMS