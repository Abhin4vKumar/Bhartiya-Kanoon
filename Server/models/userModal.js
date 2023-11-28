const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please Enter Name"],
        maxLength: [30, "Name cannot Exceed 30 chars"],
        minLength: [4, "Name should have more than 4 chars"]
    },
    acc_no:{
        type:String,
        required:true,
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        select: false,
        minLength: [8, "Password Should be greater than 8"]
    },
    phoneNumber:{
        type: String,
        required: [true , "Please Enter Your Phone Number"],
        minLength: [8 , "Number cannot be less than 8"],
        maxLength: [10 , "Number cannot exceed 10"]
    },
    avatar: {
        status: {
            type: Boolean,
            default: false,
            required: true
        },
        pic_id: {
            type: String,
            required: false
        }
    },
    employee: {
        type: Boolean,
        default: false,
        required:true
    },
    workOrganisation:{
        type: mongoose.Schema.ObjectId,
        required:false,
    },
    workOrganisationAccNo:{
        type:String,
        required:false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)

})

//JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
};

// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Generating Reset Password token
userSchema.methods.getResetPasswordToken = function () {
    //Generating Token
    const resetToken = crypto.randomBytes.toString("hex");

    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken
}

module.exports = mongoose.model("User", userSchema);