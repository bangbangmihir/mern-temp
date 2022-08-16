import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../config';
import Sidebar from '../common/sidebar/Sidebar';
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible, AiFillDelete, AiFillEdit } from "react-icons/ai";




const CategoryTwo = () => {
    const [category, setcategory] = useState()
    const [del, setdel] = useState(false)


    useEffect(() => {
        getcategory()
    }, [!del])


    const getcategory = async () => {
        try {
            const { data } = await axiosInstance.get("/api/categorytwo");
            setcategory(data)
            console.log("data", data)
        } catch (error) {
            console.log("error", error.response)
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


    const deletecategory = async (id) => {
        var answer = window.confirm("Are you sure To delete?");
        if (answer) {
            await axiosInstance.delete(`/api/categorytwo/${id}`, {
                headers: {
                    'token': localStorage.getItem("token")
                },
            });

            alert("deleted");

            setTimeout(() => {
                setdel(!del);
            }, 100);
        }
    }


    return (
        <>
            <Sidebar />


            <div className="p-1 my-container active-cont overflow-hidden">
                {/* <!-- Top Nav --> */}
                <nav className="navbar top-navbar navbar-light bg-light px-5">
                    <a className="btn border-0" id="menu-btn" onClick={togglehandle}><i className="bx bx-menu"></i></a>
                </nav>

                {/* <!--End Top Nav --> */}
                <h3 className="text-dark p-3">ADMIN CATEGORY TWO DASHBOARD 💻 📱
                </h3>

                <div className="row ">
                    <div className="col-md-9"></div>
                    <div className="col-md-3 btn btn-secondary  mx-5"><Link to="/admin/addcategory-two" className="text-white nav-link">Add New category</Link></div>
                </div>

                <div className="row mt-4">
                    <div className="col-md-3">Category Name</div>

                    <div className="col-md-3 btn btn-secondary">EXTRA OPTIONS</div>
                </div>

                {
                    !category ? <div className='row d-flex justify-content-center position-relative top-50 mt-5 ' style={{ height: "100vh" }}>
                        <div className="col-md-8 text center position-absolute top-40 start-50">
                            <div class="spinner-border text-dark " role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div> : category.length === 0 ? <>
                        <div className="row d-flex justify-content-center mt-5">
                            <div className="col-md-8 text-center">
                                <h4>No category Available</h4>
                            </div>
                        </div>
                    </> :

                        category && category.map((category) => (
                            <>
                                <div className="row ">
                                    <div className="col-md-3 ">{category.categoryNameTwo}</div>
                                    
                                    <div className="col-md-3">
                                        <div className="row">
                                            {/* <div className="col-md-4">
                                                <AiFillEye color='red' size={25} onClick={() => showdetails(category)} />
                                            </div> */}
                                            <div className="col-md-4">
                                                <AiFillDelete color='black' size={25} onClick={() =>
                                                    deletecategory(category._id)} />
                                            </div>
                                            <div className="col-md-4">
                                                <Link className="col-md-1" to={`/admin/editcategory-two/${category._id}`} ><AiFillEdit size={25}  color='blue'/>  </Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </>
                        ))
                }
            </div>

        </>
    )
}

export default CategoryTwo