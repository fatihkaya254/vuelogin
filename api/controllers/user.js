import User from "../models/user.js";
import axios from "axios";
import PhoneAuth from "../models/phoneAuth.js";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60;
const createToken = id => {
  return jwt.sign({ id }, "G@#FCs5,2Bpy!wN}YCVE", {
    expiresIn: maxAge
  });
};
exports.generateCode = async (req, res) => {
  const phoneNumber = req.body.phone;
  const passcode = Math.floor(Math.random() * (99999 - 10000)) + 10000;
  axios
    .post("https://api.iletimerkezi.com/v1/send-sms/json", {
      request: {
        authentication: {
          username: "5073857166",
          password: "Up3QKbnUGxGp9TL"
        },
        order: {
          sender: "ISLYNZHNLR",
          message: {
            text: "İzders.com giriş kodu: " + passcode,
            receipents: {
              number: [phoneNumber]
            }
          }
        }
      }
    })
    .then(async resp => {
      console.log("res: " + resp.status);
      if (resp.status == 200) {
        res.status(201).json({
          smsStatus: "success"
        });
      } else {
        console.log("habu rizeye emicen vefat etti");
      }
    })
    .catch(resp => {
      console.log(resp.response.status);
      if (resp.response.status == 452) {
        res.status(201).json({
          smsStatus: "numberInvalid"
        });
      }
    });

  try {
    const auth = { phone: phoneNumber, code: passcode };
    const authInfo = await PhoneAuth.findOne({ phone: phoneNumber });
    if (authInfo) {
      const deleteAuth = await PhoneAuth.deleteOne({ phone: phoneNumber });
    } else {
      console.log("bu kayıt yok");
    }
    const createdPost = await PhoneAuth.create(auth);
    //  console.log(createdPost);
  } catch (error) {
    //  console.log(error);
  }
};

exports.authCode = async (req, res) => {
  console.log("sa");
  const enteredCode = req.body.code;
  console.log(enteredCode);
  const phoneNumber = req.body.phone;
  try {
    const auth = { phone: phoneNumber, code: enteredCode };
    const authInfo = await PhoneAuth.findOne(auth);
    if (authInfo) {
      console.log("yes");
      const userInfo = await User.findOne({ phone: phoneNumber });
      console.log("yes1");
      if (userInfo) {
        console.log("yes2");
        const token = createToken(userInfo._id);
        res
          .status(201)
          .json({ auth: true, userInfo: userInfo, authKey: token });
      } else {
        console.log("yes3");
        const NewUser = { phone: phoneNumber };
        const createdUser = await User.create(NewUser);
        const token = createToken(createdUser._id);
        res
          .status(201)
          .json({ auth: true, userInfo: createdUser, authKey: token });
      }
    } else {
      res.status(201).json({ auth: false });
    }
  } catch (error) {}
};

exports.authGoogle = async (req, res) => {
  console.log("sa google");
  const googleId = req.body.googleId;
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const profilePic = req.body.profilePic;
  try {
    const userInfo = await User.findOne({ googleId: googleId });
    console.log("yes1");
    if (userInfo) {
      console.log("yes2");
      const token = createToken(userInfo._id);
      res.status(201).json({ auth: true, userInfo: userInfo, authKey: token });
    } else {
      console.log("yes3");
      const NewUser = { googleId, name, surname, email, profilePic };
      const createdUser = await User.create(NewUser);
      const token = createToken(createdUser._id);
      res
        .status(201)
        .json({ auth: true, userInfo: createdUser, authKey: token });
    }
  } catch (error) {}
};

exports.auth = async (req, res) => {
  let token = req.body.token;
  if (token) {
    jwt.verify(token, "G@#FCs5,2Bpy!wN}YCVE", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
      } else {
        //console.log("id: " + decodedToken.id);
        const userInfo = await User.findById(decodedToken.id);
        //console.log("userinfobeforeid: " + userInfo);
        res.status(201).json({ user: userInfo });
      }
    });
  } else {
    res.status(201).json({ user: null });
  }
};

