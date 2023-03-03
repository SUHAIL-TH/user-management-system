const express=require("express")
const  session=require("express-session")
const cookiParser=require("cookie-parser")
const path=require("path")
const adminRouter=require("./routes/admin")
const userRouter=require("./routes/user")
const dotenv=require("dotenv")

const app=express()
app.set(cookiParser())
app.set('views');
app.set('view engine', 'ejs');
app.use(express.static(patch.join(__dirname,'public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: 6000000 },
    resave: false 
}));
dotenv.config()
//remove cache
app.use((req, res, next) => {
    res.header(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
});

app.use("/",userRouter)
app.use("/admin",adminRouter)




app.listen(3000,()=>{
    console.log(
        "server started listening to port"
    );
})