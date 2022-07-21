const User = require("../models/User");
const Shipper = require("../models/Shipper");

checkDuplicateGmail = (req, res, next) => {
    // Gmail
    User.findOne({
        gmailUser: req.body.gmailUser
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }
        if (user) {
            res.status(400).send({
                message: "Failed! Gmail is already in use!"
            });
            return;
        }
        next();
    });
};
checkDuplicateGmailStaff = (req, res, next) => {
    // Gmail
    Shipper.findOne({
        gmailShipper: req.body.gmailShipper
    }).exec((err, shipper) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }
        if (shipper) {
            res.status(400).send({
                message: "Failed! Gmail is already in use!"
            });
            return;
        }
        next();
    });
};
const verifySignUp = {
    checkDuplicateGmail
};

module.exports = verifySignUp;