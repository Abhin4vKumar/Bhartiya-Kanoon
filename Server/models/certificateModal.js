const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    cert_id:{
        type:String,
        required:true,
    },
    user: {
        user_id:{
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required:true
        },
            acc_no:{
            type:String,
            required:true,
        },
    },
    organisation: {
        name:{
            type:String,
            required:true,
        },
        org_id:{
            type: mongoose.Schema.ObjectId,
            ref: "Organisation",
            required:true
        },
        acc_no:{
            type:String,
            required:true,
        }
    },
    accessTo: [{
        organisation:{
            name:{
                type:String,
                required:true,
            },
            org_id:{
                type: mongoose.Schema.ObjectId,
                ref:"User",
                required: true
            },
            acc_no:{
                type:String,
                required:true,
            }
        },
        active:{
            type:Boolean,
            default:true,
            required:true,
        }
    }],
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    active:{
        type:Boolean,
        default: true,
        required:true
    }
    ,
    ipfsLink:{
        type:String,
        required:true
    }
    ,
    summaryAvailable:{
      type:Boolean,
      default:false,
      required:true  
    },
    summaryLink:{
        type:String
    }
});

module.exports = mongoose.model("Certificate", certificateSchema);