const express=require("express")
const  session=require("express-session")
const cookiParser=require("cookie-parser")
const path=require("path")

const app=express()


app.listen(3000,()=>{
    console.log(
        "server started listening to port"
    );
})