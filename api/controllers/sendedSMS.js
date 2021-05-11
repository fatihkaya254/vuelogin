import SendedSMS from "../models/sendedSMS"

exports.newSendedSMS = async(req,res) => {
    let sendedSMS = req.body.sendedSMS
    const newsendedSMS = await SendedSMS.create(sendedSMS)
    res.status(201).json({ sendedSMS: newsendedSMS})
}

exports.getAllSendedSMSes = async (req,res) =>{
    SendedSMS.find({}, function(err, sendedSMSes) {
        var sendedSMSMap = {};
    
        sendedSMSes.forEach(function(sendedSMS) {
            sendedSMSMap[sendedSMS._id] = sendedSMS;
        });
    
        res.send(sendedSMSMap);  
    });
}