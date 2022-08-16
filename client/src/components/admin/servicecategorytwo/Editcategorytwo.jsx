import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../config';
import Sidebar from '../common/sidebar/Sidebar';
// import { Link } from 'react-router-dom';
// import { AiFillEye, AiFillEyeInvisible, AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useParams,useNavigate } from 'react-router-dom';

const Editcategorytwo = () => {

  const { id } = useParams();
  const navigate = useNavigate()


  const [categoryname, setcategoryname] = useState()

  useEffect(() => {
      getcategory()
  }, [])

  const getcategory = async () => {
      try {
          const { data } = await axiosInstance.get(`/api/categorytwo/${id}`)
          console.log("daddta",data)
          setcategoryname(data.categoryNameTwo)
      } catch (error) {
          console.log("problem on Edit Category")
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

  

  const handledataSubmit = async(e)=>{
      e.preventDefault();
      if(categoryname == "" || categoryname == undefined){
          alert("Category Name Can't be empty")
          return
      }
      try {
          const {data} = await axiosInstance.put(`/api/categorytwo/${id}`,{
            categoryNameTwo:categoryname
          })
          alert(data.message)
          navigate("/admin/category-two")
      } catch (error) {
          alert(error.response.data)
      }
  }


    
  return (
    <>
    <Sidebar />
    <div className="p-1 my-container active-cont">
        <nav className="navbar top-navbar navbar-light bg-light px-5">
            <a className="btn border-0" id="menu-btn" onClick={togglehandle}><i className="bx bx-menu"></i></a>
        </nav>

        <h3 className="text-dark p-3"> ADMIN EDIT CATEGORY 💻 📱
        </h3>
        <div className="row mx-2 " style={{ backgroundColor: "#FDF8DB" }}>

            <div className="toogler"><h3>Edit Category</h3></div>

            <form onSubmit={handledataSubmit}>
                <div className="col-md-6 align-items-center">
                    <label>Category Name</label>
                    <input className="form-control " type="text" value={categoryname} onChange={e => setcategoryname(e.target.value)} placeholder="FirstName" />
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

export default Editcategorytwo