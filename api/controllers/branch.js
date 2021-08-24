import Branch from "../models/branch"
import Subject from "../models/subject"

exports.newBranch = async(req,res) => {
    let branch = req.body.branch
    const newbranch = await Branch.create(branch)
    res.status(201).json({ branch: newbranch})
}

exports.getAllBranches = async (req,res) =>{
    Branch.find()
    .populate('grade')
    .then(branches => {
        var branchMap = {};
    
        branches.forEach(function(branch) {
            branchMap[branch._id] = branch;
        });
    
        res.send(branchMap);  
    });
}

exports.update = async (req, res) => {
    let id = req.body.id
    let where = req.body.where
    let value = req.body.value
    try {
        Branch.findByIdAndUpdate({_id : id}, { [where]: value }, ()=>{
            res.status(200).json({
                message:"updated"
            })
        })
    } catch (error) {
        console.log(error);
    }
}

exports.delete = async(req,res) => {
    let id = req.body.id
    try {
        let subjects = await Subject.find({branch : id})
        if(subjects.length != 0){
            res.status(200).json({
                message:"deleteFailed"
            })
        }
        else{
            Branch.findByIdAndDelete({_id : id}, ()=>{
                res.status(200).json({
                    message:"deleted"
                })
            })
        }
        }catch (error) {
            console.log(error)
        }
        
}