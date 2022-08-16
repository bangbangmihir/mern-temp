import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../config';
import Sidebar from "../common/sidebar/Sidebar";
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible, AiFillDelete, AiFillEdit } from "react-icons/ai";


const Review = () => {
    const [review, setreview] = useState()
    const [del, setdel] = useState(false)


    useEffect(() => {
        getreview()
    }, [!del])


    const togglehandle = (e) => {
        e.persist();
        var menu_btn = document.querySelector("#menu-btn");
        var sidebar = document.querySelector("#sidebar");
        var container = document.querySelector(".my-container");
        sidebar.classList.toggle("active-nav")
        container.classList.toggle("active-cont");
    }


    const deletereview = async (id) => {
        var answer = window.confirm("Are you sure To delete?");
        if (answer) {
            await axiosInstance.delete(`/api/review/${id}`, {
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


    const getreview = async () => {
        try {
            const { data } = await axiosInstance("/api/review")
            setreview(data)
        } catch (error) {
            alert(error.response.data)
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
                <h3 className="text-dark p-3">ADMIN REVIEW DASHBOARD 💻 📱
                </h3>

                <div className="row">
                    <div className="col-md-9"></div>
                    <div className="col-md-3 btn btn-secondary  mx-5"><Link to="/admin/addreview" className="text-white nav-link">Add New Review</Link></div>
                </div>

                <div className="row">
                    <div className="col-md-2">AuthorName</div>
                    <div className="col-md-2">Review</div>
                    <div className="col-md-2">AuthorImage</div>

                    <div className="col-md-2 btn btn-secondary">EXTRA OPTIONS</div>
                </div>



                {
                    !review ? <div className='row d-flex justify-content-center position-relative top-50 mt-5 ' style={{ height: "100vh" }}>
                        <div className="col-md-8 text center position-absolute top-40 start-50">
                            <div class="spinner-border text-dark " role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div> : review.length === 0 ? <>
                        <div className="row d-flex justify-content-center mt-5">
                            <div className="col-md-8 text-center">
                                <h4>No Review Available</h4>
                            </div>
                        </div>
                    </> :
                        review && review.map((review) => (
                            <>
                                <div className="row">
                                    <div className="col-md-2 ">{review.AuthorName}</div>
                                    <div className="col-md-2 ">{review.Review}</div>
                                    <div className="col-md-2 ">
                                        <img src={`http://localhost:7000/images/review/${review.AuthorImage}`} alt="" height={100} width={100} />
                                    </div>
                                    <div className="col-md-2">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <AiFillDelete color='black' size={25} onClick={() =>
                                                    deletereview(review._id)} />
                                            </div>
                                            <div className="col-md-4">
                                                <Link className="col-md-1" to={`/admin/review/${review._id}`} ><AiFillEdit size={25} color="blue" />  </Link>
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

export default Review