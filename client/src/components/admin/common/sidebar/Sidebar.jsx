import React from 'react';
import { Link } from 'react-router-dom';
import "./sidebar.css"
const Sidebar = () => {
    const logouthandle = (e) => {
        e.preventDefault();
        alert("Logout Successfully")
    }
    return (
        <>
            <div style={{height:"100vh", overflowY:"scroll"}} className="side-navbar active-nav d-flex justify-content-between flex-wrap flex-column" id="sidebar">
                <ul className="nav flex-column text-white w-100 ">
                    <a href="#" className="nav-link h6 text-white my-2">
                        Store Name
                    </a>
                    <Link to="/" className="nav-link">
                        <i className="bx bx-home text-white"></i>
                        <span className="mx-2 text-white">Home</span>
                    </Link>
                   
                    <Link to="/admin/user" className="nav-link">
                        <i className="bx bx-user-check text-white"></i>
                        <span className="mx-2 text-white">User</span>
                    </Link>
                    <Link to="/admin/service" className="nav-link">
                        <i className="bx bx-body text-white"></i>
                        <span className="mx-2 text-white">Service</span>
                    </Link>
                    <Link to="/admin/category" className="nav-link">
                        <i className="bx bx-user-check text-white"></i>
                        <span className="mx-2 text-white">Category</span>
                    </Link>
                    <Link to="/admin/review" className="nav-link">
                        <i className="bx bx-user-check text-white"></i>
                        <span className="mx-2 text-white">Review</span>
                    </Link>
                    <Link to="/admin/gallery" className="nav-link">
                        <i className="bx bx-user-check text-white"></i>
                        <span className="mx-2 text-white">Gallery</span>
                    </Link>           
                    <Link to="/admin/category-two" className="nav-link">
                        <i className="bx bx-user-check text-white"></i>
                        <span className="mx-2 text-white">Category Two</span>
                    </Link>           
                </ul>

                {/* <span href="#" className="nav-link h4 w-100 mb-5">
                    <a href=""><i className="bx bxl-instagram-alt text-white"></i></a>
                    <a href=""><i className="bx bxl-twitter px-2 text-white"></i></a>
                    <a href=""><i className="bx bxl-facebook text-white"></i></a>
                </span> */}
            </div>


        </>
    )
}

export default Sidebar