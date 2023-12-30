const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const LoginSchema=new Schema({

    userId:{
        type:String,
    },
    name:{
        type:String
    },
    Email:  {
        type:String,
    },
   
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
module.exports=mongoose.model('login',LoginSchema);