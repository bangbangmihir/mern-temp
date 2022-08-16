import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../config';
import Sidebar from '../common/sidebar/Sidebar';
import { Link } from 'react-router-dom';
import { AiFillDelete } from "react-icons/ai";

const GalleryDashboard = () => {
    const [gallery, setgallery] = useState()
    const [del, setdel] = useState()

    useEffect(() => {
        getgallery();
    }, [!del])

    const getgallery = async () => {
        try {
            const { data } = await axiosInstance.get("/api/gallery/")
            console.log(data)
            setgallery(data)
        } catch (error) {
            console.log(error)
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


    const deleteimage = async (id) => {
        var answer = window.confirm("Are you sure To delete?");
        if (answer) {
            await axiosInstance.delete(`/api/gallery/${id}`, {
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
                <h3 className="text-dark p-3 ">ADMIN REVIEW DASHBOARD 💻 📱
                </h3>

                <div className="row m-2">
                    <div className="col-md-9"></div>
                    <div className="col-md-3 btn btn-secondary  mx-5"><Link to="/admin/addimage" className="text-white nav-link">Add New Image</Link></div>
                </div>

                <div className="row">
                    <div className="col-md-2">Image</div>

                    <div className="col-md-2 btn btn-secondary ">EXTRA OPTIONS</div>
                </div>



                {
                    !gallery ? <div className='row d-flex justify-content-center position-relative top-50 mt-5 ' style={{ height: "100vh" }}>
                        <div className="col-md-8 text center position-absolute top-40 start-50">
                            <div class="spinner-border text-dark " role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div> : gallery.length === 0 ? <>
                        <div className="row d-flex justify-content-center mt-5">
                            <div className="col-md-8 text-center">
                                <h4>No Image Available</h4>
                            </div>
                        </div>
                    </> :
                        gallery && gallery.map((gallery) => (
                            <>
                                <div className="row">
                                    <div className="col-md-3 ">
                                        <img src={`http://localhost:7000/images/gallery/${gallery.Image}`} alt="" height={100} width={100} />
                                    </div>
                                    <div className="col-md-3">
                                        <div className="row">
                                            <div className="col-md-4 ">
                                                <AiFillDelete color='black' size={25} onClick={() =>
                                                    deleteimage(gallery._id)} />
                                            </div>
                                            {/* <div className="col-md-4">
                                                <Link className="col-md-1" to={`/admin/review/${gallery._id}`} ><AiFillEdit size={25} />  </Link>
                                            </div> */}
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

export default GalleryDashboard