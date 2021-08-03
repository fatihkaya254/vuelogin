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
    packageName:{
        type: String,
        required: true
    },
    packageDesc:{
        type: String,
        required: true
    },
    endDate:{
        type: Date,
    },
    fee:{
        type: Number,
        required: true
    },
    weeklyPrivateLesson:{
        type: Number,
    },
    oncePrivateLesson:{
        type: Number,
    },
    weeklyExam:{
        type: Number,
    },
    onceExam:{
        type: Number,
    },
    installment:{
        type: Number,
        required: true
    },
    branch:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'branch',
    },
    grade:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'grade',
    }
})

const Purchase = mongoose.model('purchase', purchaseSchema)



export default Purchase