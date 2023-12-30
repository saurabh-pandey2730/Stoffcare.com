import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

const OrderTag = ({ order }) => {
  const componentRef = useRef();

  return (
      
    <div style={{width:'95%',height:"10vw",boxShadow:'2px 2px 10px gray',padding:'2%',borderRadius:'.6vw',marginBottom:"2%",marginLeft:'2.5%'}}>
      <p style={{color:'green'}}>Order ID: {order._id}</p>
      <p>Customer Name: {order.name}</p>
      

      <ReactToPrint
        trigger={() => <button style={{width:'100%',height:'2vw',borderRadius:'.3vw',backgroundColor:"blue",color:'white',fontSize:"1.3vw",display:'flex',textAlign:'center',alignItems:'center',justifyContent:'center'}}>PRINT ORDER TAG</button>}
        content={() => componentRef.current}
      />

      <div style={{ display: 'none' }}>
        <div ref={componentRef} style={{width:'1.5in',height:'2in',border:'1px solid black',textAlign:'center',color:'black'}}>
        
          <p> {(order._id).substr(19,25)}</p>
          <p> {order.name}</p>
          <p>{order.PickUpDate}</p>
          <p> {order.Service}</p>
          <p>Rs. {order.price}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderTag;