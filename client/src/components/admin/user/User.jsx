import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../config';
import Sidebar from "../common/sidebar/Sidebar";
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible, AiFillDelete, AiFillEdit } from "react-icons/ai";


const User = () => {
  const [user, setuser] = useState()
  const [del, setdel] = useState(false)

  // console.log("user", user)


  useEffect(() => {
    getuser()
  }, [!del])


  const getuser = async () => {
    try {
      const { data } = await axiosInstance.get("/api/user");
      setuser(data)
    } catch (error) {
      console.log("error", error)

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

  const deleteuser = async (id) => {
    var answer = window.confirm("Are you sure To delete?");
    if (answer) {
      await axiosInstance.delete(`/api/user/${id}`, {
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

  const showdetails = (user) =>{
    console.log("user",user)
    alert("show")
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
        <h3 className="text-dark p-3">ADMIN USER DASHBOARD 💻 📱
        </h3>

        <div className="row">
          <div className="col-md-9"></div>
          <div className="col-md-3 btn btn-secondary  mx-5"><Link to="/admin/adduser" className="text-white nav-link">Add New User</Link></div>
        </div>

        <div className="row">
          <div className="col-md-1">FirstName</div>
          <div className="col-md-1">LastName</div>
          <div className="col-md-1">UserName</div>
          <div className="col-md-1">Password</div>
          <div className="col-md-2">Number</div>
          <div className="col-md-2">Email</div>
          <div className="col-md-2">Image</div>

          <div className="col-md-2 btn btn-secondary">EXTRA OPTIONS</div>
        </div>



        {
          !user ? <div className='row d-flex justify-content-center position-relative top-50 mt-5 ' style={{ height: "100vh" }}>
            <div className="col-md-8 text center position-absolute top-40 start-50">
              <div class="spinner-border text-dark " role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div> : user.length === 0 ? <>
            <div className="row d-flex justify-content-center mt-5">
              <div className="col-md-8 text-center">
                <h4>No User Available</h4>
              </div>
            </div>
          </> :

            user && user.map((user) => (
              <>
                <div className="row ">
                  <div className="col-md-1 ">{user.FirstName}</div>
                  <div className="col-md-1 ">{user.LastName}</div>
                  <div className="col-md-1 ">{user.UserName}</div>
                  <div className="col-md-1">{user.Password}</div>
                  <div className="col-md-2 ">{user.Number}</div>
                  <div className="col-md-2 ">{user.Email}</div>
                  <div className="col-md-2 ">
                    <img src={`http://localhost:7000/images/user/${user.userImage}`} alt="" height={100} width={100} />
                  </div>
                  <div className="col-md-2">
                    <div className="row">
                      {/* <div className="col-md-4">
                        <AiFillEye color='red' size={25} onClick={() => showdetails(user)} />
                      </div> */}
                      <div className="col-md-4">
                        <AiFillDelete color='black' size={25} onClick={() =>
                          deleteuser(user._id)} />

                      </div>
                      <div className="col-md-4">
                        <Link className="col-md-1" to={`/admin/editUser/${user._id}`} ><AiFillEdit size={25} color="blue" />  </Link>
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

export default User