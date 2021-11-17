const User = require('../models/userModel');
const {genPassword} = require('../util/passwordUtils')



const addUser = async (req, res) => {
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
                res.send({
                    success : true, 
                    result : user
                }) 
                
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


const deleteUser = async (req, res) => {
    const userId = req.params.userId ; 

    try {
 
        const user = await User.findByIdAndDelete(userId) ;
        return res.status(201).send({
            success : true ,
            msg : ` user ${user.name} with ${user.role} is deleted` 

        }
        )
 
    } catch (error) {
        return res.status(400).send({err : "something went wrong"}) ;        
 
    }
}


module.exports = {
    addUser,
    deleteUser
}