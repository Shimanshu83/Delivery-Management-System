const router = require('express').Router() ;
const isAdmin = require('../middleware/isAdmin'); 
const isAuth = require('../middleware/isAuth');
const {getAllOrder , createOrder , deleteOrder , assignOrder , changeOrderStatus , assignedOrders} = require('../controller/order') ; 

// get all orders (role -> Manager Admin)
router.get('/' ,isAuth ,  getAllOrder); 

//create a single order 
router.post('/' , isAuth , isAdmin , createOrder) ; 

//delte a order
router.delete('/:orderId' , isAuth , isAdmin , deleteOrder) ;

//assigning order to delivery person and order (role -> Manager Admin) 
router.get('/assign/:orderId&:deliveryPersonId',isAuth , assignOrder) ;

// change the order status  (role -> Manager Admin DeliveryPerson ) 
router.get('/status/:orderId&:orderStatus', isAuth , changeOrderStatus) ;

//get all order's of perticule DeliveryPerson 
router.get('/assignedOrders/:deliveryPersonId', isAuth ,assignedOrders ); 

module.exports = router;