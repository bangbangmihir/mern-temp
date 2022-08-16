import React, { useState } from 'react';
import { axiosInstance } from '../../../config';

const Contact = () => {
  const [firstname, setfirstname] = useState();
  const [lastname, setlastname] = useState();
  const [email, setEmail] = useState();
  const [number, setNumber] = useState();
  const [message, setmessage] = useState();

  console.log(firstname, lastname, email, number, message)

  const sendMessage = async () => {
    try {
      const { data } = await axiosInstance.post("/api/user/mail/send", {
        "email": email, //Give email of the user where you want to send mail
        "message": `
        Name:${firstname} ${lastname} , \n
        Mob. Number:${number} , \n
        Email:${email} , \n
        Message:${message}
           `,
        "subject": "Contact Us Form"
      })
      console.log("data", data)
    } catch (error) {
      console.log("error", error)
    }

  }

  return (
    <div className="row mt-5 justify-content-center">
      <h1 className='text-center mt-2'>Contact Us</h1>
      <div class="input-group flex-nowrap m-3">
        <span class="input-group-text" id="addon-wrapping">First Name</span>
        <input type="text" class="form-control" placeholder="FirstName" aria-label="Username" aria-describedby="addon-wrapping" value={firstname} onChange={e => setfirstname(e.target.value)} />
      </div>

      <div class="input-group flex-nowrap m-3">
        <span class="input-group-text" id="addon-wrapping">Last Name</span>
        <input type="text" class="form-control" placeholder="Last Name" aria-label="Username" aria-describedby="addon-wrapping" value={lastname} onChange={e => setlastname(e.target.value)} />
      </div>

      <div class="input-group flex-nowrap m-3">
        <span class="input-group-text" id="addon-wrapping">Mob. Number</span>
        <input type="number" class="form-control" placeholder="Mob Number" aria-label="Username" aria-describedby="addon-wrapping" value={number} onChange={e => setNumber(e.target.value)} />
      </div>

      <div class="input-group flex-nowrap m-3">
        <span class="input-group-text" id="addon-wrapping">Email</span>
        <input type="email" class="form-control" placeholder="Email" aria-label="Username" aria-describedby="addon-wrapping" value={email} onChange={e => setEmail(e.target.value)} />
      </div>

      <div class="input-group flex-nowrap m-3">
        <span class="input-group-text" id="addon-wrapping">message</span>
        <input type="text" class="form-control" placeholder="Message" aria-label="Message" aria-describedby="addon-wrapping" value={message} onChange={e => setmessage(e.target.value)} />
      </div>

      <div class="input-group flex-nowrap m-3 d-flex justify-content-center ">
        <button type="button" class="btn btn-primary" onClick={sendMessage}>Submit</button>
      </div>


    </div>
  )
}

export default Contact