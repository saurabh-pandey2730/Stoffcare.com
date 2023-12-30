import React from 'react'

import { useState,useEffect } from 'react';

import Sidebar from './Sidebar';
// import './orders.css'
// import './Admin.css'

const Billing = () => {

    const [orders,setOrders]=useState([]);
    const fetchOrders= async ()=>{
        const response= await fetch(`http://localhost:3007/order-billing` ,{
            method:"GET",
            headers:{
                'content-type':'application/json'
            }
        });
        let data= await response.json();
        setOrders(data);
        console.log(orders);
    }
    useEffect(()=>{
       fetchOrders()
    })
  return <>
  <div style={{position:'absolute'}}>
   <Sidebar/>
  </div>
  <div className='userbox' style={{marginLeft:'25%',marginTop:'2%',backgroundColor:'white'}}>
  <div className='history'>ORDERS</div>
      {orders.map(order=>{
          return <>
           <div key={order._id} className='orderbox'>
           <div>
            <table style={{color:'black',marginTop:'7%'}}>
        <tr>
            {/* <th colSpan={2} style={{color:'black',display:"flex",textAlign:'center',alignItems:"center"}}></th> */}
        </tr>
        <tr>
            <td >OREDR ID</td>
            <td >{order._id}</td>
        </tr>
        <tr>
            <td>CUSTOMER NAME</td>
            <td >{order.name}</td>
        </tr>
        <tr>
            <td>PICK UP DATE</td>
            <td >{order.PickUpDate}</td>
        </tr>
        <tr>
            <td>PICK UP TIME</td>
            <td >{order.PickUpTime}</td>
        </tr>
        <tr>
            <td>SERVICES USED</td>
            <td >{order.Service}</td>
        </tr>
        <tr>
            <td>TOTAL PRICE</td>
            <td >Rs. {order.price}</td>
        </tr>
        <tr>
            <td>PAYMENT TYPE</td>
            <td >{order.PaymentMode}</td>
        </tr>

    </table>
              
           {/* <table>
      <tbody>
          <tr>
              <td className='td'>Order Id</td>
              <td className='orderdata'>{order._id}</td>
          </tr>
          <tr>
              <td  className='td'>Service</td>
              <td className='orderdata'>{order.Service}</td>
          </tr>
          <tr>
              <td  className='td'>Pick Up Date</td>
              <td className='orderdata'>{order.PickUpDate}</td>
          </tr>
          <tr>
              <td  className='td'>Pick Up Time</td>
              <td className='orderdata'>{order.PickUpTime}</td>
          </tr>
          <tr>
              <td  className='td'>Payment Status</td>
              <td className='orderdata'>{order.PaymentMode?'Pending':'Payment Completed'}</td>
          </tr>
          <tr>
              <td  className='td'>Price</td>
              <td className='orderdata'>{order.price}</td>
          </tr>
      </tbody>
  </table> */}
           </div>
           </div>
           
          </>
      })}
  </div>
  </>
}

export default Billing
