import Package from "../models/package"

exports.newPackage = async(req,res) => {
    let paket = req.body.package
    const newpackage = await Package.create(paket)
    res.status(201).json({ package: newpackage})
}

exports.getAllPackages = async (req,res) =>{
    Package.find({}, function(err, packages) {
        var packageMap = {};
    
        packages.forEach(function(paket) {
            packageMap[paket._id] = paket;

        });
    
        res.send(packageMap);  
    });
}