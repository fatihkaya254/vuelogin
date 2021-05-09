import mongoose from 'mongoose'

const purchasesSchema = mongoose.Schema({
    package: {
        type: String,
        required: true
    },
    user: {
        type: String,
    },
    purchaseDate: {
        type: String,
    },
    validityTime: {
        type: String,
    },
    paymentDate: { 
        type: Date, 
    }
})

const Purchases = mongoose.model('purchases', purchasesSchema)



export default Purchases