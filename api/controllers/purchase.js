import Purchace from "../models/purchace"

exports.newpurchace = async(req,res) => {
    let purchace = req.body.purchace
    const newpurchace = await Purchace.create(purchace)
    res.status(201).json({ purchace: newpurchace})
}

exports.getAllpurchaces = async (req,res) =>{
    Purchace.find({}, function(err, purchaces) {
        var purchaceMap = {};
    
        purchaces.forEach(function(purchace) {
            purchaceMap[purchace._id] = purchace;
        });
    
        res.send(purchaceMap);  
    });
}