const express =require("express");
const userRouter=express()
const userController=require("../contollers/userController")

userRouter.get("/",userController.login)
userRouter.get("/signup",userController.signup)
userRouter.post("/usersignup",userController.usersignup)
userRouter.post("/userlogin",userController.postlogin)
userRouter.get("/logout",userController.logout)
userRouter.get("/backhome",userController.backhome)




module.exports=userRouter;