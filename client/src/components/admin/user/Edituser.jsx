import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../config';
import Sidebar from '../common/sidebar/Sidebar';


const Edituser = () => {
    const { id } = useParams();
    const navigate = useNavigate()

    const [firstname, setfirstname] = useState();
    const [lastname, setlastname] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [number, setNumber] = useState();
    const [image, setimage] = useState();



    useEffect(() => {

        getuserdata()

    }, [])

    const getuserdata = async () => {
        try {
            const { data } = await axiosInstance.get(`/api/user/${id}`, {
                headers: {
                    'token': localStorage.getItem("token")
                },
            });
            setfirstname(data.FirstName)
            setlastname(data.LastName)
            setUsername(data.UserName)
            setPassword(data.Password)
            setEmail(data.Email)
            setNumber(data.Number)
            console.log("daTa", data)
        } catch (error) {
            console.log("Something Wwent Wrong")
        }
    }

    const togglehandle = (e) => {
        e.persist();
        var menu_btn = document.querySelector("#menu-btn");
        var sidebar = document.querySelector("#sidebar");
        var container = document.querySelector(".my-container");
        sidebar.classList.toggle("active-nav")
        container.classList.toggle("active-cont");
    }

    const handledataSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/api/user/${id}`, {
                "FirstName": firstname,
                "LastName": lastname,
                "UserName": username,
                "Email": email,
                "Number": number,
                // "PassWord":password
            }, {
                headers: {
                    'token': localStorage.getItem("token")
                },
            }
            )
            navigate("/")


        } catch (err) {
            console.log(err)
        }
       
    }


    return (
        <>
            <Sidebar />
            <div className="p-1 my-container active-cont">
                <nav className="navbar top-navbar navbar-light bg-light px-5">
                    <a className="btn border-0" id="menu-btn" onClick={togglehandle}><i className="bx bx-menu"></i></a>
                </nav>

                <h3 className="text-dark p-3"> ADMIN EDIT USER 💻 📱
                </h3>
                <div className="row mx-2 " style={{ backgroundColor: "#FDF8DB" }}>

                    <div className="toogler"><h3>Edit User</h3></div>

                    <form onSubmit={handledataSubmit}>
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
                            <input className="form-control" type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password" />
                        </div>
                        <div className="col-md-6">
                            <label>Image</label>
                            <input className="form-control" type="file" onChange={e => setimage(e.target.files[0])} />
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

export default Edituser