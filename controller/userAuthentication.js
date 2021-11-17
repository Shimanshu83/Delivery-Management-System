const jwt = require('jsonwebtoken');

const User = require('../models/userModel')
const {emailValidator}  = require('../util/validate')
const {validPassword} = require('../util/passwordUtils')

const userAuthentication = async (req , res , next ) => {
    const { email , password }  = req.body ;
    
    if(!(typeof email === 'string' && typeof password === 'string')){
        return res.status(400).send({err : "All fields are mendatory"})
    }
    else if(!emailValidator(email)){
        return res.status(400).send({err : "enter valid email"});
    }

    const user = await User.findOne({email : email });

    if(!user){
        return res.status(401).send({err : "email does not exist"});
    }

    const isValid = validPassword(password , user.password) ; 

    if(!(isValid)){
        return res.status(401).send({err : "wrong password"})
    }

    const payload = {
        id : user._id,
        role : user.role 
    }
    
    try {
        const token = jwt.sign(payload , process.env.ACCESS_TOKEN_SECRET , {expiresIn : `${60*60*24*2}s`});

        return res.status(200).json({sucess : true , result : user , token : token});
        
    } catch (error) {
        return res.status(500).json({message : "something went wrong"}) ; 
    }

    
}

module.exports = userAuthentication ;