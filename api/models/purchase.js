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
    cancelDesc:{
        type: String,
    },
    endDate:{
        type: Date,
    },
    cancelDate:{
        type: Date,
    },
    waivedWage:{
        type: Number,
    },
    fee:{
        type: Number,
        required: true
    },
    groupRight:{
        type: Boolean,
        default: false,
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
    cancel:{
        type: Number,
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