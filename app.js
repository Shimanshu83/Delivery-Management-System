const express = require('express');
const cors = require('cors');

const authRoute = require("./routes/authRoute"); 
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute"); 

const connectDB = require('./config/connection'); 

require('dotenv').config() ;


const app = express();

app.use(cors());
app.use(express.json({limit : "30mb", extended : true}));
app.use(express.urlencoded({limit : "30mb", extended : true}));
connectDB() ; 

app.use('/' , authRoute); 
app.use('/user' , userRoute);
app.use('/order' , orderRoute);  



app.listen(process.env.PORT); 