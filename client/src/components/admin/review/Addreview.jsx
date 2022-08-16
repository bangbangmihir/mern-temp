import React, { useState } from 'react';
import Sidebar from '../common/sidebar/Sidebar';
import { axiosInstance } from '../../../config';
import { useNavigate } from 'react-router-dom';



const Addreview = () => {
    const navigate = useNavigate();
    const [authorname, setauthorname] = useState()
    const [review, setreview] = useState()
    const [img, setimg] = useState()

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

        if(authorname== undefined && review == undefined && img == undefined ){
            alert("Fill All the input field")
            return
        }
       
        const formdata = new FormData();
        formdata.append("AuthorName", authorname)
        formdata.append("Review", review)
        formdata.append("reviewimg", img)


        try {
            const { data } = await axiosInstance.post("/api/review/", formdata, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            // console.log("dd",data.message)
            alert(data.message)
            navigate("/admin/review")

        } catch (error) {
            alert(error.response.data)
            // console.log("gffgfhg",error.response.data)
        }



        // navigate("/admin/user");
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
                <h3 className="text-dark p-3">ADMIN ADD REVIEW 💻 📱
                </h3>



                <div className="row mx-2 " style={{ backgroundColor: "#FDF8DB" }}>


                    {/* <div className="toogler"><h3>Add Review</h3></div> */}

                    <form onSubmit={handleUserdataSubmit}>
                        <div className="col-md-6 align-items-center">
                            <label>Author Name</label>
                            <input className="form-control " type="text" value={authorname} onChange={e => setauthorname(e.target.value)} placeholder="Author Name" />
                        </div>
                        <div className="col-md-6">
                            <label>Review</label>
                            <input className="form-control" type="text" value={review} onChange={e => setreview(e.target.value)} placeholder="Review" />
                        </div>
                        <div className="col-md-6">
                            <label>Image</label>
                            <input className="form-control" type="file" onChange={e => setimg(e.target.files[0])} placeholder="Enter Password" />
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

export default Addreview