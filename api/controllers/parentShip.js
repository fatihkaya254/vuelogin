import ParentShip from "../models/parentShip"

exports.newparentShip = async(req,res) => {
    let parentShip = req.body.parentShip
    const newparentShip = await ParentShip.create(parentShip)
    res.status(201).json({ parentShip: newparentShip})
}

exports.getAllparentShips = async (req,res) =>{
    ParentShip.find({}, function(err, parentShips) {
        var parentShipMap = {};
    
        parentShips.forEach(function(parentShip) {
            parentShipMap[parentShip._id] = parentShip;
        });
    
        res.send(parentShipMap);  
    });
}