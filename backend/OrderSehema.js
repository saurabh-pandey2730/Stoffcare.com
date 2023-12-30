const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const orderData=new Schema({

    userId:{
        type:String,
    },
    name:{
        type:String
    },
    Service:  {
        type:String,
    },
    PickUpDate: {
        type:String,
    },
    PickUpTime: {
        type:String,
    },
    Address:  {
        type:{
            type:String
        },
        houseNo:{
            type:String
        },
        street:{
            type:String
        },
        landmark:{
            type:String
        },
        city:{
            type:String
        },
        state:{
             type:String
        },
        postalcode:{
            type:String
        }
    },
    PaymentMode: {
        type:String,
    },
    price:{
        type:Number
    }
  
   })
module.exports=mongoose.model('Order',orderData);