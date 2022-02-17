const Transactions=require("../models/Transactions.model")

exports.makingTransactions=async(req,res)=>{

try{
     const token= Math.floor((Math.random() * 100000000) + 1);
if(req.body.amount<100){
    res.status(404).json("Amount less than 100 not allowed")
}else if (req.body.amount=100) {
    res.status(404).json("you will only light one day.")
}

        const transaction=new Transactions({
            amount:req.body.amount,
            token:token,
            meterNumber:req.body.meterNumber,
          
         })
         let tokens= await transaction.save()
         res.status(200).json({Token:tokens})

    }catch(err){
     res.status(404).json({Message:err})
    }

 
}

exports.getTokens=async(req,res)=>{
  Transactions.find()
    .then(token=>{
      res.status(200).json({Token:token})
    })
    .catch(err=>{
      res.status(404).json({Message:err})
    })
}

exports.getTokenById=async(req,res)=>{
  Transactions.findById({_id:req.params._id})
    .then(token=>{
      res.status(200).json({Token:token})
    })
    .catch(err=>{
      res.status(404).json({Message:err})
    })
}

exports.deleteToken=async(req,res)=>{
  Transactions.findByIdAndDelete({_id:req.params._id})
    .then(token=>{
      res.status(201).json({Token:token})
    })
    .catch(err=>{
      res.status(404).json({Message:err})
      console.log(err)
    })
}