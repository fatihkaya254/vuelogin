import Payment from "../models/payment";
import axios from "axios";
axios.defaults.headers.common["Authorization"] = process.env.AXIOS_AUTH;

exports.newPayment = async (req, res) => {
  let paymentInfo = req.body.payment;
  const newPayment = await Payment.create(paymentInfo);
  res.status(201).json({ payment: newPayment });
};

exports.getAllPayments = async (req, res) => {
  Payment.find({
  })
    .populate({ path: "purchase" })
    .populate({ path: "user" })
    .sort("purchase")
    .sort("installmentOrder")
    .then(purchases => {
      var purchaseMap = {};
      purchases.forEach(function(p) {
        if(purchaseMap[p._user._id] == undefined) purchaseMap[p._id] = {}
        purchaseMap[p._user._id][p._id] = p
      });
      res.send(purchaseMap);
    });
};

exports.getMyPayments = async (req, res) => {
  var id = req.body.id;
  await axios.post(`${process.env.OUR_HOST}/auth`, { token: id }).then(res => {
    id = res.data.user._id;
  });
  Payment.find({ user: id })
    .populate({ path: "purchase" })
    .then(payments => {
      var paymentMap = {};
      payments.forEach(function(paymentInfo) {
        paymentMap[paymentInfo._id] = paymentInfo;
      });
      res.send(paymentMap);
    });
};
