const express = require('express');
const router=express.Router()
 const UserController=require("../controllers/Users.controller")
 const {protect}=require("../middlewares/auth")

 
 router.post("/registerUser",UserController.register)
 router.post("/login",UserController.login)
 router.get("/getAllUsers",UserController.getAllUsers)
 router.get("/:id",UserController.getUserById)
 router.get("/loggedInUser",protect,UserController.getMe)
 router.delete("/:id",UserController.deleteUser)
router.put("/:id",UserController.updateUser)


module.exports=router