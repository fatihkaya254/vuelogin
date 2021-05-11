import Branch from "../models/branch"

exports.newBranch = async(req,res) => {
    let branch = req.body.branch
    const newBranch = await Branch.create(branch)
    res.status(201).json({ branch: newBranch})
}

exports.getAllBranches = async (req,res) =>{
    Branch.find({}, function(err, branches) {
        var branchMap = {};
    
        branches.forEach(function(branch) {
            branchMap[branch._id] = branch;
        });
    
        res.send(branchMap);  
    });
}