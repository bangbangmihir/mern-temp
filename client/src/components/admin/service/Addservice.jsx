import React, { useState, useEffect } from 'react';
import Sidebar from '../common/sidebar/Sidebar'
import { axiosInstance } from '../../../config'
import { useNavigate } from 'react-router-dom';

const Addservice = () => {
    const navigate = useNavigate();
    const [name, setname] = useState()
    const [type, settype] = useState()
    const [price, setprice] = useState()
    const [heading, setheading] = useState()
    const [desc, setdesc] = useState()
    const [img, setimg] = useState()

    const [cate, setcate] = useState()
    const [value, setvalue] = useState()
    


    console.log("cattaea",value)



    useEffect(() => {
        getcategory()
    }, [])


    const getcategory = async () => {
        try {
            const { data } = await axiosInstance.get(`/api/category`)
            setcate(data)
        } catch (error) {
            console.log("error", error)
            alert(error.response.data)
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


    const handleUserdataSubmit = async (e) => {
        e.preventDefault();
        if (name == undefined && type == undefined && price == undefined && heading == undefined && desc == undefined && img == undefined) {
            alert("Please fill All the input field")
            return
        }
        try {
            const formdata = new FormData();
            formdata.append("ServiceName", name)
            formdata.append("serviceType", value)
            formdata.append("ServicePrice", price)
            formdata.append("ServiceHeading", heading)
            formdata.append("ServiceDescription", desc)
            formdata.append("serviceimg", img)

            const { data } = await axiosInstance.post("/api/service", formdata, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            // console.log(data)

            alert(data.message)
            navigate("/admin/service")
        } catch (error) {
            console.log("error", error.message)
        }

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
                <h3 className="text-dark p-3">ADMIN ADD SERVICE 💻 📱
                </h3>



                <div className="row mx-2 " style={{ backgroundColor: "#FDF8DB" }}>


                    <form onSubmit={handleUserdataSubmit}>
                        <div className="col-md-6 align-items-center">
                            <label>Service Name</label>
                            <input className="form-control " type="text" value={name} onChange={e => setname(e.target.value)} placeholder="Service Name" />
                        </div>
                        <div className="col-md-6">
                            <label>Service Type</label>
                            <select class="form-select form-select-sm" aria-label=".form-select-sm example" onChange={(e)=>setvalue(e.target.value)}>
                                {
                                    cate && cate.map((category)=>(
                                        <>
                                         <option value={category._id}>{category.categoryName}</option>
                                        </>
                                    ))
                                }
                                {/* <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option> */}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label>Service Price</label>
                            <input className="form-control" type="text" value={price} onChange={e => setprice(e.target.value)} placeholder="Service Price" />
                        </div>
                        <div className="col-md-6">
                            <label>Heading</label>
                            <input className="form-control" type="text" value={heading} onChange={e => setheading(e.target.value)} placeholder="Service Heading" />
                        </div>
                        <div className="col-md-6">
                            <label>Description</label>
                            <input className="form-control" type="text" value={desc} onChange={e => setdesc(e.target.value)} placeholder="Service Description" />
                        </div>
                        <div className="col-md-6">
                            <label>Image</label>
                            <input className="form-control" type="file" onChange={e => setimg(e.target.files[0])} />
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

export default Addservice