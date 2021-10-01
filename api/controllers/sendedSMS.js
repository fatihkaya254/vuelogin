import SendedSMS from "../models/sendedSMS";
import axios from "axios";
import crypto from "crypto";
exports.newSendedSMS = async (req, res) => {
  let sendedSMS = req.body.sendedSMS;
  const newsendedSMS = await SendedSMS.create(sendedSMS);
  res.status(201).json({ sendedSMS: newsendedSMS });
};

exports.getAllSendedSMSes = async (req, res) => {
  SendedSMS.find({}, function(err, sendedSMSes) {
    var sendedSMSMap = {};

    sendedSMSes.forEach(function(sendedSMS) {
      sendedSMSMap[sendedSMS._id] = sendedSMS;
    });

    res.send(sendedSMSMap);
  });
};

exports.sendSms = async (req, res) => {
  const message = req.body.sms;
  const phone = req.body.phone;
  const dateTime = req.body.dateTime;
  const user = req.body.student;
  await axios
    .post("https://api.iletimerkezi.com/v1/send-sms/json", {
      request: {
        authentication: {
          username: "5073857166",
          password: "Up3QKbnUGxGp9TL"
        },
        order: {
          sender: "ISLYNZHNLR",
          message: {
            text: message,
            receipents: {
              number: [phone]
            }
          }
        }
      }
    })
    .then(async resp => {
      if (resp.status == 200) {
        await SendedSMS.create({ message, phone, dateTime, user });
        res.status(201).json({
          smsStatus: "success"
        });
      } else {
        console.log("sms gönderilemedi");
      }
    })
    .catch(resp => {
      if (resp.response.status == 452) {
        res.status(201).json({
          smsStatus: "numberInvalid"
        });
      }
    });
};

exports.balance = async (req, res) => {
  await axios
    .post("https://api.iletimerkezi.com/v1/get-balance/json", {
      request: {
        authentication: {
          key: "707e36b7070cbd1942d354b6c99abc4d",
          hash:
            "08aaa00f299bec8dabc268871d376cd56b13a781823a6a576e513f66d2a3dd94"
        }
      }
    })
    .then(async resp => {
      if (resp.status == 200) {
        res.status(201).json({
          sms: resp.data.response.balance.sms
        });
      } else {
        console.log("sms gönderilemedi");
      }
    })
    .catch(resp => {
      if (resp.status == 452) {
        res.status(201).json({
          smsStatus: "numberInvalid"
        });
      }
    });
};
