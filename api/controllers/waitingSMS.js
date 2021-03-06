import WaitingSMS from "../models/waitingSMS"

exports.newWaitingSMS = async(req,res) => {
    let waitingSMS = req.body.waitingSMS
    const newwaitingSMS = await WaitingSMS.create(waitingSMS)
    res.status(201).json({ waitingSMS: newwaitingSMS})
}

exports.getAllWaitingSMSes = async (req,res) =>{
    WaitingSMS.find({}, function(err, waitingSMSes) {
        var waitingSMSMap = {};
    
        waitingSMSes.forEach(function(waitingSMS) {
            waitingSMSMap[waitingSMS._id] = waitingSMS;
        });
    
        res.send(waitingSMSMap);  
    });
}