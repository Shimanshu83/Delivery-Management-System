const jwt = require('jsonwebtoken');

const isAuthenticated = (req , res , next ) => {
    try {
        const token = req.headers.authorization.split(" ")[1] ;
        
        if(!token){   
            return res.status(403).send({err : "user not authenticated "})
        }
        
        let decodedData ; 
        
        try {
            
            decodedData = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET )  ;
            
         
            req.user = decodedData ;
            console.log(req.user) ;  
            next() ;

        } catch (error) {
            console.log(error) ;
            res.status(403).send({err : "user not authenticated custom"})
        }
            
    } catch (error) {
        return res.status(403).send({err : "authenticate first"}) ; 
    }
    


}

module.exports = isAuthenticated ;  