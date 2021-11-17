const Order = require('../models/orderModel') ; 
const User = require('../models/userModel') ; 

const getAllOrder = async (req , res ) => {

    if(!(req.user.role === 'Admin' || req.user.role === 'Manager')){

        res.status(403).send('you are not authorized to access this url') ;
    }

    try {
        
        var orders = await Order.find() ;
        return res.status(200).json({
            success : true ,
            result : orders
        }) 

    } catch (error) {

        console.log(error) ;
        return res.status(500).json({err : 'server error'}) 
        
    }


}

const createOrder = async (req , res) => {
const { name , uri , amount  } = req.body ; 

    try {
        const alreadyExist = await Order.findOne({uri : uri}) ;
        
        if (alreadyExist){
            return  res.status(401).send("unique identifier of order is already exist try different uri");
        }
        else {

            var order = new Order({
                name : name ,
                uri : uri, 
                amount : amount
            })

        }
        try{
            var newOrder = await order.save() ;
            return res.status(200).json(  {success : true , result : newOrder} );

        }
        catch(error){

            console.log(error) ; 
            return res.status(500).json({
                err : "error occured"
            })
        }
    }
    catch (err) {

        console.log(error) ; 
            return res.status(500).json({
                err : "error occured"
            })

    }
    
}

const deleteOrder = async (req , res ) => {
    const orderId = req.params.orderId ;

    try {

        var deletedOrder = await Order.findByIdAndDelete(orderId);
        return res.status(200).json(
            {
                sucess : true ,
                msg : `${deletedOrder.name} product is deleted`
            }
        ) 


    } catch (error) {
        console.log(error) ; 
        return res.status(500).json({
            err : "error occured"
        })

    }
}

const assignOrder = async (req, res) => {
    if(!(req.user.role === 'Admin' || req.user.role === 'Manager')){

        res.status(403).send('you are not authorized to access this url') ;
    }
    const { orderId , deliveryPersonId }  = req.params  ;
     
    try {
     
    const deliveryPerson = await User.findById(deliveryPersonId);
    const order = await Order.findById(orderId); 
    
    const index =  deliveryPerson.assignOrder.findIndex((oId) => oId === String(orderId)) ; 

    if(index === -1) {
        deliveryPerson.assignOrder.push(orderId);
        order.assignedTo = deliveryPersonId ; 
    }
    else {
        deliveryPerson.assignOrder = deliveryPerson.assignOrder.filter( (Oid) => Oid !== String(orderId) )
        order.assignedTo = null ;
    }

    const updatedDeliveryPerson = await User.findByIdAndUpdate(deliveryPersonId , deliveryPerson,{new : true})
    const updateOrder = await Order.findByIdAndUpdate(orderId , order , {new : true}) ; 
    return res.json({
        updatedDeliveryPerson , 
        updateOrder
    }) ; 

    } catch (error) {

        console.log(error) ;  
        return res.status(500).json({
            err : "error occured"
        }) 
    }

}


const changeOrderStatus = async (req, res) => {
    if(!(req.user.role === 'Admin' || req.user.role === 'Manager' || req.user.role === 'DeliveryPerson')){

        res.status(403).send('you are not authorized to access this url') ;
    }
    const {orderId , orderStatus } = req.params ;      
    try {
        var order = await Order.findById(orderId);
        order.status = orderStatus;
        const updateOrder = await Order.findByIdAndUpdate(orderId, order, {new : true}) ;
        console.log(updateOrder)
        res.status(200).json({
            success : true,
            result : updateOrder
        }) ;  

    } catch (error) {
        console.log(error) ;  
        return res.status(500).json({
            err : "error occured"
        }) 
        
    }
}


const assignedOrders = async (req, res) => {
    if(!(req.user.role === 'Admin' || req.user.role === 'Manager'|| req.user.role === 'DeliveryPerson')){

        res.status(403).send('you are not authorized to access this url') ;
    }
    const deliveryPersonId = req.params.deliveryPersonId ; 
    try {
        const deliveryPerson = await User.findById(deliveryPersonId);
        const result = await Order.find({ '_id': { $in: deliveryPerson.assignOrder } });
        return res.status(200).json({
            success: true,     
            result : result   
        }); 

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            err : "error occured"
        }) 
    }
}


module.exports = {getAllOrder , createOrder , deleteOrder , assignOrder , changeOrderStatus , assignedOrders} 