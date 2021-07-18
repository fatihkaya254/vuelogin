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

exports.getMyPayments = async (req, res) => {
    var id = req.body.id;
    await axios
      .post(`${process.env.OUR_HOST}/auth`, { token: id })
      .then(res => {
          id = res.data.user._id;
      });
      Payment.find({ parent: id })
      .populate({ path: "branch", populate: { path: "grade" } })
      .then(payments => {
        var paymentMap = {};
        payments.forEach(function(paymentInfo) {
          paymentMap[paymentInfo._id] = paymentInfo;
        });
        res.send(paymentMap);
      });
  };
  