exports.changePhoneCheck = async (req, res) => {
  const enteredCode = req.body.code;
  const phoneNumber = req.body.phone;
  const id = req.body.id;
  try {
    const auth = { phone: phoneNumber, code: enteredCode };
    const authInfo = await PhoneAuth.findOne(auth);
    if (authInfo) {
      const userInfo = await User.findOne({ phone: phoneNumber });
      if (userInfo) {
        res.status(200).json({
          message: "alreadyUsed"
        });
      } else {
        try {
          const userInfo = await User.findOne({ _id: id });
          var oldPhone = userInfo.phone
          var name = userInfo.name + " " + userInfo.surname
          axios
            .post("https://api.iletimerkezi.com/v1/send-sms/json", {
              request: {
                authentication: {
                  username: "5073857166",
                  password: "Up3QKbnUGxGp9TL"
                },
                order: {
                  sender: "ISLYNZHNLR",
                  message: {
                    text: "Sayın "+ name + " izders.com profilinizdeki telefon numaranız değiştirilmiştir. İşlem bilginiz dahilinde değilse lütfen iletişme geçiniz.",
                    receipents: {
                      number: [oldPhone]
                    }
                  }
                }
              }
            })
            .then(async resp => {
              console.log("res: " + resp.status);
              if (resp.status == 200) {
     
              } else {
                console.log("habu rizeye emicen vefat etti");
              }
            })
            .catch(resp => {
              console.log(resp.response.status);
              if (resp.response.status == 452) {

              }
            });
        } catch (error) {
          
        }
        try {
          await User.findByIdAndUpdate(
            { _id: id },
            { phone: phoneNumber },
            () => {
              res.status(200).json({
                message: "updated"
              });
            }
          );
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      res.status(201).json({ auth: false });
    }
  } catch (error) {}
};

async function generateSMS(phone) {
  const phoneNumber = phone;
  const passcode = Math.floor(Math.random() * (99999 - 10000)) + 10000;
  axios
    .post("https://api.iletimerkezi.com/v1/send-sms/json", {
      request: {
        authentication: {
          username: "5073857166",
          password: "Up3QKbnUGxGp9TL"
        },
        order: {
          sender: "ISLYNZHNLR",
          message: {
            text:
              "İzders.com telefon numarası değişrimek için onay kodu: " +
              passcode,
            receipents: {
              number: [phoneNumber]
            }
          }
        }
      }
    })
    .then(async resp => {
      console.log("res: " + resp.status);
      if (resp.status == 200) {
      } else {
        console.log("habu rizeye emicen vefat etti");
      }
    })
    .catch(resp => {
      console.log(resp.response.status);
      if (resp.response.status == 452) {
      }
    });

  try {
    const auth = { phone: phoneNumber, code: passcode };
    const authInfo = await PhoneAuth.findOne({ phone: phoneNumber });
    if (authInfo) {
      const deleteAuth = await PhoneAuth.deleteOne({ phone: phoneNumber });
    } else {
      console.log("bu kayıt yok");
    }
    const createdPost = await PhoneAuth.create(auth);
    //  console.log(createdPost);
  } catch (error) {
    //  console.log(error);
  }
}

exports.update = async (req, res) => {
  let id = req.body.id;
  let where = req.body.where;
  let value = req.body.value;
  if (where != "phone") {
    console.log("id: " + id + " where: " + where + " Value: " + value);
    try {
      User.findByIdAndUpdate({ _id: id }, { [where]: value }, () => {
        res.status(200).json({
          message: "updated"
        });
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    await generateSMS(value);
    res.status(200).json({
      message: "generated"
    });
  }
};

exports.getAll = async (req, res) => {
  User.find({}, function(err, users) {
    var userMap = {};
    users.forEach(function(user) {
      userMap[user._id] = user;
    });

    res.send(userMap);
  });
};
