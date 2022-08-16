import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../config';
import Sidebar from '../common/sidebar/Sidebar';


const EditReview = () => {
    const { id } = useParams();
    const navigate = useNavigate()

    const [authorname, setauthorname] = useState()
    const [review, setreview] = useState()
    const [newreview, setnewreview] = useState()
    const [img, setimg] = useState()

    // console.log("review",review)

    useEffect(() => {
     getuser();
    }, [])


    const handledataSubmit = async (e) => {
        e.preventDefault();

        if(authorname== undefined && review == undefined && img == undefined ){
            alert("Fill All the input field")
            return
        }
       
        const formdata = new FormData();
        formdata.append("AuthorName", authorname)
        formdata.append("Review", newreview)
        formdata.append("reviewimg", img)


        try {
            const { data } = await axiosInstance.put(`/api/review/${id}`, formdata, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            alert(data.message)
            navigate("/admin/review")
        } catch (error) {
            alert(error.response.data)
        }



        // navigate("/admin/user");
    }

    const getuser = async() =>{
        try {
            const {data} = await axiosInstance.get(`/api/review/${id}`)
            setreview(data)
            setauthorname(data.AuthorName)
            setnewreview(data.Review)
            // setreview(data.Review)

        } catch (error) {
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
            <form onSubmit={handledataSubmit}>
                <div className="col-md-6 align-items-center">
                    <label>Author Name</label>
                    <input className="form-control " type="text" value={authorname} onChange={e => setauthorname(e.target.value)} placeholder="Author Name" />
                </div>
                <div className="col-md-6">
                    <label>Review</label>
                    <input className="form-control" type="text" value={newreview} onChange={e => setnewreview(e.target.value)} placeholder="Review" />
                </div>
                <div className="col-md-6">
                    <label>Image</label>
                    <input className="form-control" type="file"  onChange={e => setimg(e.target.files[0])}  />
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

export default EditReview