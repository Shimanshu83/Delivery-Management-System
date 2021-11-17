
const isAdmin = (req , res ,next) => {
    if(req.user.role === 'Admin'){
        console.log('working isAdmin') ; 
        next();
    }
    else {
        res.status(403).json({err : "admin can only allowed to access this route"})
    }
}

module.exports = isAdmin ; 