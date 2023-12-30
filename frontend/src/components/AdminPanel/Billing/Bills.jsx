import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

const Bills= ({ order }) => {
  const componentRef = useRef();

  return (
    <div style={{marginLeft:'20%',color:'black'}}>
      <div style={{marginLeft:'20%',fontSize:'3vw',fontWeight:'bolder'}}>Order Details</div>
      <p style={{color:'green',fontSize:'1.8vw',fontWeight:"bolder"}}>Tag ID: {order._id}</p>
      <p>User Name: {order.name}</p>
      <p>Pickup Date: {order.PickUpDate}</p>
      <p>Services Used: {order.Service}</p>
      <p>Payment : {order.PaymentMode}</p>
      <p>Price:  Rs. {order.price}</p>

      <ReactToPrint
        trigger={() => <button style={{width:'100%',height:'3vw',borderRadius:'.6vw',backgroundColor:"blue",color:'white',fontSize:"2vw",marginLeft:'-12%',display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center'}}>PRINT BILL</button>}
        content={() => componentRef.current}
      />

      <div style={{ display: 'none' }}>
        <div ref={componentRef}>
    <div style={{color:"black",fontSize:"5vw",display:'flex',textAlign:'center',justifyContent:"center",fontWeight:'bolder',textDecoration:'underline',marginTop:"10%"}}>LAUNDRY BILL</div>

    <table style={{color:'black',marginTop:"10%"}}>
        <tr>
            <th colSpan={2} style={{color:'black'}}>ORDER/BILLING DETAILS</th>
        </tr>
        <tr>
            <td>OREDR ID</td>
            <td>{order._id}</td>
        </tr>
        <tr>
            <td>CUSTOMER NAME</td>
            <td>{order.name}</td>
        </tr>
        <tr>
            <td>PICK UP DATE</td>
            <td>{order.PickUpDate}</td>
        </tr>
        <tr>
            <td>PICK UP TIME</td>
            <td>{order.PickUpTime}</td>
        </tr>
        <tr>
            <td>SERVICES USED</td>
            <td>{order.Service}</td>
        </tr>
        <tr>
            <td>TOTAL PRICE</td>
            <td>Rs. {order.price}</td>
        </tr>
        <tr>
            <td>PAYMENT TYPE</td>
            <td>{order.PaymentMode}</td>
        </tr>

    </table>
    <div >
    <img src="https://stoffcare.in/static/media/logo2.b37baa9a9ccd987dbd9b.png" alt="" className='logo' style={{height:'8vw',width:'30%',marginLeft:'65%',marginTop:"55%"}}/>
    </div>
          {/* <h2>Order Details</h2>
          <p>Tag ID: {order._id}</p>
          <p>User Name: {order.name}</p>
          <p>Pickup Date: {order.PickUpDate}</p>
          <p>Services Used: {order.Service}</p>
          <p>Price: {order.price}</p> */}
        </div>
      </div>
    </div>
  );
};

export default Bills;
