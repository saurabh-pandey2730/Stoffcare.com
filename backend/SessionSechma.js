const { ObjectId } = require('mongodb');
const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const SessionSchema=new Schema({

    name:{
      type:String
    },

    userId:{
        type:ObjectId,
    },
    isLoggedIn:{
        type:Boolean,
        default:false
        
    },
    Email:{
        type:String
    }
   
    // Phone: {
    //     type:String,
    // },
    // Admin:  {
    //     type:String,
    // },
    // Address: {
    //     type:String,
    // }
  
   })
module.exports=mongoose.model('SessionSchema',SessionSchema);