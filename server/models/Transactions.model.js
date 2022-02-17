const mongoose = require('mongoose')

const transactionSchema=new mongoose.Schema({

Amount:{
    type:String,
    required:[true,"Add amount."],
    minlength:3,
    maxlength:40,
},
meterNumber:{
    type:Number,
    required:[true,"Add your meter number."],
    maxlength:6,
},
token:{
    type:Number,
    maxlength:8
},
status: {
    type: String,
    enum: ["unused", "used"],
  },

})


const Transaction=mongoose.model("Transaction",transactionSchema)
module.exports=Transaction

