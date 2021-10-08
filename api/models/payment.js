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
    installmentTotal:{
        type: Number,
        required: true
    },
    installmentDate:{
        type: Date,
        required: true
    },
    installmentOrder:{
        type: Number,
        required: true
    },
    paymentTotal:{
        type: Number,
    },
    paymentDate:{
        type: Date,
    },
    closed:{
        type: Boolean,
        default: false
    },
    paymentMethod:{
        type: String,
    },
    approver:{
        type: String,
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
    
})

const Payment = mongoose.model('payment', paymentSchema)



export default Payment