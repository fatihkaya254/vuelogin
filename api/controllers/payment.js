import Payment from "../models/payment"

exports.newPayment = async(req,res) => {
    let paymentInfo = req.body.payment
    const newPayment = await Payment.create(paymentInfo)
    res.status(201).json({ payment: newPayment})
}

exports.getAllPayments = async (req,res) =>{
    Payment.find({}, function(err, payments) {
        var paymentMap = {};
    
        payments.forEach(function(paymentInfo) {
            paymentMap[paymentInfo._id] = paymentInfo;
        });
    
        res.send(paymentMap);  
    });
}


