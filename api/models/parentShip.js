import mongoose from 'mongoose'

const parentShipSchema = mongoose.Schema({
    
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'student'
    },
    parent:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'parent'
    },
    parentRole:{
        type: String,
    },
    
})

const ParentShip = mongoose.model('purchases', parentShipSchema)



export default ParentShip