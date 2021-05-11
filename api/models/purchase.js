import mongoose from 'mongoose'

const purchaseSchema = mongoose.Schema({
    package: {
        type: String,
        required: true
    },
    user: {
        type: String,
    },
    purchaseDate: {
        type: Date,
    },
    validityTime: {
        type: String,
    },
    paymentDate: { 
        type: Date, 
    },
    package:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Package'
    },
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Student'
    },
    
})

const Purchase = mongoose.model('purchase', purchaseSchema)



export default Purchase