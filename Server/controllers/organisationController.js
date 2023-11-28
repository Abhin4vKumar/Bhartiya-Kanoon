const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Organisation = require("../models/organisationModal");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendMail");
const crypto = require("crypto");
const User = require("../models/userModal");

// Register a Organisation
exports.registerOrganisation = catchAsyncErrors(async (req, res, next) => {
    const { name,acc_no, email, password  } = req.body;

    const org = await Organisation.create({
        name, acc_no,email, password, avatar: {
            url: "profilepicUrl"
        }
    });

    sendToken(org, 201, res);

});

// Login Organisation

exports.loginOrganisation = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;

    //checking if organisation has given password and email both
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const org = await Organisation.findOne({ email }).select("+password");

    if (!org) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMatched = org.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    sendToken(org, 200, res);

});

//Logout Organisation
exports.logout = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

//Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const org = await Organisation.findOne({ email: req.body.email });

    if (!org) {
        return next(new ErrorHandler("Organisation not Found", 404));
    }

    // Get ResetPassword Token
    const resetToken = org.getResetPasswordToken();

    await org.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/org/password/reset/${resetToken}`;

    const message = `Your Password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it`;

    try {

        await sendEmail({
            email: org.email,
            subject: `Organisation Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email is sent to ${org.email} successfully`
        })

    } catch (error) {
        org.resetPasswordToken = undefined;
        org.resetPasswordExpire = undefined;

        await org.save({ validateBeforeSave: false });

        return (next(new ErrorHandler(error.message, 500)));
    }
});

//Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    //creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const org = await Organisation.findOne({ resetPasswordToken: resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

    if (!org) {
        return next(new ErrorHandler("Reset Password Token is Invalid or Expired", 400));
    }

    if (req.body.password != req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords Doesn't Match", 400));
    }

    org.password = req.body.password;
    org.resetPasswordToken = undefined;
    org.resetPasswordExpire = undefined;
    await org.save();

    sendToken(org, 200, res);
});


//Get Organisation Details
exports.getOrganisationDetails = catchAsyncErrors(async (req, res, next) => {
    const org = await Organisation.findById(req.user._id);
    res.status(200).json({
        success: true,
        org
    })
})

//Update Organisation Password
exports.updateOrganisationPassword = catchAsyncErrors(async (req, res, next) => {
    const org = await Organisation.findById(req.user._id).select("+password");
    const isPasswordMatched = await org.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old Password is incorrect", 400));
    }

    if (req.body.newPassword != req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords Doesn't Match", 400));
    }
    org.password = req.body.newPassword;
    await org.save();
    sendToken(org, 200, res);
})

//Update Organisation Profile
exports.updateOrganisationProfile = catchAsyncErrors(async (req, res, next) => {
    const newOrgData = {
        name: req.body.name,
        email: req.body.email,
        avatar:{url:req.body.profilePicUrl}
    }
    //we will add cloudinary later
    const org = await Organisation.findByIdAndUpdate(req.user.id, newOrgData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
    });
});

//Add Employee
exports.addEmployee = catchAsyncErrors(async(req,res,next)=>{
    const org = await Organisation.findById(req.user._id);
    const user = await User.findOne({acc_no:req.body.userAcc});
    if(!org){
        return next(new ErrorHandler("Organisation not found" , 404));
    }
    if(!user){
        return next(new ErrorHandler("User not found" , 404));
    }
    let found=false;
    org.employeesList.forEach(element => {
        if(element.acc_no == user.acc_no){
            found=true;
        }
    });
    if(found){
        return res.status(200).json({
            success: true,
            message: "User was Already Hired"
        })
    }
    let employeeArray = {
        employeesList:org.employeesList   
    }
    let empObj = {
        employeeId: user._id,
        name: user.name,
        acc_no: user.acc_no
    }
    employeeArray.employeesList.push(empObj)
    const org_ = await Organisation.findByIdAndUpdate(req.user._id , employeeArray ,{
        new: true,
        runValidators: true,
        useFindAndModify: false,
    } );
    const user_ = await User.findByIdAndUpdate(user._id , {employee : true , workOrganisation : org._id , workOrganisationAccNo: org.acc_no} ,{
        new: true,
        runValidators: true,
        useFindAndModify: false,
    } );
    return res.status(200).json({
        success: true,
        message: "User Hired"
    })
});
exports.removeEmployee = catchAsyncErrors(async(req,res,next)=>{
    const org = await Organisation.findById(req.user._id);
    const user = await User.findOne({acc_no:req.body.userAcc});
    if(!org){
        return next(new ErrorHandler("Organisation not found" , 404));
    }
    if(!user){
        return next(new ErrorHandler("User not found" , 404));
    }
    let found=false;
    let employeeArray = {
        employeesList:[]   
    }
    org.employeesList.forEach((element) => {
        if(element.acc_no == req.body.userAcc){
            found=true;
            skip = true;
        }else{
            employeeArray.employeesList.push(element);
        }
    });
    if(!found){
        return res.status(200).json({
            success: true,
            message: "User was Never Hired"
        })
    }
    org.employeesList = employeeArray.employeesList;
    await org.save();
    const user_ = await User.findByIdAndUpdate(user._id , {employee : false , workOrganisation : null , workOrganisationAccNo:null} ,{
        new: true,
        runValidators: true,
        useFindAndModify: false,
    } );
    
    return res.status(200).json({
        success: true,
        message: "User Layed Off"
    })
});
//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------

//Get All Users (admin)

// exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
//     const email = req.params.email;
//     const users = await User.find({email:email});

//     res.status(200).json({
//         success: true,
//         users
//     });
// });

//Get Single User (admin)

// exports.getSingleUSer = catchAsyncErrors(async (req, res, next) => {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//         return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`));
//     }

//     res.status(200).json({
//         success: true,
//         user
//     });
// });

// Update User Role (admin)
// exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
//     const newUserData = {
//         name: req.body.name,
//         email: req.body.email,
//         role: req.body.role
//     }
//     const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
//         new: true,
//         runValidators: true,
//         useFindAndModify: false,
//     });
//     res.status(200).json({
//         success: true,
//     });
// });

// Delete User (admin)
// exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//         return next(new ErrorHandler(`User does not exist with id ${req.params.id}`, 400));
//     }
//     await user.remove();
//     res.status(200).json({
//         success: true,
//     })
// })