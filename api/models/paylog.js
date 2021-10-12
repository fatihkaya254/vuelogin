import mongoose from 'mongoose'

const paylogSchema = mongoose.Schema({
    payment:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'payment',
        required: true
    },
    payTotal:{
        type: Number,
        default: 0 
    },
    payDate:{
        type: Date,
    },
    payMethod:{
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

const Paylog = mongoose.model('paylog', paylogSchema)



export default Paylog