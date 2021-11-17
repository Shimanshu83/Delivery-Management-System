const router = require('express').Router() ;
const register = require('../controller/register') ;
const initialRegisterCheck = require('../controller/initialRegisterCheck') ;
const userAuthentication = require('../controller/userAuthentication');

router.post('/register' , initialRegisterCheck , register ); 

router.post('/login' , userAuthentication); 

module.exports = router;
