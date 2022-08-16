import React, { useState } from 'react';
import { axiosInstance } from '../../../config';

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();


  const handlelogin = async () => {
    try {
      const { data } = await axiosInstance.post("/api/user/login", {
        "UserName": username,
        "Password": password
      })
      if (data.token) {
        localStorage.setItem('token', data.token);
        alert("Login Successful")
      }

    } catch (error) {
      alert(error.response.data.message)
      // console.log("dd",error.response.data.message)
    }
  }


  return (
    <div className="row mt-5 gx-0">
      <div class="input-group flex-nowrap m-3">
        <span class="input-group-text" id="addon-wrapping">User Name</span>
        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div class="input-group flex-nowrap m-3">
        <span class="input-group-text" id="addon-wrapping">Password</span>
        <input type="text" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <div class="input-group flex-nowrap m-3 d-flex justify-content-center ">
        <button type="button" class="btn btn-primary" onClick={handlelogin}>Submit</button>
      </div>
    </div>
  )
}

export default Login