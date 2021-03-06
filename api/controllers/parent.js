import Parent from "../models/parent"

exports.newParent = async(req,res) => {
    let parent = req.body.parent
    const newparent = await Parent.create(parent)
    res.status(201).json({ parent: newparent})
}

exports.getAllParents = async (req,res) =>{
    Parent.find({}, function(err, parents) {
        var parentMap = {};
    
        parents.forEach(function(parent) {
            parentMap[parent._id] = parent;
        });
    
        res.send(parentMap);  
    });
}