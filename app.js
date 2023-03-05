const express=require("express")
const app=express()
const  session=require("express-session")
const cookiParser=require("cookie-parser")
const path=require("path")
const adminRouter=require("./routes/admin")
const userRouter=require("./routes/user")
const dotenv=require("dotenv")
const dbconnect=require("./config/connection")
const morgan=require("morgan")

dotenv.config()

dbconnect.dbconnect()

app.set(cookiParser())
app.set('views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname,'public')))
// app.use(morgan(":method:status:url'HTTP/:http-version'"))
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: 6000000 },
    resave: false 
}));

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
app.use((req,res)=>{
    res.status(404).render("404")
})




app.listen(process.env.PORT,()=>{
    console.log(
        "server started listening to port"
    );
})





