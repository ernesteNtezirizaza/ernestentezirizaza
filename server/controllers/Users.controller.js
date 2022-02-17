const ErrorResponse = require('../utils/errorResponse')
 const asyncHandler = require('../middlewares/async')
const User = require("../models/Users.model")


exports.register = asyncHandler(async (req, res, next) =>{
    let isUser = await User.findOne({ email: req.body.email })
    if (isUser) {
      return res.status(200).json({
        Message: "User with that email already exists!"
      })
     }

   const { username, email, password,first_name,last_name} = req.body
   const day =new Date()
   const user = await User.create({
       username,
       email,
       password,
       first_name,
       last_name,
       createdAt:day,
   })
sendTokenResponse(user, 200, res)
})


exports.login = asyncHandler(async (req, res, next) =>{
    const { email, password} = req.body
    if(!email || !password) {
        return next(new ErrorResponse("Please provide an email and password!", 400))
    }
    const user = await User.findOne({ email }).select('+password')
    if(!user) {
        return next(new ErrorResponse("Invalid credentials!", 401))
    }
    const isMatch = await user.matchPassword(password)
    if(!isMatch) {
        return next(new ErrorResponse("Invalid credentials!", 401))
    }

     const token = user.getSignedJwtToken()
    // res.status(200).json({ success: true , token })
     sendTokenResponse(user, 200, res)
 })


   const sendTokenResponse = (user, statusCode, res) =>{
     const token = user.getSignedJwtToken()
     const options = {
         expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
         httpOnly: true
     }
     if(process.env.NODE_ENV === "production"){
         options.secure = true
     }

     res.status(statusCode).cookie('token', token, options).json({success: true, token})
 }


 exports.getMe = asyncHandler(async(req,res,next)=>{
     const user = await User.findById(req.user.id)
     res.status(200).json({success: true, data: user})
 })

 exports.editingUser = asyncHandler(async(req,res,next)=>{
    const id = req.params._id
   await User.findById(id, function (err, user){
        res.json(user)
    })
  })


 exports.updateDetails = asyncHandler(async(req,res,next)=>{
     const fieldsToUpdate = {
         username: req.body.username,
         email: req.body.email,
         first_name: req.body.first_name,
         last_name: req.body.last_name,
     }
     const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {new: true, runValidators: true})
     res.status(200).json({success: true, data: user})
 })



 exports.getUserById= asyncHandler(async(req,res)=>{
    await User.findById(req.params.id) 
     .then(doc=>{
       return res.send(doc).status(200)
     })
     .catch(err=>{return res.send(err).status(200)})
})


exports.getAllUsers = asyncHandler(async(req,res,next)=>{
    await User.find()
    .then(users=>res.send(users).status(200))
    .catch(err=>res.send(err).status(404))
})

exports.deleteUser=asyncHandler(async(req,res,next)=>{
    await User.findOneAndDelete(req.params.id)
    .then(deleteUser=>{
        res.json({User:deleteUser})
    })
    .catch(err=>{
        res.json({Message:err})
    })
})


exports.updateUser=asyncHandler(async(req,res,next)=>{
    await User.findOneAndUpdate(req.params.id, req.body,{new:true})
     .then(user=>{res.json({User:user})
    })
     .catch(err=>{res.json({Message:err})
})
})