import mongoose from 'mongoose'

const purchaseSchema = mongoose.Schema({
    package:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'package',
        required: true
    },
    parent:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    purchaseDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },
    fee:{
        type: Number,
        required: true
    },
    installment:{
        type: Number,
        required: true
    },
    branch:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'branch',
    }
    
})

const Purchase = mongoose.model('purchase', purchaseSchema)



export default Purchase