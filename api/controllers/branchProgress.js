import BranchProgress from "../models/branchProgress"

exports.newBranchProgress = async(req,res) => {
    let branchProgress = req.body.branchProgress
    const newbranchProgress = await BranchProgress.create(branchProgress)
    res.status(201).json({ branchProgress: newbranchProgress})
}

exports.getAllBranchProgresses = async (req,res) =>{
    BranchProgress.find({}, function(err, branchProgresses) {
        var branchProgressMap = {};
    
        branchProgresses.forEach(function(branchProgress) {
            branchProgressMap[branchProgress._id] = branchProgress;
        });
    
        res.send(branchProgressMap);  
    });
}