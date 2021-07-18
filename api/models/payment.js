import mongoose from 'mongoose'

const paymentSchema = mongoose.Schema({
    purchase:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'purchase',
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    parent:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    paymentTotal:{
        type: Number,
        required: true
    },
    paymentDate:{
        type: Date,
        required: true
    },
    paymentMethod:{
        type: String,
        required: true
    },
    approver:{
        type: String,
        required: true
    },
    
})

const Payment = mongoose.model('payment', paymentSchema)



export default Payment