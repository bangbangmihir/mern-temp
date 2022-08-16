import React, { useState } from 'react';
import Sidebar from '../common/sidebar/Sidebar';
import { axiosInstance } from '../../../config';
import { useNavigate } from 'react-router-dom';

const Adduser = ({ }) => {

    const navigate = useNavigate();


    const [firstname, setfirstname] = useState();
    const [lastname, setlastname] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [number, setNumber] = useState();
    const [image, setimage] = useState();


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
            navigate("/")
        } catch (error) {
            alert(error.response.data)
            // console.log("gffgfhg",error.response.data)
        }



        // navigate("/admin/user");
    }



    const togglehandle = (e) => {
        e.persist();
        var menu_btn = document.querySelector("#menu-btn");
        var sidebar = document.querySelector("#sidebar");
        var container = document.querySelector(".my-container");
        sidebar.classList.toggle("active-nav")
        container.classList.toggle("active-cont");
    }

    return (

        <>
            <Sidebar />

            <div className="p-1 my-container active-cont">
                {/* <!-- Top Nav --> */}
                <nav className="navbar top-navbar navbar-light bg-light px-5">
                    <a className="btn border-0" id="menu-btn" onClick={togglehandle}><i className="bx bx-menu"></i></a>
                </nav>
                {/* <!--End Top Nav --> */}
                <h3 className="text-dark p-3">ADMIN ADD USER 💻 📱
                </h3>



                <div className="row mx-2 " style={{ backgroundColor: "#FDF8DB" }}>


                    <div className="toogler"><h3>Add User</h3></div>

                    <form onSubmit={handleUserdataSubmit}>
                        <div className="col-md-6 align-items-center">
                            <label>FirstName</label>
                            <input className="form-control " type="text" value={firstname} onChange={e => setfirstname(e.target.value)} placeholder="FirstName" />
                        </div>
                        <div className="col-md-6">
                            <label>LastName</label>
                            <input className="form-control" type="text" value={lastname} onChange={e => setlastname(e.target.value)} placeholder="LastName" />
                        </div>
                        <div className="col-md-6">
                            <label>UserName</label>
                            <input className="form-control" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="UserName" />
                        </div>
                        <div className="col-md-6">
                            <label>Number</label>
                            <input className="form-control" type="number" value={number} onChange={e => setNumber(e.target.value)} placeholder="Ph. Number(maximum length should be 10) " />
                        </div>
                        <div className="col-md-6">
                            <label>Email</label>
                            <input className="form-control" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder=" Enter Email" />
                        </div>
                        <div className="col-md-6">
                            <label>PassWord</label>
                            <input className="form-control" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password" />
                        </div>
                        <div className="col-md-6">
                            <label>Image</label>
                            <input className="form-control" type="file" onChange={e => setimage(e.target.files[0])} placeholder="Enter Password" />
                        </div>

                        <div className="col-md-6" style={{ padding: "5px" }}>
                            <div className="d-flex flex-row">
                                <button className="btn btn-success" >Submit</button>
                            </div>
                        </div>
                    </form>

                </div>

            </div>


        </>
    )
}

export default Adduser