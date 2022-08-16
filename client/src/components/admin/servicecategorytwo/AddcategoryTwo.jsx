import React, { useState } from 'react';
import Sidebar from '../common/sidebar/Sidebar';
import { axiosInstance } from '../../../config';
import { useNavigate } from 'react-router-dom';



const AddcategoryTwo = () => {
  const navigate = useNavigate();

  const [category, setcategory] = useState();



  const togglehandle = (e) => {
    e.persist();
    var menu_btn = document.querySelector("#menu-btn");
    var sidebar = document.querySelector("#sidebar");
    var container = document.querySelector(".my-container");
    sidebar.classList.toggle("active-nav")
    container.classList.toggle("active-cont");
  }

  const handleCategorydataSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post(`/api/categorytwo`, {
        "categoryNameTwo": category
      })
      alert(data.message)
      navigate("/admin/category-two")
    } catch (error) {
      alert(error.response.data.message)
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
        <h3 className="text-dark p-3">ADMIN ADD USER 💻 📱
        </h3>



        <div className="row mx-2 " style={{ backgroundColor: "#FDF8DB" }}>

          <div className="toogler"><h3>Add Category Two</h3></div>

          <form onSubmit={handleCategorydataSubmit}>
            <div className="col-md-6 align-items-center">
              <label>Category Name</label>
              <input className="form-control " type="text" value={category} onChange={e => setcategory(e.target.value)} placeholder="Category Two"/>
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

export default AddcategoryTwo