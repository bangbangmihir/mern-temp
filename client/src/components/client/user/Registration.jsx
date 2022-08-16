import React,{useState} from 'react';
import { axiosInstance } from '../../../config';
import { useNavigate } from 'react-router-dom';


const Registration = () => {

    const navigate = useNavigate();

    const [firstname, setfirstname] = useState();
    const [lastname, setlastname] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [number, setNumber] = useState();
    const [image, setimage] = useState();


    const data = {firstname,lastname,username,password,email,number,image}

    console.log("data",data)



    const handleUserdataSubmit = async (e) => {
        e.preventDefault();

        if(firstname== undefined && lastname == undefined && username == undefined && password == undefined && email == undefined && number == undefined && image == undefined){
            alert("Fill All the input field")
            return
        }
       
        const formdata = new FormData();
        formdata.append("FirstName", firstname)
        formdata.append("LastName", lastname)
        formdata.append("UserName", username)
        formdata.append("Email", email)
        formdata.append("Number", number)
        formdata.append("Password", password)
        formdata.append("userimg", image)

        try {
            const { data } = await axiosInstance.post("/api/user/", formdata, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            alert("User Added Successfully")
            navigate("/login");
        } catch (error) {
            alert(error.response.data)
        }
    }


    return (
        <>
            <div className='row justify-content-center align-items-center mt-5 gx-0'>
                <div className='col-md-8 col-sm-8'>
                    <div class="input-group flex-nowrap m-3">
                        <span class="input-group-text" id="addon-wrapping">First Name</span>
                        <input type="text" class="form-control" placeholder="FirstName" aria-label="Username" aria-describedby="addon-wrapping" value={firstname} onChange={e => setfirstname(e.target.value)} />
                    </div>
                    <div class="input-group flex-nowrap m-3">
                        <span class="input-group-text" id="addon-wrapping">Last Name</span>
                        <input type="text" class="form-control" placeholder="Last Name" aria-label="Username" aria-describedby="addon-wrapping" value={lastname} onChange={e => setlastname(e.target.value)} />
                    </div>
                    <div class="input-group flex-nowrap m-3">
                        <span class="input-group-text" id="addon-wrapping">User Name</span>
                        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" value={username} onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div class="input-group flex-nowrap m-3">
                        <span class="input-group-text" id="addon-wrapping">Email</span>
                        <input type="text" class="form-control" placeholder="Email" aria-label="email" aria-describedby="addon-wrapping" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div class="input-group flex-nowrap m-3">
                        <span class="input-group-text" id="addon-wrapping">Number</span>
                        <input type="text" class="form-control" placeholder="Username" aria-label="Number" aria-describedby="addon-wrapping" value={number} onChange={e => setNumber(e.target.value)} />
                    </div>
                    <div class="input-group flex-nowrap m-3">
                        <span class="input-group-text" id="addon-wrapping">Password</span>
                        <input type="text" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div class="input-group flex-nowrap m-3">
                        <span class="input-group-text" id="addon-wrapping">Image</span>
                        <input type="file" class="form-control" placeholder="Username" aria-describedby="addon-wrapping" onChange={e => setimage(e.target.files[0])} />
                    </div>
                    <div class="input-group flex-nowrap m-3 d-flex justify-content-center ">
                        <button type="button" class="btn btn-primary" onClick={handleUserdataSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Registration