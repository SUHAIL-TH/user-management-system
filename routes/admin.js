const express=require("express")
const adminRouter=express()
const adminController=require("../contollers/adminController")


adminRouter.get("/",adminController.getlogin)
adminRouter.post("/adminlogin",adminController.postlogin)
adminRouter.get("/logout",adminController.getlogout)
adminRouter.get("/edituser/:id",adminController.edituser)
adminRouter.post("/updateuser/:id",adminController.updateuser)
adminRouter.get("/delete/:id",adminController.deleteUser)
adminRouter.get("/backhome",adminController.backhome)
adminRouter.get("/adduser",adminController.adduser)
adminRouter.post("/newuser",adminController.newuser)
module.exports=adminRouter;
