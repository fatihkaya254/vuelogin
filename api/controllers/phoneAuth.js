import PhoneAuth from "../models/phoneAuth"

exports.newphoneAuth = async(req,res) => {
    let phoneAuth = req.body.phoneAuth
    const newphoneAuth = await PhoneAuth.create(phoneAuth)
    res.status(201).json({ phoneAuth: newphoneAuth})
}

exports.getAllphoneAuthes = async (req,res) =>{
    PhoneAuth.find({}, function(err, phoneAuthes) {
        var phoneAuthMap = {};
    
        phoneAuthes.forEach(function(phoneAuth) {
            phoneAuthMap[phoneAuth._id] = phoneAuth;
        });
    
        res.send(phoneAuthMap);  
    });
}