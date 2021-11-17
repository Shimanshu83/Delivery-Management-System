const User = require('../models/userModel');
const {genPassword} = require('../util/passwordUtils')



const register = async (req, res) => {
    const {name, email, role, password } = req.body;   

    try {
        const alreadyExist = await User.findOne({email: email})
        
        if(alreadyExist){

            return res.status(401).send("email already exists");
        }
        else{
            const passwordHash = genPassword(password);
            var user =  new User(
                {   
                    name : name , 
                    email : email,
                    role : role, 
                    password : passwordHash
                }
            )

            try {
        
                user = await user.save() ;
                const payload = {
                    id : user._id , 
                    role : user.role 
                }
                
                try {
                    const token = jwt.sign(payload , process.env.ACCESS_TOKEN_SECRET , {expiresIn : '100000000s'});
                
                    return res.status(200).json({result : {success : true , result : user} , token : token});
                    
                } catch (error) {
                    res.status(500).json({message : "something went wrong"}) ; 
                }
            
                
                
            
                
            } catch (error) {
                console.log(error) ; 

                if(error){
                return res.status(500).send({err : error})
            }
            }

            
        }
    } catch (error) {
        console.log(error) ; 
               return res.status(500).send({err : "some thingh went wrong "});
    }   
}
module.exports = register ; 