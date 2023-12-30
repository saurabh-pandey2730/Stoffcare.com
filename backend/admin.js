
const express= require('express');
const app=express();
const path=require('path')
const fs=require('fs')
const cors=require('cors');

const Razorpay=require('razorpay');

const bodyParser=require('body-parser');

const Session=require('express-session');

const Order=require('./OrderSehema');

const user=require('./UserSchema');

const login=require('./LoginSchema');
const MongoDbStore=require('connect-mongodb-session')(Session);
const mongoose=require('mongoose');
const mongoUrl='';

const session=require('./SessionSechma');
const pdf=require('pdfkit');

const twilio = require('twilio');

const accountSid = 'ACe74e9a2c3266232e9f1f39377630ebc0';
const authToken = '20a93546871db638bb70a2baac390c64';
const client = new twilio(accountSid, authToken);


const Store=new MongoDbStore({
   uri:mongoUrl,
   collection:'session'
 })


//  app.use(Session({
//    secret:'My_Secret',
// resave:false,
// saveUninitialized:true,
// store:Store

// }));


app.use(bodyParser.json());

app.use(cors({
   origin:'http://localhost:3000',
   credentials:true
}));


app.use(Session({secret:'My_Secret',
resave:false,saveUninitialized:true,
store:Store,
cookie:{
  maxAge:3600000*24*14,
  logicalSessionTimeoutMinutes:3600000*24*14,
}
}));

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_C4gOH0rUPIp3zB';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'tKf1u55E1yiCyyovRLL8a9Hf';

const razorpay = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET
});

app.post('/create-order', async (req, res) => {
   try {
       const amount = req.body.amount;

       // Validate the amount before creating the order
       if (!amount || isNaN(amount) || amount <= 0) {
           return res.status(400).send({ error: 'Invalid amount' });
       }

       const options = {
           amount: amount,  // Amount in smallest currency unit (e.g., paisa)
           currency: 'INR',
           receipt: `receipt_order_${Date.now()}`,  // Unique receipt for each order
       };

       const order = await razorpay.orders.create(options);
       res.json({ order_id: order.id });
   } catch (error) {
       console.error("Error in creating order: ", error);
       res.status(500).send({ error: 'Error creating order' });
   }
});

app.post('/signup',(req,res,next)=>{
   const name=req.body.name;
     const email=req.body.email;
     const password=req.body.password;

     const userAuth=new user({
      name:name,
      Email:email,
      Password:password
     })
    return userAuth.save();
})


let SpecificUser=[];


let matched=false;

app.post('/login',(req,res,next)=>{
   const email=req.body.email;
   const password=req.body.password;

   console.log(email,password);

   user.findOne({Email:email,Password:password})
   .then(usr=>{
      if(usr){
        const sess=new session({
         name:usr.name,
         userId:usr._id,
         isLoggedIn:true,
         Email:usr.Email
        })
        return sess.save()
        .then(result=>{
         matched=true;
        });
      }
      else{
         console.log("no user found...");

      }

      // SpecificUser.push(usr);
   })
   .catch(error=>{
      console.log(error);
   })
})

app.get('/getUser/:userId',(req,res,next)=>{
   const userId=req.params.userId
    user.findById({_id:userId})
    .then(usr=>{
       res.json(usr);
    })
})



app.get('/login',(req,res,next)=>{
   session.find()
   .then(sess=>{
      res.json(sess);
   })
})

app.post('/logout/:userid',(req,res,next)=>{
     const id=req.params.userid;

   //  const usr= login.findById({userId:id});
   console.log(id);
   console.log('hello3');

      session.findOne({userId:id})
      .then(app=>{
          app.deleteOne();
          matched=false;
      })     
})

app.get('/matched',(req,res,next)=>{
   res.json({matched:matched});
})


// app.get('/login',(req,res,next)=>{
//     res.json(SpecificUser);
// })

//place order
app.get('/getuser',(req,res,next)=>{
      // user.find()
      // .then(usrs=>{
      //    res.json(usrs);
      // })
      res.json(SpecificUser);

})

app.post('/getuser',(req,res,next)=>{
   const usr=req.body.user;

   user.findOne({Email:usr.email,Password:usr.password})
   .then(usr=>{
       
       SpecificUser.push(usr);
   })
   .catch(err=>{
      console.log(err);
   })
})


app.get('/placeOrder/:userid',(req,res,next)=>{

   const id=req.params.userid;
   
   Order.find({userId:id})
   .then(orders=>{
      res.json(orders);
   })

})


app.post('/placeOrder/:userid',(req,res,next)=>{

   const orderdata=req.body;

   const order=new Order(orderdata);
   order.save()
   .then((result)=>{
      client.messages
      .create({
        body: `Order #${orderdata._id} placed by ${orderdata.name}`,
        from: '9119091222',
        to: '8572845012',
      })
      .then(message => {
        console.log(`Message sent with SID: ${message.sid}`);
        res.status(200).send('Message sent');
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Failed to send message');
      });
   }); 
})



//add address

app.post('/add/address',(req,res,next)=>{
   const address=req.body.Address;
   
})

app.get('/tag-print',(req,res,next)=>{
      Order.find()
      .then(odrs=>{
         res.json(odrs);
      })
      .catch(err=>{
         console.log(err);
      })
})

app.get('/order-billing',(req,res,next)=>{
   Order.find()
   .then(odrs=>{
      res.json(odrs);
   })
   .catch(err=>{
      console.log(err);
   })
})

app.get('/getCustomers',(req,res,next)=>{
   user.find()
   .then(customers=>{
      res.json(customers);
   })
})

app.get('/laundary-billing/:orderId',(req,res,next)=>{
          const orderid=req.params.orderId;
          Order.find({_id:orderid})
          .then(odrs=>{
            res.json(odrs);
            console.log(odrs);
          })
})

// app.post('/update/products',(req,res,next)=>{

// })



mongoose.connect(mongoUrl)
.then(result=>{
  app.listen(3007);
  console.log("connected");
})


  