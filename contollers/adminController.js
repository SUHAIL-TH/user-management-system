const mongoose=require("mongoose")
const  admin=require("../models/adminModel")
const user = require("../models/userModel")
const bcrypt=require("bcrypt")



module.exports={
    getlogin:async(req,res)=>{
        if(req.session.admin){
            let users=await user.find() 
            res.render("admin/home",{users})

        }else{
            res.render("admin/login")

        }
       

    },
    postlogin:async(req,res)=>{
        try {
           
            let email=req.body.email
            let password=req.body.password
           
            if(email===process.env.Admin_email){
               
                if(password==process.env.Admin_pass){
                    req.session.admin=req.body.email
                    let users=await user.find()
                    // let search='';
                    // if(req.query.search!=""){
                    //     search=req.query.search
                    //     let users=await user.find({$or:[{name:{$regex:'.*'+search+'.*',$options:'i'}}]})
                        res.render("admin/home",{users})
                    // }
                   
                    
                }else{
                    res.render("admin/login",{error:"invalid password"})
                }

                
            }else{
                res.render("admin/login",{error:"Invalid email"})
            }
            
        } catch (error) {
            console.log(error);
            
        }
    },
    getlogout:(req,res)=>{
         req.session.admin=false
        res.redirect("/admin")  
    },
    edituser:async(req,res)=>{
        if(req.session.admin){
            const id=req.params.id;
            const  [users]=await user.find({_id:id})
            res.render("admin/edituser",{users})

        }
        else{
            res.redirect("/admin")
        }

    },
    updateuser:async(req,res)=>{
        if(req.session.admin){
            
         let id=req.params.id
       let users= await user.findOneAndUpdate({_id:id},
        {$set:{
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone

        }},{new:true})
        res.render("admin/edituser",{users})

        }else{
            res.redirect("/admin")
        }
       

        
    },
    deleteUser:async(req,res)=>{
        let id=req.params.id
        console.log(id);
        await user.deleteOne({_id:id})
        res.redirect("/admin")

    
    },
    backhome:(req,res)=>{
        res.redirect("/admin")

    },
    adduser:(req,res)=>{
        if(req.session.admin){
            res.render("admin/adduser")
        }

    },
    newuser:async(req,res)=>{
        try {
            let name=req.body.name
            let email=req.body.email
            let phone=req.body.phone
            let password=await bcrypt.hash(req.body.password, 10)
            await user.create({
                name:name,
                email:email,
                phone:phone,
                password:password


            })
            res.redirect("/admin")
            
        } catch (error) {
            console.log(error);
            
        }
       
       
        

    },
     usersearch:async(req,res)=>{
        if(req.session.admin){
            let search='';
            console.log("seach : " + req.query.search)
                    if(req.query.search!=""){
                        search=req.query.search
                        console.log("search : " + search)
                        let users=await user.find({name:{$regex:'.*'+search+'.*',$options:'i'}})
                        console.log(users);
                    res.render("admin/home",{users})
                    }

                   


        }else{
            res.redirect("/ ")
        }

    }

}
