const router = require('express').Router() ;

const isAuth = require('../middleware/isAuth') ;
const isAdmin = require('../middleware/isAdmin') ;
const initialRegisterCheck = require('../controller/initialRegisterCheck') ;
const {addUser, deleteUser} = require('../controller/user') ;


router.post('/',isAuth, isAdmin, initialRegisterCheck, addUser) ; 
router.delete('/:userId',isAuth, isAdmin,deleteUser) ; 

module.exports = router;