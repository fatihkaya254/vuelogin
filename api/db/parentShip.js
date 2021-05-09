import mongoose from 'mongoose'

const parentShipSchema = mongoose.Schema({
    
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Student'
    },
    parent:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Parent'
    },
    parentRole:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'ParentRole'
    },
    
})

const ParentShip = mongoose.model('purchases', parentShipSchema)



export default ParentShip