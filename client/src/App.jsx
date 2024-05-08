import { useState } from 'react'
import './App.css'

function App() {


  const testPayment = async (event) => {

    const amount = 500;
    const currency = 'INR';
    const receiptId = '963258741';


    const response = await fetch('http://localhost:5000/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId
      })
    })
    const order = await response.json();

    console.log('order', order);

    var option = {
      key: "",
      amount,
      currency,
      name: "Tanveer Khan",
      description: "Test Transaction",
      image:"https://cashfreelogo.cashfree.com/website/landings/instant-settlements/payment-done.png",
      order_id: order.id,
      handler: async function (response){
        alert("Payment Successfull");

      },
      prefill: {
        name: "Tanveer Khan",
        email: "khantanveer6077@gmail.com",
        contact: "6394826676",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    }
    var rzp1 = new Razorpay(option);
      rzp1.on("payment.failed", function(response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      })

      rzp1.open();
      event.preventDefault();




  }








  return (
    <>
      <div className='product'>
        <h1>Razorpay Payment Getway</h1>
        <button className='button ' onClick={testPayment}>
          Pay Now
        </button>
      </div>


    </>
  )
}

export default App
