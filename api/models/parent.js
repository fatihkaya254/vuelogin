import mongoose from 'mongoose'

const parentSchema = mongoose.Schema({
    
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    
    
})

const Parent = mongoose.model('parent', parentSchema)



export default Parent