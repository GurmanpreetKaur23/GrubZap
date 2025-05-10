import express from  "express" 
import cors from "cors" ;
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";


// app config
const app = express()
const port = 4000 

// middleware
app.use(express.json()) ;
app.use(cors()) ;

// db connection
connectDB() ;

//api endpoint
app.use("/api/food", foodRouter) ;
app.get("/" , (req,res)=>{
    res.send("API WORKING") ;
}) ;

// run the express server
app.listen(port , ()=>{
    console.log(`server is running on ${port}`) ;
})

// mongodb+srv://grubzap:<db_password>@cluster0.3mydztp.mongodb.net/?