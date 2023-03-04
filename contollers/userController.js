const user=require("../models/userModel")
const bcrypt=require("bcrypt")
const mongoose=require("mongoose")

module.exports={

    login:async(req,res)=>{
        try {
            if(req.session.user){
                res.render("user/home")

            }else{
                res.render("user/login")

            }
            
        } catch (error) {
           console.log(error);  
        }
    },
    signup:(req,res)=>{
        try {
            res.render("user/signup")    
        } catch (error) {
            console.log(error);   
        }

    },
    usersignup:async(req,res)=>{
        try {
          
            let name=req.body.name;
            let email=req.body.email;
            let phone=req.body.phone;
            let password= await bcrypt.hash(req.body.password, 10)
            res.redirect("/")
           
            const User = await user.create({
                name: name,
                email: email,
                phone:phone,
                password:password
       
              })
              
      

        } catch (error) {
            
        }
    },
    postlogin: async(req,res)=>{
        try {
            let email=req.body.email
            let password=req.body.password
            let userData= await user.findOne({email:email})
           
            if(userData){
                let passwordMatch=await bcrypt.compare(password,userData.password)
                if(passwordMatch){
                    req.session.user=req.body.email 
                    
                    res.render("user/home")
                }
                else{
                    res.render("user/login",{error:"invalid password"})
                }

            }else{
                res.render("user/login",{error:"Please create an Account"})
            }
            
        } catch (error) {
            console.log(error);
            
        }
    },
    logout:(req,res)=>{
         req.session.destroy()
         res.redirect("/")     
    },
    backhome:(req,res)=>{
        res.redirect("/")
    }
    
}