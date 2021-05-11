import BranchProgress from "../models/branchProgress"

exports.newbranchProgress = async(req,res) => {
    let branchProgress = req.body.branchProgress
    const newbranchProgress = await BranchProgress.create(branchProgress)
    res.status(201).json({ branchProgress: newbranchProgress})
}

exports.getAllbranchProgresses = async (req,res) =>{
    BranchProgress.find({}, function(err, branchProgresses) {
        var branchProgressMap = {};
    
        branchProgresses.forEach(function(branchProgress) {
            branchProgressMap[branchProgress._id] = branchProgress;
        });
    
        res.send(branchProgressMap);  
    });
}