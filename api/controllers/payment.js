import Payment from "../models/payment";
import Paylog from "../models/paylog";
import axios from "axios";
axios.defaults.headers.common["Authorization"] = process.env.AXIOS_AUTH;

exports.newPayment = async (req, res) => {
  let paymentInfo = req.body.payment;
  const newPayment = await Payment.create(paymentInfo);
  res.status(201).json({ payment: newPayment });
};

exports.getAllPayments = async (req, res) => {
  Payment.find({})
    .populate({ path: "purchase" })
    .populate({ path: "user" })
    .populate({ path: "student" })
    .sort("installmentDate")
    .sort("purchase")
    .sort("installmentOrder")
    .then(purchases => {
      var purchaseMap = {};
      purchases.forEach(function(p) {
        if (purchaseMap[p.student._id] == undefined)
          purchaseMap[p.student._id] = {};
        purchaseMap[p.student._id][p._id] = p;
      });
      res.send(purchaseMap);
    });
};

exports.getAllPaylogs = async (req, res) => {
  Paylog.find({})
    .populate([{ path: "payment", populate: { path: "student" } }])
    .sort("payDate")
    .then(purchases => {
      var purchaseMap = {};
      purchases.forEach(function(p) {
        purchaseMap[p._id] = p;
      });
      res.send(purchaseMap);
    });
};

exports.update = async (req, res) => {
  let id = req.body.id;
  let changes = req.body.changes;
  if (changes.paymentTotal != undefined) {
    const paylog = {
      payment: id,
      payTotal: req.body.pay,
      payDate: changes.paymentDate,
      payMethod: changes.paymentMethod,
      approver: changes.approver
    };
    await Paylog.create(paylog);
  }
  try {
    Payment.findByIdAndUpdate({ _id: id }, changes, () => {
      res.status(200).json({
        message: "updated"
      });
    });
  } catch (error) {
    console.log(error);
  }
  res.status(200);
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

exports.delayeds = async (req, res) => {
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  try {
    Payment.find({
      installmentDate: { $lt: startOfToday },
      closed: false
    })
      .populate("student", "name surname")
      .populate("user", "name surname phone")
      .sort("student")
      .then(purchases => {
        var purchaseMap = {};
        purchases.forEach(function(purchaseInfo) {
          purchaseMap[purchaseInfo._id] = purchaseInfo;
        });
        res.send(purchaseMap);
      });
  } catch (error) {
    console.log(error);
  }
};
